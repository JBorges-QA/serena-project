export type Sender = "bot" | "user";

export type QuickReply = { label: string; value: string };

/** Conteúdo de uma mensagem. Novos tipos (ex.: imagem, mapa) podem ser adicionados aqui. */
export type MessageContent =
  | { kind: "text"; text: string }
  | { kind: "services" }
  | { kind: "summary"; booking: Required<BookingDraft>; protocol?: string };

export type ChatMessage = {
  id: string;
  sender: Sender;
  content: MessageContent;
  quickReplies?: QuickReply[];
  createdAt: number;
};

export type BookingDraft = {
  serviceId?: string;
  date?: string; // ISO yyyy-mm-dd
  time?: string; // HH:mm
  name?: string;
  phone?: string;
};

export type ConversationStep =
  | "idle"
  | "booking_service"
  | "booking_day"
  | "booking_time"
  | "booking_name"
  | "booking_phone"
  | "booking_confirm";

export type ConversationState = {
  step: ConversationStep;
  booking: BookingDraft;
};

export type BotMessage = Omit<ChatMessage, "id" | "sender" | "createdAt">;

export type BotReply = {
  messages: BotMessage[];
  state: ConversationState;
};

/**
 * Contrato do "cérebro" do chatbot.
 * Hoje: regras locais (ruleBasedProvider).
 * Amanhã: um provider que chama /api/chat (IA, CRM, agenda real) — o widget não muda.
 */
export interface ChatProvider {
  greet(state: ConversationState): Promise<BotReply>;
  reply(input: string, state: ConversationState): Promise<BotReply>;
}

export const initialState: ConversationState = { step: "idle", booking: {} };
