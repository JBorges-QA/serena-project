import { ruleBasedProvider } from "./ruleBasedProvider";
import type { ChatProvider } from "./types";

/**
 * Ponto único de troca do "cérebro" do chatbot.
 * Para usar IA/back-end no futuro, crie um provider que faça
 * fetch("/api/chat") e substitua a linha abaixo.
 */
export const chatProvider: ChatProvider = ruleBasedProvider;

export * from "./types";
