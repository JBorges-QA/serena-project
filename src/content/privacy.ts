/**
 * Política de privacidade (LGPD — Lei nº 13.709/2018).
 * Texto comum às duas versões do site. As seções que dependem do modo de agendamento
 * (ids "coleta" e "compartilhamento") têm o texto trocado por `copy` em `config/site.ts`.
 */

export type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
};

export const privacyUpdatedAt = "15 de novembro de 2026";

export const privacyIntro =
  "A Serena Massoterapia respeita a sua privacidade. Esta política explica, de forma simples, quais dados pessoais coletamos, para que os usamos, com quem os compartilhamos e como você pode exercer os seus direitos previstos na Lei Geral de Proteção de Dados (LGPD).";

export const privacySections: PolicySection[] = [
  {
    id: "controlador",
    title: "Quem é responsável pelos seus dados",
    paragraphs: [
      "A Serena Massoterapia é a controladora dos dados pessoais tratados neste site e nos nossos canais de atendimento. Os dados de contato da clínica e do encarregado de proteção de dados estão no fim desta página.",
    ],
  },
  {
    id: "coleta",
    title: "Quais dados coletamos",
    paragraphs: [],
  },
  {
    id: "finalidades",
    title: "Para que usamos os seus dados",
    paragraphs: ["Usamos os dados pessoais apenas para:"],
    items: [
      "Agendar, confirmar, remarcar e cancelar sessões (execução de contrato — art. 7º, V, da LGPD);",
      "Responder às suas dúvidas e prestar atendimento (execução de contrato e legítimo interesse);",
      "Cumprir obrigações legais e fiscais, como a emissão de notas e recibos (art. 7º, II);",
      "Enviar novidades e promoções, somente se você autorizar — e você pode cancelar a qualquer momento (consentimento — art. 7º, I).",
    ],
  },
  {
    id: "saude",
    title: "Dados de saúde",
    paragraphs: [
      "Na primeira sessão, o profissional pode registrar informações sobre a sua saúde (como dores, cirurgias, gestação ou restrições médicas) para indicar a técnica adequada e garantir a sua segurança.",
      "Esses dados são sensíveis e tratados com cuidado redobrado: são acessados apenas pela equipe que realiza o seu atendimento, nunca são usados para fins comerciais e não são pedidos pelo site.",
    ],
  },
  {
    id: "compartilhamento",
    title: "Com quem compartilhamos",
    paragraphs: [],
  },
  {
    id: "cookies",
    title: "Cookies",
    paragraphs: [
      "Este site não usa cookies de publicidade nem ferramentas de rastreamento de terceiros. Podem ser usados apenas recursos técnicos essenciais ao funcionamento das páginas, que não identificam você.",
    ],
  },
  {
    id: "retencao",
    title: "Por quanto tempo guardamos",
    paragraphs: [
      "Mantemos os dados pelo tempo necessário para prestar o atendimento e cumprir obrigações legais (por exemplo, registros fiscais). Depois disso, eles são excluídos ou anonimizados.",
    ],
  },
  {
    id: "seguranca",
    title: "Como protegemos os seus dados",
    paragraphs: [
      "Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não autorizados, perda ou alteração, como conexão segura (HTTPS), acesso restrito à equipe e boas práticas de guarda das fichas de atendimento.",
    ],
  },
  {
    id: "direitos",
    title: "Seus direitos",
    paragraphs: ["Conforme o art. 18 da LGPD, você pode, a qualquer momento e sem custo:"],
    items: [
      "Confirmar se tratamos os seus dados e ter acesso a eles;",
      "Corrigir dados incompletos, inexatos ou desatualizados;",
      "Pedir a anonimização, o bloqueio ou a exclusão de dados desnecessários;",
      "Solicitar a portabilidade dos dados a outro fornecedor;",
      "Saber com quem compartilhamos os seus dados;",
      "Revogar o consentimento e pedir a exclusão dos dados tratados com base nele;",
      "Apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).",
    ],
  },
  {
    id: "alteracoes",
    title: "Alterações nesta política",
    paragraphs: [
      "Podemos atualizar esta política para refletir mudanças nos nossos serviços ou na legislação. A data da última atualização fica sempre no topo desta página.",
    ],
  },
];
