import { team } from "@/content/clinic";
import Icon from "../Icon";

const stats = [
  { value: "12", label: "anos de experiência" },
  { value: "8 mil+", label: "sessões realizadas" },
  { value: "4,9", label: "nota média dos clientes" },
];

export default function About() {
  return (
    <section className="section about" id="sobre">
      <div className="container about-grid">
        <div className="team-panel">
          {team.map((m, i) => (
            <div key={m.name} className={`team-card team-${i}`}>
              <span className="team-avatar">{m.initials}</span>
              <div>
                <strong>{m.name}</strong>
                <small>{m.role}</small>
              </div>
              <span className="team-years">{m.years} anos</span>
            </div>
          ))}
          <div className="team-quote">
            <Icon name="leaf" size={20} />
            “Cuidar do corpo é a forma mais concreta de cuidar de quem somos.”
          </div>
        </div>

        <div className="about-copy">
          <span className="eyebrow">Sobre a Serena</span>
          <h2>
            Um espaço criado para você <em>desacelerar</em>
          </h2>
          <p>
            Nascemos em 2014 com uma ideia simples: oferecer massoterapia de alto nível em um ambiente onde
            as pessoas se sintam realmente acolhidas. Cada atendimento começa com uma conversa para entender
            suas queixas, rotina e objetivos.
          </p>
          <ul className="check-list">
            <li>Avaliação inicial personalizada em cada sessão</li>
            <li>Protocolos específicos para gestantes e atletas</li>
            <li>Pacotes mensais com condições especiais</li>
          </ul>
          <div className="stats">
            {stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
