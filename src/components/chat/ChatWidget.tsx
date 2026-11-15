"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { clinic, formatPrice, services } from "@/content/clinic";
import {
  chatProvider,
  initialState,
  type BookingDraft,
  type BotMessage,
  type ChatMessage,
  type ConversationState,
} from "@/lib/chatbot";
import styles from "./ChatWidget.module.css";

/** Evento global para abrir o chat a partir de qualquer botão do site. */
export const CHAT_OPEN_EVENT = "chat:open";
export type ChatOpenDetail = { message?: string; label?: string };

const uid = () => Math.random().toString(36).slice(2);
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const typingDelay = (m: BotMessage) =>
  m.content.kind === "text" ? Math.min(450 + m.content.text.length * 9, 1400) : 700;

function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith("**") ? <strong key={j}>{part.slice(2, -2)}</strong> : part
          )}
        </Fragment>
      ))}
    </>
  );
}

function formatDate(iso: string) {
  const d = new Date(`${iso}T12:00:00`);
  const s = d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const time = (ts: number) =>
  new Date(ts).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [conv, setConv] = useState<ConversationState>(initialState);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [teaser, setTeaser] = useState(false);
  const [unread, setUnread] = useState(1);

  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const convRef = useRef(conv);
  const busy = useRef(false);
  const greeted = useRef(false);
  convRef.current = conv;

  const pushBot = useCallback(async (msgs: BotMessage[]) => {
    for (const m of msgs) {
      setTyping(true);
      await wait(typingDelay(m));
      setTyping(false);
      setMessages((prev) => [...prev, { ...m, id: uid(), sender: "bot", createdAt: Date.now() }]);
      await wait(120);
    }
  }, []);

  const greet = useCallback(async () => {
    if (greeted.current) return;
    greeted.current = true;
    busy.current = true;
    const r = await chatProvider.greet(convRef.current);
    await pushBot(r.messages);
    setConv(r.state);
    busy.current = false;
  }, [pushBot]);

  const send = useCallback(
    async (value: string, label?: string) => {
      const content = value.trim();
      if (!content || busy.current) return;
      busy.current = true;
      setInput("");
      setMessages((prev) => [
        ...prev,
        { id: uid(), sender: "user", content: { kind: "text", text: label ?? content }, createdAt: Date.now() },
      ]);
      await wait(250);
      const r = await chatProvider.reply(content, convRef.current);
      setConv(r.state);
      await pushBot(r.messages);
      busy.current = false;
      inputRef.current?.focus();
    },
    [pushBot]
  );

  const openChat = useCallback(
    async (detail?: ChatOpenDetail) => {
      setOpen(true);
      setTeaser(false);
      setUnread(0);
      await greet();
      if (detail?.message) {
        // Se o usuário estiver no meio de um fluxo, recomeça a partir do pedido.
        if (convRef.current.step !== "idle") {
          convRef.current = initialState;
          setConv(initialState);
        }
        await send(detail.message, detail.label);
      }
    },
    [greet, send]
  );

  const reset = () => {
    if (busy.current) return;
    greeted.current = false;
    setMessages([]);
    setConv(initialState);
    void greet();
  };

  /* Abre via evento global (botões "Agendar" do site) */
  useEffect(() => {
    const handler = (e: Event) => void openChat((e as CustomEvent<ChatOpenDetail>).detail);
    window.addEventListener(CHAT_OPEN_EVENT, handler);
    return () => window.removeEventListener(CHAT_OPEN_EVENT, handler);
  }, [openChat]);

  /* Balão de convite após alguns segundos */
  useEffect(() => {
    const t = setTimeout(() => !greeted.current && setTeaser(true), 4500);
    return () => clearTimeout(t);
  }, []);

  /* Fecha com Esc */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* Auto-scroll */
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const lastBotId = [...messages].reverse().find((m) => m.sender === "bot")?.id;

  return (
    <div className={styles.root}>
      {/* Painel */}
      <section
        className={`${styles.panel} ${open ? styles.panelOpen : ""}`}
        role="dialog"
        aria-label="Assistente virtual"
        aria-hidden={!open}
      >
        <header className={styles.header}>
          <div className={styles.avatar} aria-hidden>
            <LeafIcon />
          </div>
          <div className={styles.headerText}>
            <strong>Lia</strong>
            <span>
              <i className={styles.online} /> Assistente virtual • online
            </span>
          </div>
          <button className={styles.iconBtn} onClick={reset} title="Reiniciar conversa" aria-label="Reiniciar conversa">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
              <path d="M3 3v5h5" />
            </svg>
          </button>
          <button className={styles.iconBtn} onClick={() => setOpen(false)} title="Fechar" aria-label="Fechar chat">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className={styles.messages} ref={listRef} aria-live="polite">
          <div className={styles.dayTag}>Hoje</div>

          {messages.map((m) => (
            <div key={m.id} className={`${styles.row} ${m.sender === "user" ? styles.rowUser : ""}`}>
              {m.sender === "bot" && m.content.kind === "text" && <span className={styles.miniAvatar}><LeafIcon /></span>}
              <div className={styles.stack}>
                {m.content.kind === "text" && (
                  <div className={`${styles.bubble} ${m.sender === "user" ? styles.bubbleUser : styles.bubbleBot}`}>
                    <RichText text={m.content.text} />
                    <time className={styles.time}>{time(m.createdAt)}</time>
                  </div>
                )}

                {m.content.kind === "services" && (
                  <div className={styles.serviceList}>
                    {services.map((s) => (
                      <button
                        key={s.id}
                        className={styles.serviceItem}
                        onClick={() => send(`agendar:${s.id}`, `Quero agendar: ${s.name}`)}
                      >
                        <span>
                          <strong>{s.name}</strong>
                          <small>{s.durationMin} min</small>
                        </span>
                        <em>{formatPrice(s.price)}</em>
                      </button>
                    ))}
                  </div>
                )}

                {m.content.kind === "summary" && (
                  <SummaryCard booking={m.content.booking} protocol={m.content.protocol} />
                )}

                {m.id === lastBotId && m.quickReplies && !typing && (
                  <div className={styles.chips}>
                    {m.quickReplies.map((q) => (
                      <button key={q.value + q.label} className={styles.chip} onClick={() => send(q.value, q.label)}>
                        {q.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {typing && (
            <div className={styles.row}>
              <span className={styles.miniAvatar}><LeafIcon /></span>
              <div className={`${styles.bubble} ${styles.bubbleBot} ${styles.typing}`} aria-label="Digitando">
                <i /><i /><i />
              </div>
            </div>
          )}
        </div>

        <form
          className={styles.composer}
          onSubmit={(e) => {
            e.preventDefault();
            void send(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite sua mensagem…"
            aria-label="Mensagem"
            tabIndex={open ? 0 : -1}
          />
          <button type="submit" className={styles.sendBtn} disabled={!input.trim()} aria-label="Enviar" tabIndex={open ? 0 : -1}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </form>
        <p className={styles.disclaimer}>
          Demonstração • {clinic.fullName} •{" "}
          <a href="/privacidade" target="_blank" tabIndex={open ? 0 : -1}>
            Privacidade
          </a>
        </p>
      </section>

      {/* Convite */}
      {teaser && !open && (
        <div className={styles.teaser} role="status">
          <button className={styles.teaserClose} onClick={() => setTeaser(false)} aria-label="Dispensar">×</button>
          <button className={styles.teaserBody} onClick={() => openChat()}>
            Olá! 👋 Posso te ajudar a <strong>agendar uma massagem</strong>?
          </button>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        className={`${styles.launcher} ${open ? styles.launcherOpen : ""}`}
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? "Fechar chat" : "Abrir chat"}
      >
        <span className={styles.launcherIcon}>
          {open ? (
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.5 4v-4h0A2.5 2.5 0 0 1 3 13.5" />
              <circle cx="8.5" cy="9.5" r="1" fill="currentColor" />
              <circle cx="12" cy="9.5" r="1" fill="currentColor" />
              <circle cx="15.5" cy="9.5" r="1" fill="currentColor" />
            </svg>
          )}
        </span>
        {!open && unread > 0 && <span className={styles.badge}>{unread}</span>}
      </button>
    </div>
  );
}

function SummaryCard({ booking, protocol }: { booking: Required<BookingDraft>; protocol?: string }) {
  const svc = services.find((s) => s.id === booking.serviceId);
  return (
    <div className={`${styles.summary} ${protocol ? styles.summaryOk : ""}`}>
      <div className={styles.summaryHead}>
        {protocol ? (
          <>
            <span className={styles.check}>✓</span> Confirmado
            <code>{protocol}</code>
          </>
        ) : (
          "Resumo do agendamento"
        )}
      </div>
      <dl>
        <dt>Serviço</dt>
        <dd>{svc?.name}</dd>
        <dt>Data</dt>
        <dd>{formatDate(booking.date)}</dd>
        <dt>Horário</dt>
        <dd>{booking.time}</dd>
        <dt>Nome</dt>
        <dd>{booking.name}</dd>
        <dt>WhatsApp</dt>
        <dd>{booking.phone}</dd>
        <dt>Valor</dt>
        <dd>{svc ? formatPrice(svc.price) : "—"}</dd>
      </dl>
    </div>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
      <path d="M5 19c3-4 6-7 10-9" />
    </svg>
  );
}
