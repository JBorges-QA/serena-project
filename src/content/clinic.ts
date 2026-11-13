/**
 * Fonte única de dados da clínica.
 * Site e chatbot leem daqui — no futuro, isto pode vir de um CMS ou banco de dados
 * sem alterar os componentes.
 */

export type Service = {
  id: string;
  name: string;
  short: string;
  description: string;
  durationMin: number;
  price: number;
  icon: "leaf" | "stone" | "hand" | "drop" | "spark" | "moon";
};

export type Testimonial = { name: string; role: string; text: string };
export type Faq = { id: string; q: string; a: string };

export const clinic = {
  name: "Serena",
  fullName: "Serena Massoterapia",
  tagline: "Cuidado que se sente no corpo inteiro",
  phone: "(11) 4000-1234",
  whatsapp: "(11) 99999-0000",
  email: "contato@serenamassoterapia.com.br",
  address: {
    street: "Rua das Acácias, 245 — Sala 12",
    district: "Vila Mariana",
    city: "São Paulo — SP",
    zip: "04000-000",
  },
  hours: [
    { days: "Segunda a sexta", time: "08h às 20h" },
    { days: "Sábado", time: "09h às 16h" },
    { days: "Domingo e feriados", time: "Fechado" },
  ],
  slots: ["09:00", "10:30", "13:00", "14:30", "16:00", "17:30", "19:00"],
};

export const services: Service[] = [
  {
    id: "relaxante",
    name: "Massagem Relaxante",
    short: "Alívio do estresse e sensação de leveza.",
    description:
      "Movimentos suaves e ritmados com óleos aromáticos que reduzem a tensão, melhoram o sono e acalmam a mente.",
    durationMin: 60,
    price: 160,
    icon: "leaf",
  },
  {
    id: "terapeutica",
    name: "Massagem Terapêutica",
    short: "Foco em dores musculares e contraturas.",
    description:
      "Técnicas de pressão profunda e liberação miofascial para tratar dores nas costas, pescoço e ombros.",
    durationMin: 60,
    price: 190,
    icon: "hand",
  },
  {
    id: "pedras",
    name: "Pedras Quentes",
    short: "Calor que relaxa a musculatura profunda.",
    description:
      "Pedras vulcânicas aquecidas aliadas a manobras relaxantes, ideal para quem acumula tensão crônica.",
    durationMin: 75,
    price: 220,
    icon: "stone",
  },
  {
    id: "drenagem",
    name: "Drenagem Linfática",
    short: "Reduz inchaço e melhora a circulação.",
    description:
      "Manobras leves e precisas que estimulam o sistema linfático. Indicada também no pós-operatório.",
    durationMin: 60,
    price: 170,
    icon: "drop",
  },
  {
    id: "desportiva",
    name: "Massagem Desportiva",
    short: "Recuperação e performance para atletas.",
    description:
      "Preparação pré-treino ou recuperação pós-esforço, prevenindo lesões e acelerando a regeneração muscular.",
    durationMin: 50,
    price: 180,
    icon: "spark",
  },
  {
    id: "reflexologia",
    name: "Reflexologia Podal",
    short: "Equilíbrio do corpo a partir dos pés.",
    description:
      "Estímulo de pontos reflexos nos pés que promove relaxamento profundo e bem-estar geral.",
    durationMin: 45,
    price: 140,
    icon: "moon",
  },
];

export const team = [
  { name: "Marina Alves", role: "Massoterapeuta • Fundadora", initials: "MA", years: 12 },
  { name: "Rafael Costa", role: "Massagem desportiva", initials: "RC", years: 8 },
  { name: "Juliana Prado", role: "Drenagem e estética", initials: "JP", years: 6 },
];

export const testimonials: Testimonial[] = [
  {
    name: "Carla M.",
    role: "Cliente há 2 anos",
    text: "Cheguei com dores fortes nas costas e em poucas sessões já sentia diferença. Ambiente acolhedor e profissionais excelentes.",
  },
  {
    name: "Bruno T.",
    role: "Corredor amador",
    text: "A massagem desportiva virou parte do meu treino. Recuperação muito mais rápida depois das provas.",
  },
  {
    name: "Helena S.",
    role: "Cliente",
    text: "A de pedras quentes é a melhor hora da minha semana. Saio de lá outra pessoa!",
  },
];

export const faqs: Faq[] = [
  {
    id: "levar",
    q: "Preciso levar algo para a sessão?",
    a: "Não. Fornecemos toalhas, roupão e todos os produtos. Recomendamos chegar 10 minutos antes.",
  },
  {
    id: "remarcar",
    q: "Posso remarcar ou cancelar?",
    a: "Sim, sem custo, com até 12 horas de antecedência pelo WhatsApp ou pelo nosso assistente virtual.",
  },
  {
    id: "pagamento",
    q: "Quais formas de pagamento são aceitas?",
    a: "Pix, cartões de débito e crédito (em até 3x sem juros para pacotes).",
  },
  {
    id: "gestantes",
    q: "Gestantes podem fazer massagem?",
    a: "Sim, a partir do segundo trimestre e com liberação médica. Temos protocolo específico para gestantes.",
  },
];

export const formatPrice = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
