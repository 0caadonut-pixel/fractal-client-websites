import { ArrowRight, Download } from "lucide-react";
import { Button } from "../components/Button";
import { CommunityButton } from "../components/CommunityButton";
import { Container } from "../components/Container";
import { CtaSection } from "../components/CtaSection";
import { FeatureCard } from "../components/FeatureCard";
import { HeroMockup } from "../components/HeroMockup";
import { download, getDownloadState, statusLabels } from "../config/download";
import { site } from "../config/site";
import { features } from "../data/features";
import { usePageMeta } from "../hooks/usePageMeta";

const principles = [
  { title: "clarity over clutter", body: "Every control earns its place. Information appears where it is useful." },
  { title: "consistent interface", body: "One set of patterns for toggles, sliders and menus, so nothing has to be relearned." },
  { title: "restrained identity", body: "A dark, neutral base with purple used sparingly for the things that matter." },
  { title: "usability first", body: "Readable text, predictable layout and keyboard-friendly controls." },
];

export default function Home() {
  usePageMeta(null);
  const state = getDownloadState();

  return (
    <>
      <section className="hero">
        <Container>
          <div className="hero__grid">
            <div className="hero__copy">
              <span className="eyebrow">
                <span className="eyebrow__dot" aria-hidden="true" />
                minecraft client
              </span>
              <h1>
                your client.
                <br />
                <span className="accent">your configuration.</span>
              </h1>
              <p className="lead">
                {site.name} is a Minecraft client focused on a clean interface and clear, organized configuration.
              </p>
              <div className="btn-row">
                <Button to="/download">
                  <Download size={18} aria-hidden="true" />
                  download
                </Button>
                <CommunityButton variant="secondary" label="join community" />
              </div>
              <p className="status-pill">
                <span className="status-dot" data-state={state} aria-hidden="true" />
                release status: {statusLabels[state]}
                {download.versionLabel ? `, version ${download.versionLabel}` : ""}
              </p>
            </div>
            <HeroMockup />
          </div>
        </Container>
      </section>

      <section className="section section--alt" aria-labelledby="features-title">
        <Container>
          <div className="section__head">
            <h2 id="features-title">what we are building toward</h2>
            <p>These describe the project's design goals. Confirmed capabilities are documented on the modules page.</p>
          </div>
          <div className="grid grid--3">
            {features.map((f) => (
              <FeatureCard key={f.id} feature={f} />
            ))}
          </div>
          <div style={{ marginTop: "var(--s6)" }}>
            <Button to="/features" variant="secondary">
              all features
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="philosophy-title">
        <Container>
          <div className="split">
            <div className="section__head" style={{ marginBottom: 0 }}>
              <h2 id="philosophy-title">design philosophy</h2>
              <p>A client is something you look at for hours. It should be quiet, precise and easy to adjust.</p>
            </div>
            <ul className="principles">
              {principles.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span style={{ color: "var(--text-2)" }}>{p.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
