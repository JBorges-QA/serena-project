import { copy } from "@/config/site";
import { clinic, faqs } from "@/content/clinic";
import Icon from "../Icon";

export default function Contact() {
  const a = clinic.address;
  return (
    <section className="section" id="contato">
      <div className="container contact-grid">
        <div>
          <span className="eyebrow">Dúvidas frequentes</span>
          <h2>
            Antes de <em>vir</em>
          </h2>
          <div className="faq">
            {faqs.map((f, i) => (
              <details key={f.q} open={i === 0}>
                <summary>
                  {f.q}
                  <Icon name="plus" size={18} />
                </summary>
                <p>{f.id === "remarcar" ? copy.rescheduleFaq : f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <aside className="contact-card">
          <div className="map" aria-hidden>
            <svg viewBox="0 0 400 180" preserveAspectRatio="xMidYMid slice">
              <rect width="400" height="180" fill="#E9E2D6" />
              <g stroke="#fff" strokeWidth="10" fill="none">
                <path d="M-10 60 H420" />
                <path d="M-10 140 Q200 120 420 150" />
                <path d="M120 -10 V200" />
                <path d="M290 -10 Q270 90 300 200" />
              </g>
              <g stroke="#fff" strokeWidth="4" fill="none" opacity="0.8">
                <path d="M-10 100 H420" />
                <path d="M200 -10 V200" />
              </g>
              <rect x="135" y="72" width="50" height="20" rx="3" fill="#CFE0D3" />
              <rect x="215" y="20" width="60" height="30" rx="3" fill="#CFE0D3" />
            </svg>
            <span className="map-pin">
              <Icon name="pin" size={22} strokeWidth={2} />
            </span>
          </div>
          <ul className="contact-list">
            <li>
              <Icon name="pin" size={20} />
              <span>
                <strong>{a.street}</strong>
                {a.district}, {a.city}
              </span>
            </li>
            <li>
              <Icon name="phone" size={20} />
              <span>
                <strong>{clinic.phone}</strong>
                WhatsApp {clinic.whatsapp}
              </span>
            </li>
            <li>
              <Icon name="mail" size={20} />
              <span>
                <strong>{clinic.email}</strong>
                Respondemos em até 1 dia útil
              </span>
            </li>
          </ul>
          <div className="hours">
            <h3>
              <Icon name="clock" size={18} /> Horário de funcionamento
            </h3>
            {clinic.hours.map((h) => (
              <div key={h.days} className="hours-row">
                <span>{h.days}</span>
                <strong className={h.time === "Fechado" ? "closed" : ""}>{h.time}</strong>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
