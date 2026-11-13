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
    };
