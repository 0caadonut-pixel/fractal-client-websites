import { Link } from "react-router-dom";
import { site } from "../config/site";

export function LogoMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <path d="M16 4 27 10v12L16 28 5 22V10z" fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 11l5 3v6l-5 3-5-3v-6z" fill="#8b5cf6" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label={`${site.name} home`}>
      <LogoMark />
      <span>{site.name}</span>
    </Link>
  );
}
