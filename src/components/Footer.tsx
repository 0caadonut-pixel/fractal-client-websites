import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { site } from "../config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <Logo />
            <p>A Minecraft client built around a clean interface and clear configuration.</p>
          </div>
          <nav aria-label="Footer">
            <h2>pages</h2>
            <ul>
              {site.nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>project</h2>
            <ul>
              <li>
                <a href={site.communityUrl} target="_blank" rel="noopener noreferrer">
                  discord<span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <Link to="/download">download</Link>
              </li>
              {site.githubUrl && (
                <li>
                  <a href={site.githubUrl} target="_blank" rel="noopener noreferrer">github</a>
                </li>
              )}
              {site.docsUrl && (
                <li>
                  <a href={site.docsUrl} target="_blank" rel="noopener noreferrer">documentation</a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p>&copy; {year} {site.name}</p>
          <p>Not affiliated with Mojang Studios or Microsoft.</p>
        </div>
      </div>
    </footer>
  );
}
