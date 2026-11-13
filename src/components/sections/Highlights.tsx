import { copy } from "@/config/site";
import Icon, { type IconName } from "../Icon";

const items: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Profissionais certificados", text: "Equipe formada e em atualização constante." },
  { icon: "leaf", title: "Produtos naturais", text: "Óleos vegetais e essências de origem certificada." },
  { icon: "sun", title: "Ambiente acolhedor", text: "Salas climatizadas, silenciosas e higienizadas." },
  { icon: "chat", title: copy.highlightTitle, text: copy.highlightText },
];

export default function Highlights() {
  return (
    <section className="highlights" aria-label="Diferenciais">
      <div className="container highlights-grid">
        {items.map((i) => (
          <div key={i.title} className="highlight">
            <span className="highlight-icon">
              <Icon name={i.icon} />
            </span>
            <div>
              <strong>{i.title}</strong>
              <p>{i.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
