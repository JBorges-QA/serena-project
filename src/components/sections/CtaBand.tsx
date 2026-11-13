import { copy } from "@/config/site";
import BookButton from "../BookButton";
import Icon from "../Icon";

export default function CtaBand() {
  return (
    <section className="cta-band-wrap">
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>
              Seu corpo pede uma <em>pausa</em>.
            </h2>
            <p>{copy.ctaText}</p>
          </div>
          <BookButton className="btn btn-light btn-lg">
            <Icon name="calendar" size={18} /> Agendar com desconto
          </BookButton>
        </div>
      </div>
    </section>
  );
}
