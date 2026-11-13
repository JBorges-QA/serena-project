import { copy } from "@/config/site";
import BookButton from "../BookButton";
import Icon, { type IconName } from "../Icon";

const steps: { icon: IconName; title: string; text: string }[] = [
  { icon: "chat", title: copy.stepOneTitle, text: copy.stepOneText },
  { icon: "calendar", title: "Escolha dia e horário", text: copy.stepTwoText },
  { icon: "leaf", title: "Venha relaxar", text: "Receba a confirmação no WhatsApp e chegue 10 minutos antes. O resto é com a gente." },
];

export default function HowItWorks() {
  return (
    <section className="section how" id="como-funciona">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Como funciona</span>
          <h2>
            Agendar é tão leve <em>quanto a sessão</em>
          </h2>
        </div>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title} className="step">
              <span className="step-num">0{i + 1}</span>
              <span className="step-icon">
                <Icon name={s.icon} size={24} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="center">
          <BookButton className="btn btn-primary btn-lg">
            <Icon name="chat" size={18} /> {copy.howCta}
          </BookButton>
        </div>
      </div>
    </section>
  );
}
