import { clinic, services } from "@/content/clinic";
import { Logo } from "../Header";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Logo />
          <p className="footer-tag">{clinic.tagline}.</p>
        </div>
        <div>
          <h4>Serviços</h4>
          <ul>
            {services.slice(0, 4).map((s) => (
              <li key={s.id}>
                <a href="/#servicos">{s.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Clínica</h4>
          <ul>
            <li><a href="/#sobre">Sobre nós</a></li>
            <li><a href="/#depoimentos">Depoimentos</a></li>
            <li><a href="/#contato">Contato</a></li>
            <li><a href="/privacidade">Política de privacidade</a></li>
          </ul>
        </div>
        <div>
          <h4>Contato</h4>
          <ul>
            <li>{clinic.phone}</li>
            <li>{clinic.email}</li>
            <li>{clinic.address.district}, {clinic.address.city}</li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {clinic.fullName}. Todos os direitos reservados.</span>
        <span>
          <a href="/privacidade">Política de privacidade</a> • Site demonstrativo
        </span>
      </div>
    </footer>
  );
}
