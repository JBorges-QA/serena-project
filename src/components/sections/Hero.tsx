import { copy } from "@/config/site";
import BookButton from "../BookButton";
import Icon from "../Icon";

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="dot" /> Clínica de massoterapia em São Paulo
          </span>
          <h1>
            Pausa para o corpo, <em>leveza</em> para a mente.
          </h1>
          <p className="lead">{copy.heroLead}</p>
          <div className="hero-actions">
            <BookButton className="btn btn-primary btn-lg">
              <Icon name="calendar" size={18} /> Agendar minha sessão
            </BookButton>
            <a href="#servicos" className="btn btn-ghost btn-lg">
              Ver serviços
            </a>
          </div>
          <ul className="hero-proof">
            <li>
              <div className="avatars" aria-hidden>
                <span>CM</span>
                <span>BT</span>
                <span>HS</span>
              </div>
              <div>
                <strong>
                  4,9 <Icon name="star" size={14} className="star" />
                </strong>
                <small>+320 avaliações</small>
              </div>
            </li>
            <li>
              <strong>12 anos</strong>
              <small>de experiência</small>
            </li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden>
          <div className="arch">
            <svg viewBox="0 0 400 480" className="arch-art">
              <defs>
                <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F4E6DA" />
                  <stop offset="1" stopColor="#E6D4C3" />
                </linearGradient>
                <linearGradient id="stone1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#5B7769" />
                  <stop offset="1" stopColor="#2F4A3E" />
                </linearGradient>
                <linearGradient id="stone2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#7E9A8B" />
                  <stop offset="1" stopColor="#4A6B5C" />
                </linearGradient>
                <linearGradient id="stone3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#A9BDB1" />
                  <stop offset="1" stopColor="#6E8F7E" />
                </linearGradient>
              </defs>
              <rect width="400" height="480" fill="url(#sky)" />
              <circle cx="290" cy="120" r="54" fill="#E9B595" opacity="0.55" />
              <path d="M0 330 Q100 290 200 320 T400 300 V480 H0Z" fill="#D9C4B0" opacity="0.6" />
              <path d="M0 370 Q120 340 220 365 T400 355 V480 H0Z" fill="#CDB59E" opacity="0.55" />
              {/* folhas */}
              <g stroke="#3F6152" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.85">
                <path d="M92 300 C 80 230, 70 190, 40 150" />
                <path d="M86 260 C 60 250, 48 236, 40 214" />
                <path d="M80 226 C 100 210, 104 192, 100 172" />
                <path d="M74 196 C 54 190, 46 178, 44 162" />
              </g>
              <g fill="#6E8F7E" opacity="0.8">
                <ellipse cx="52" cy="226" rx="16" ry="7" transform="rotate(35 52 226)" />
                <ellipse cx="102" cy="190" rx="16" ry="7" transform="rotate(-70 102 190)" />
                <ellipse cx="50" cy="172" rx="14" ry="6" transform="rotate(55 50 172)" />
                <ellipse cx="40" cy="150" rx="12" ry="5" transform="rotate(60 40 150)" />
              </g>
              {/* pedras empilhadas */}
              <ellipse cx="215" cy="408" rx="112" ry="14" fill="#2F4A3E" opacity="0.15" />
              <ellipse cx="215" cy="378" rx="98" ry="34" fill="url(#stone1)" />
              <ellipse cx="208" cy="320" rx="76" ry="28" fill="url(#stone2)" />
              <ellipse cx="218" cy="272" rx="56" ry="22" fill="url(#stone3)" />
              <ellipse cx="212" cy="235" rx="36" ry="15" fill="#C9D6CD" />
              <g fill="#fff" opacity="0.22">
                <ellipse cx="185" cy="365" rx="40" ry="8" />
                <ellipse cx="190" cy="310" rx="28" ry="6" />
                <ellipse cx="205" cy="264" rx="20" ry="5" />
                <ellipse cx="204" cy="229" rx="12" ry="4" />
              </g>
            </svg>
          </div>

          <div className="float-card float-a">
            <span className="float-icon">
              <Icon name="clock" size={18} />
            </span>
            <div>
              <small>Próximo horário</small>
              <strong>Hoje, 16:00</strong>
            </div>
          </div>

          <div className="float-card float-b">
            <span className="float-icon clay">
              <Icon name="chat" size={18} />
            </span>
            <div>
              <small>{copy.heroCardLabel}</small>
              <strong>{copy.heroCardValue}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
