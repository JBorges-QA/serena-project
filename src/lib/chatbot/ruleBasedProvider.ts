import { clinic, faqs, formatPrice, services } from "@/content/clinic";
import type {
  BotMessage,
  BotReply,
  ChatProvider,
  ConversationState,
  QuickReply,
} from "./types";

/* ---------------------------------------------------------------- utils */

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s:/-]/g, " ")
    .trim();

/** Palavras curtas (≤3 letras) exigem palavra inteira; as demais casam pelo início da palavra. */
const has = (text: string, words: string[]) =>
  words.some((w) => new RegExp(w.length <= 3 ? `\\b${w}\\b` : `\\b${w}`).test(text));

const text = (t: string, quickReplies?: QuickReply[]): BotMessage => ({
  content: { kind: "text", text: t },
  quickReplies,
});

const MAIN_MENU: QuickReply[] = [
  { label: "📅 Agendar sessão", value: "agendar" },
  { label: "💆 Serviços e valores", value: "servicos" },
  { label: "🕒 Horários", value: "horarios" },
  { label: "📍 Localização", value: "endereco" },
];

const firstName = (name?: string) => (name ? name.split(" ")[0] : "");

/** Próximos dias úteis (inclui sábado), a partir de amanhã. */
function nextDays(count = 6): { iso: string; label: string }[] {
  const out: { iso: string; label: string }[] = [];
  const d = new Date();
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 0) continue; // domingo fechado
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;
    const label = d
      .toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" })
      .replace(".", "");
    out.push({ iso, label: label.charAt(0).toUpperCase() + label.slice(1) });
  }
  return out;
}

/** Simula disponibilidade de forma determinística a partir da data. */
function slotsFor(iso: string): string[] {
  const seed = iso.split("-").reduce((a, n) => a + Number(n), 0);
  const isSaturday = new Date(`${iso}T12:00:00`).getDay() === 6;
  return clinic.slots.filter((s, i) => {
    if (isSaturday && s >= "16:00") return false;
    return (seed + i) % 3 !== 0;
  });
}

function findService(t: string) {
  const map: Record<string, string[]> = {
    relaxante: ["relaxante", "relaxar", "relaxamento"],
    terapeutica: ["terapeutica", "terapia", "contratura"],
    pedras: ["pedra", "quente"],
    drenagem: ["drenagem", "linfatica", "inchaco", "inchado", "pos operatorio", "pos-operatorio"],
    desportiva: ["desportiva", "esportiva", "atleta", "corrida", "treino"],
    reflexologia: ["reflexologia", "podal", "pes"],
  };
  const id = Object.entries(map).find(([, words]) => has(t, words))?.[0];
  return services.find((s) => s.id === id);
}

/* ------------------------------------------------------------- intents */

const intents = {
  greeting: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "e ai", "hey", "hello"],
  menu: ["menu", "opcoes", "ajuda", "inicio", "voltar"],
  booking: ["agendar", "agenda", "marcar", "reservar", "agendamento", "quero uma sessao", "horario disponivel"],
  services: ["servico", "massagem", "massagens", "tratamento", "tipos", "fazem"],
  price: ["preco", "valor", "quanto", "custa", "tabela", "caro"],
  hours: ["horario", "funciona", "abre", "fecha", "aberto", "funcionamento", "sabado", "domingo"],
  location: ["endereco", "onde", "localizacao", "fica", "chegar", "estacionamento", "mapa"],
  payment: ["pagamento", "pagar", "pix", "cartao", "parcel", "dinheiro"],
  cancel: ["cancelar", "remarcar", "desmarcar"],
  human: ["atendente", "humano", "pessoa", "whatsapp", "telefone", "ligar", "contato", "falar com"],
  thanks: ["obrigad", "valeu", "agradeco", "otimo", "perfeito"],
  pain: ["dor", "dores", "costas", "lombar", "pescoco", "ombro", "tensao", "estresse", "ansiedade", "cansaco", "insonia"],
  pregnant: ["gestante", "gravida", "gravidez"],
};

/* -------------------------------------------------------- flow helpers */

function askService(state: ConversationState): BotReply {
  return {
    state: { ...state, step: "booking_service" },
    messages: [
      text(
        "Ótimo! Vamos agendar sua sessão. 😊\nQual serviço você gostaria?",
        services.map((s) => ({ label: s.name, value: `svc:${s.id}` }))
      ),
    ],
  };
}

function askDay(state: ConversationState): BotReply {
  const svc = services.find((s) => s.id === state.booking.serviceId)!;
  return {
    state: { ...state, step: "booking_day" },
    messages: [
      text(
        `**${svc.name}** — ${svc.durationMin} min • ${formatPrice(svc.price)}.\nPara qual dia?`,
        nextDays().map((d) => ({ label: d.label, value: `day:${d.iso}` }))
      ),
    ],
  };
}

