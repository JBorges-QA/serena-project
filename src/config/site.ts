import { clinic } from "@/content/clinic";

/**
 * Modo de agendamento do site, definido por variável de ambiente:
 *   NEXT_PUBLIC_BOOKING_MODE=chat      → assistente virtual (padrão)
 *   NEXT_PUBLIC_BOOKING_MODE=whatsapp  → botões levam ao WhatsApp, sem chatbot
 */
export type BookingMode = "chat" | "whatsapp";

export const bookingMode: BookingMode =
  process.env.NEXT_PUBLIC_BOOKING_MODE === "whatsapp" ? "whatsapp" : "chat";

export const isChat = bookingMode === "chat";

/** Link wa.me com mensagem pré-preenchida. */
export function whatsappLink(serviceName?: string) {
  const number = `55${clinic.whatsapp.replace(/\D/g, "")}`;
  const text = serviceName
    ? `Olá! Gostaria de agendar uma sessão de ${serviceName}.`
    : "Olá! Gostaria de agendar uma sessão.";
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

/** Textos que mudam conforme o modo. */
export const copy = isChat
  ? {
      heroLead:
        "Massagens terapêuticas e relaxantes com profissionais certificados, em um ambiente pensado para você desacelerar. Agende em menos de um minuto com nossa assistente virtual.",
      heroCardLabel: "Assistente virtual",
      heroCardValue: "Agende 24h por dia",
      highlightTitle: "Agendamento 24h",
      highlightText: "Marque pelo chat a qualquer hora do dia.",
      stepOneTitle: "Converse com a Lia",
      stepOneText: "Nossa assistente virtual tira dúvidas e indica a terapia ideal para você.",
      stepTwoText: "Veja a disponibilidade em tempo real e confirme em poucos cliques.",
      howCta: "Começar agora",
      ctaText: "Primeira sessão com 15% de desconto. Agende agora pelo chat — leva menos de um minuto.",
      rescheduleFaq:
        "Sim, sem custo, com até 12 horas de antecedência pelo WhatsApp ou pelo nosso assistente virtual.",
      privacyCollection: {
        paragraphs: [
          "Coletamos apenas os dados que você nos informa ao agendar pelo assistente virtual ou ao falar com a nossa equipe:",
        ],
        items: [
          "Nome completo e número de WhatsApp, para registrar e confirmar o agendamento;",
          "Serviço, data e horário escolhidos;",
          "As mensagens trocadas com o assistente virtual, usadas apenas para concluir o seu atendimento.",
        ],
      },
      privacySharing: {
        paragraphs: [
          "Não vendemos nem alugamos os seus dados. Eles podem ser compartilhados somente com:",
        ],
        items: [
          "Prestadores que nos ajudam a operar o site e a agenda (como a hospedagem), sob obrigação de confidencialidade;",
          "O WhatsApp, quando enviamos a confirmação do agendamento para o número informado;",
          "Autoridades públicas, quando exigido por lei ou ordem judicial.",
        ],
      },
    }
  : {
      heroLead:
        "Massagens terapêuticas e relaxantes com profissionais certificados, em um ambiente pensado para você desacelerar. Agende direto com nossa equipe pelo WhatsApp.",
      heroCardLabel: "Atendimento no WhatsApp",
      heroCardValue: "Resposta rápida",
      highlightTitle: "Agendamento fácil",
      highlightText: "Fale com a equipe direto pelo WhatsApp.",
      stepOneTitle: "Chame no WhatsApp",
      stepOneText: "Nossa equipe tira suas dúvidas e indica a terapia ideal para você.",
      stepTwoText: "Combinamos o melhor dia e horário para a sua rotina.",
      howCta: "Chamar no WhatsApp",
      ctaText: "Primeira sessão com 15% de desconto. Chame a gente no WhatsApp e garanta seu horário.",
      rescheduleFaq: "Sim, sem custo, com até 12 horas de antecedência pelo nosso WhatsApp.",
      privacyCollection: {
        paragraphs: [
          "Este site não tem formulários e não coleta dados pessoais diretamente. Ao clicar em “Agendar”, você é levado ao WhatsApp, onde coletamos apenas o que você nos envia:",
        ],
        items: [
          "Nome e número de telefone, para identificar você e confirmar o agendamento;",
          "Serviço, data e horário escolhidos;",
          "O conteúdo das mensagens trocadas com a nossa equipe.",
        ],
      },
      privacySharing: {
        paragraphs: [
          "Não vendemos nem alugamos os seus dados. Eles podem ser compartilhados somente com:",
        ],
        items: [
          "O WhatsApp (Meta), plataforma usada no atendimento, que trata as mensagens conforme a política de privacidade própria;",
          "Prestadores que nos ajudam a operar o site e a agenda (como a hospedagem), sob obrigação de confidencialidade;",
          "Autoridades públicas, quando exigido por lei ou ordem judicial.",
        ],
      },
    };
