import type { Metadata } from "next";
import ChatWidget from "@/components/chat/ChatWidget";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { copy, isChat } from "@/config/site";
import { clinic } from "@/content/clinic";
import { privacyIntro, privacySections, privacyUpdatedAt, type PolicySection } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Política de Privacidade — Serena Massoterapia",
  description: "Como a Serena Massoterapia coleta, usa e protege os seus dados pessoais, conforme a LGPD.",
};

/** Seções que mudam conforme o modo de agendamento (chat ou WhatsApp). */
const byMode: Record<string, Pick<PolicySection, "paragraphs" | "items">> = {
  coleta: copy.privacyCollection,
  compartilhamento: copy.privacySharing,
};

export default function PrivacyPage() {
  const a = clinic.address;
  return (
    <>
      <Header />
      <main>
        <section className="section legal">
          <div className="container legal-inner">
            <span className="eyebrow">
              <i className="dot" /> LGPD
            </span>
            <h1>
              Política de <em>privacidade</em>
            </h1>
            <p className="legal-updated">Última atualização: {privacyUpdatedAt}</p>
            <p className="lead">{privacyIntro}</p>

            {privacySections.map((s, i) => {
              const { paragraphs, items } = byMode[s.id] ?? s;
              return (
                <article key={s.id} id={s.id} className="legal-block">
                  <h2>
                    {i + 1}. {s.title}
                  </h2>
                  {paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {items && (
                    <ul>
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
                </article>
              );
            })}

            <article id="contato-privacidade" className="legal-block legal-contact">
              <h2>{privacySections.length + 1}. Fale com o encarregado</h2>
              <p>
                Para exercer os seus direitos ou tirar dúvidas sobre esta política, fale com o nosso
                encarregado de proteção de dados. Respondemos em até 15 dias.
              </p>
              <ul>
                <li>
                  E-mail: <a href={`mailto:${clinic.email}`}>{clinic.email}</a>
                </li>
                <li>Telefone: {clinic.phone}</li>
                <li>
                  Endereço: {a.street}, {a.district}, {a.city}, CEP {a.zip}
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>
      <Footer />
      {isChat ? <ChatWidget /> : <WhatsAppButton />}
    </>
  );
}