function askTime(state: ConversationState): BotReply {
  const slots = slotsFor(state.booking.date!);
  return {
    state: { ...state, step: "booking_time" },
    messages: [
      text(
        "Estes são os horários disponíveis:",
        slots.map((s) => ({ label: s, value: `time:${s}` }))
      ),
    ],
  };
}

const cancelChip: QuickReply = { label: "Cancelar agendamento", value: "cancelar" };

/* ------------------------------------------------------------ provider */

async function handle(raw: string, state: ConversationState): Promise<BotReply> {
  const input = raw.trim();
  const t = normalize(input);

  /* Sair do fluxo a qualquer momento */
  if (state.step !== "idle" && (has(t, ["cancelar", "sair", "parar"]) || t === "menu")) {
    return {
      state: { step: "idle", booking: {} },
      messages: [text("Tudo bem, agendamento cancelado. Posso ajudar com mais alguma coisa?", MAIN_MENU)],
    };
  }

  /* ---------- Fluxo de agendamento ---------- */
  switch (state.step) {
    case "booking_service": {
      const id = t.startsWith("svc:") ? t.slice(4) : findService(t)?.id;
      if (id && services.some((s) => s.id === id)) {
        return askDay({ ...state, booking: { ...state.booking, serviceId: id } });
      }
      const r = askService(state);
      r.messages.unshift(text("Não identifiquei o serviço. Pode escolher uma das opções abaixo?"));
      return r;
    }
    case "booking_day": {
      if (t.startsWith("day:")) {
        return askTime({ ...state, booking: { ...state.booking, date: t.slice(4) } });
      }
      const r = askDay(state);
      r.messages[0] = text("Por favor, escolha um dos dias disponíveis:", r.messages[0].quickReplies);
      return r;
    }
    case "booking_time": {
      const match = input.match(/(\d{1,2})[:h]?(\d{2})?/);
      const candidate = t.startsWith("time:")
        ? t.slice(5)
        : match
          ? `${match[1].padStart(2, "0")}:${match[2] ?? "00"}`
          : "";
      if (slotsFor(state.booking.date!).includes(candidate)) {
        return {
          state: { ...state, step: "booking_name", booking: { ...state.booking, time: candidate } },
          messages: [text("Perfeito! Qual é o seu **nome completo**?", [cancelChip])],
        };
      }
      const r = askTime(state);
      r.messages.unshift(text("Esse horário não está disponível."));
      return r;
    }
    case "booking_name": {
      if (input.length < 3 || /\d/.test(input)) {
        return { state, messages: [text("Pode me informar seu nome, por favor?")] };
      }
      const name = input
        .toLowerCase()
        .split(/\s+/)
        .map((w) => (["da", "de", "do", "das", "dos", "e"].includes(w) ? w : w.charAt(0).toUpperCase() + w.slice(1)))
        .join(" ");
      return {
        state: { ...state, step: "booking_phone", booking: { ...state.booking, name } },
        messages: [
          text(`Prazer, ${firstName(name)}! Agora, um **WhatsApp com DDD** para enviarmos a confirmação:`, [
            cancelChip,
          ]),
        ],
      };
    }
    case "booking_phone": {
      const digits = input.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 11) {
        return { state, messages: [text("Hmm, esse número parece incompleto. Digite com DDD, ex.: 11 98765-4321")] };
      }
      const phone =
        digits.length === 11
          ? `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
          : `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
      const booking = { ...state.booking, phone } as Required<typeof state.booking>;
      return {
        state: { step: "booking_confirm", booking },
        messages: [
          text("Confira os dados do seu agendamento:"),
          {
            content: { kind: "summary", booking },
            quickReplies: [
              { label: "✅ Confirmar", value: "confirm:yes" },
              { label: "Alterar", value: "agendar" },
              cancelChip,
            ],
          },
        ],
      };
    }
    case "booking_confirm": {
      if (t === "confirm:yes" || has(t, ["sim", "confirm", "ok", "isso"])) {
        const protocol = `SER-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
        const booking = state.booking as Required<typeof state.booking>;
        return {
          state: { step: "idle", booking: {} },
          messages: [
            { content: { kind: "summary", booking, protocol } },
            text(
              `Agendamento confirmado, ${firstName(booking.name)}! 🎉\nVocê receberá a confirmação no WhatsApp. Chegue 10 minutos antes, ok?`,
              [
                { label: "📍 Como chegar", value: "endereco" },
                { label: "Voltar ao menu", value: "menu" },
              ]
            ),
          ],
        };
      }
      if (has(t, ["agendar", "alterar", "mudar", "nao"])) {
        return askService({ step: "idle", booking: {} });
      }
      return { state, messages: [text("Deseja confirmar o agendamento?", [{ label: "✅ Confirmar", value: "confirm:yes" }, cancelChip])] };
    }
  }

  /* ---------- Intenções livres ---------- */
  if (t.startsWith("agendar:")) {
    const id = t.slice(8);
    if (services.some((s) => s.id === id)) {
      return askDay({ step: "idle", booking: { serviceId: id } });
    }
  }
  if (has(t, intents.booking)) return askService(state);

  if (has(t, intents.cancel)) {
    return {
      state,
      messages: [
        text(
          `Para remarcar ou cancelar, fale com nossa equipe pelo WhatsApp **${clinic.whatsapp}**. Sem custo com até 12h de antecedência.`,
          MAIN_MENU
        ),
      ],
    };
  }

  const svc = findService(t);
  if (svc) {
    return {
      state,
      messages: [
        text(`**${svc.name}** (${svc.durationMin} min • ${formatPrice(svc.price)})\n${svc.description}`, [
          { label: "📅 Agendar este serviço", value: `agendar:${svc.id}` },
          { label: "Ver outros serviços", value: "servicos" },
        ]),
      ],
    };
  }

  if (has(t, intents.pregnant)) {
    return { state, messages: [text(faqs[3].a, MAIN_MENU)] };
  }

  if (has(t, intents.pain)) {
    const rec = services.filter((s) => ["terapeutica", "pedras", "relaxante"].includes(s.id));
    return {
      state,
      messages: [
        text(
          "Sinto muito por isso. 💛 Para dores e tensões, nossos clientes costumam ter ótimos resultados com:\n" +
            rec.map((s) => `• **${s.name}** — ${s.short}`).join("\n") +
            "\n\nLembrando que não substituímos avaliação médica em casos de dor aguda.",
          [{ label: "📅 Agendar agora", value: "agendar" }, { label: "Ver todos os serviços", value: "servicos" }]
        ),
      ],
    };
  }

  if (has(t, intents.services) || has(t, intents.price)) {
    return {
      state,
      messages: [
        text("Estes são nossos serviços:"),
        { content: { kind: "services" }, quickReplies: [{ label: "📅 Agendar sessão", value: "agendar" }] },
      ],
    };
  }

  if (has(t, intents.hours)) {
    return {
      state,
      messages: [
        text(
          "Nosso horário de funcionamento:\n" + clinic.hours.map((h) => `• **${h.days}:** ${h.time}`).join("\n"),
          [{ label: "📅 Agendar sessão", value: "agendar" }, { label: "📍 Localização", value: "endereco" }]
        ),
      ],
    };
  }

  if (has(t, intents.location)) {
    const a = clinic.address;
    return {
      state,
      messages: [
        text(
          `Estamos em:\n**${a.street}**\n${a.district}, ${a.city}\n\n🚇 5 min a pé do metrô • 🅿️ Estacionamento conveniado no local.`,
          [{ label: "📅 Agendar sessão", value: "agendar" }, { label: "🕒 Horários", value: "horarios" }]
        ),
      ],
    };
  }

  if (has(t, intents.payment)) return { state, messages: [text(faqs[2].a, MAIN_MENU)] };

  if (has(t, intents.human)) {
    return {
      state,
      messages: [
        text(
          `Claro! Você pode falar com nossa equipe:\n• WhatsApp: **${clinic.whatsapp}**\n• Telefone: **${clinic.phone}**\n• E-mail: ${clinic.email}`,
          MAIN_MENU
        ),
      ],
    };
  }

  if (has(t, intents.thanks)) {
    return { state, messages: [text("Por nada! Estou aqui sempre que precisar. 🌿", MAIN_MENU)] };
  }

  if (has(t, intents.greeting) || has(t, intents.menu)) {
    return { state, messages: [text("Olá! Como posso ajudar você hoje?", MAIN_MENU)] };
  }

  return {
    state,
    messages: [
      text(
        "Desculpe, ainda não sei responder isso. 🙏 Posso ajudar com estas opções, ou você pode falar com nossa equipe:",
        [...MAIN_MENU, { label: "💬 Falar com atendente", value: "atendente" }]
      ),
    ],
  };
}

export const ruleBasedProvider: ChatProvider = {
  async greet(state) {
    return {
      state,
      messages: [
        text(`Olá! Eu sou a **Lia**, assistente virtual da ${clinic.fullName}. 🌿`),
        text("Posso te ajudar a agendar uma sessão, conhecer nossos serviços ou tirar dúvidas.", MAIN_MENU),
      ],
    };
  },
  reply: handle,
};
