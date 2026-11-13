import { formatPrice, services } from "@/content/clinic";
import BookButton from "../BookButton";
import Icon from "../Icon";

export default function Services() {
  return (
    <section className="section" id="servicos">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Nossos serviços</span>
          <h2>
            Terapias para cada <em>necessidade</em>
          </h2>
          <p>
            Do alívio de dores crônicas ao relaxamento profundo: cada sessão é adaptada ao seu corpo e ao seu
            momento.
          </p>
        </div>

        <div className="services-grid">
          {services.map((s) => (
            <article key={s.id} className="service-card">
              <span className="service-icon">
                <Icon name={s.icon} size={26} />
              </span>
              <h3>{s.name}</h3>
              <p>{s.description}</p>
              <div className="service-meta">
                <span>
                  <Icon name="clock" size={15} /> {s.durationMin} min
                </span>
                <strong>{formatPrice(s.price)}</strong>
              </div>
              <BookButton serviceId={s.id} serviceName={s.name} className="service-link">
                Agendar <Icon name="arrow" size={16} />
              </BookButton>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
