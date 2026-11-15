"use client";

import { useEffect, useState } from "react";
import { clinic } from "@/content/clinic";
import BookButton from "./BookButton";
import Icon from "./Icon";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#sobre", label: "Sobre" },
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#depoimentos", label: "Depoimentos" },
  { href: "/#contato", label: "Contato" },
];

export function Logo() {
  return (
    <a href="/#inicio" className="logo" aria-label={clinic.fullName}>
      <span className="logo-mark">
        <Icon name="leaf" size={20} />
      </span>
      <span className="logo-text">
        {clinic.name}
        <small>massoterapia</small>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""} ${menu ? "menu-open" : ""}`}>
      <div className="container header-inner">
        <Logo />

        <nav className="nav" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenu(false)}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-phone" href={`tel:${clinic.phone.replace(/\D/g, "")}`}>
            <Icon name="phone" size={16} />
            {clinic.phone}
          </a>
          <BookButton className="btn btn-primary btn-sm">Agendar</BookButton>
          <button
            className="menu-toggle"
            onClick={() => setMenu((v) => !v)}
            aria-label={menu ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menu}
          >
            <Icon name={menu ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
