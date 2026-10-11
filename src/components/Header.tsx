import { useCallback, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Download, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { Button } from "./Button";
import { site } from "../config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const close = useCallback(() => setOpen(false), []);

  // Close after navigating.
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Escape closes the menu and returns focus to the toggle; lock page scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close if the viewport grows to desktop width.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 921px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />
        <nav className="nav" aria-label="Primary">
          {site.nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"} className="nav__link">
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="header__actions">
          <Button to="/download" size="sm" className="btn--desktop">
            <Download size={16} aria-hidden="true" />
            download
          </Button>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>
      <div id="mobile-menu" className="mobile-menu" data-open={open}>
        <nav aria-label="Mobile">
          <ul>
            {site.nav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === "/"} className="nav__link" onClick={close}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button to="/download" block>
          <Download size={18} aria-hidden="true" />
          download
        </Button>
      </div>
    </header>
  );
}
