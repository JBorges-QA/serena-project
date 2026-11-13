import { testimonials } from "@/content/clinic";
import Icon from "../Icon";

export default function Testimonials() {
  return (
    <section className="section testimonials" id="depoimentos">
      <div className="container">
        <div className="section-head">
          <span className="eyebrow">Depoimentos</span>
          <h2>
            Quem vem, <em>volta</em>
          </h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map((t) => (
            <figure key={t.name} className="testimonial">
              <div className="stars" aria-label="5 estrelas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} name="star" size={16} />
                ))}
              </div>
              <blockquote>“{t.text}”</blockquote>
              <figcaption>
                <span className="t-avatar">{t.name.charAt(0)}</span>
                <span>
                  <strong>{t.name}</strong>
                  <small>{t.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
