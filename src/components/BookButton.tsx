"use client";

import type { ReactNode } from "react";
import { isChat, whatsappLink } from "@/config/site";
import { CHAT_OPEN_EVENT, type ChatOpenDetail } from "./chat/ChatWidget";

/**
 * Botão de agendamento.
 * - modo chat: abre o chatbot já no fluxo de agendamento;
 * - modo whatsapp: abre o WhatsApp com mensagem pronta.
 */
export default function BookButton({
  serviceId,
  serviceName,
  className = "btn btn-primary",
  children,
}: {
  serviceId?: string;
  serviceName?: string;
  className?: string;
  children: ReactNode;
}) {
  if (!isChat) {
    return (
      <a className={className} href={whatsappLink(serviceName)} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  const open = () => {
    const detail: ChatOpenDetail = serviceId
      ? { message: `agendar:${serviceId}`, label: `Quero agendar: ${serviceName ?? serviceId}` }
      : { message: "agendar", label: "Quero agendar uma sessão" };
    window.dispatchEvent(new CustomEvent(CHAT_OPEN_EVENT, { detail }));
  };

  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}
