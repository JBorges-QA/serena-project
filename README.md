# Serena Massoterapia — site demonstrativo

Site institucional de uma clínica de massoterapia (fictícia) com assistente virtual de agendamento.

**Stack:** Next.js (App Router) + React + TypeScript. CSS puro (tokens em `globals.css` + CSS Modules no chat).

## Versões

O mesmo código gera duas versões, escolhidas pela variável `NEXT_PUBLIC_BOOKING_MODE` (veja `src/config/site.ts`):

| Versão    | Agendamento                          | Porta |
|-----------|--------------------------------------|-------|
| chat      | Chatbot (assistente virtual "Lia")   | 3000  |
| whatsapp  | Botões e botão flutuante → WhatsApp  | 3001  |

## Rodando

```bash
npm install

npm run dev             # versão chat      → http://localhost:3000
npm run dev:whatsapp    # versão WhatsApp  → http://localhost:3001
npm run dev:all         # as duas juntas

# produção
npm run build && npm run start                         # chat
npm run build:whatsapp && npm run start:whatsapp       # WhatsApp
```

## Estrutura

```
src/
  app/                 layout, página e estilos globais
  content/clinic.ts    dados da clínica (serviços, preços, horários, FAQ…) — fonte única p/ site e chatbot
  components/
    sections/          seções da página (Hero, Serviços, Sobre…)
    chat/ChatWidget    interface do chatbot
    BookButton         qualquer botão "Agendar" abre o chat já no fluxo de agendamento
  lib/chatbot/
    types.ts           contrato ChatProvider, mensagens e estado da conversa
    ruleBasedProvider  "cérebro" atual: regras locais (intenções + fluxo de agendamento)
    index.ts           ponto único de troca do provider
```

## Evoluindo

- **Chatbot com IA / back-end:** criar um `ChatProvider` que chame uma rota `src/app/api/chat/route.ts`
  e trocar em `src/lib/chatbot/index.ts`. O widget não muda.
- **Agenda real:** a rota de API pode consultar Google Agenda/sistema da clínica nos passos de dia/horário.
- **Conteúdo editável:** trocar `content/clinic.ts` por um CMS ou banco de dados.
- **Outra clínica:** basta alterar `content/clinic.ts` e as cores em `:root` de `globals.css`.
