import { Container } from "../components/Container";
import { CtaSection } from "../components/CtaSection";
import { FeatureCard } from "../components/FeatureCard";
import { PageIntro } from "../components/PageIntro";
import { Button } from "../components/Button";
import { featureCategories, features } from "../data/features";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Features() {
  usePageMeta("features", "Design goals and intended features of fractal client.");
  return (
    <>
      <Container>
        <PageIntro eyebrow="features" title="features">
          <p className="lead">
            What fractal client aims to be. Items are labeled as design goals or planned. A feature is only called confirmed once the project owner verifies it.
          </p>
        </PageIntro>
      </Container>

      <Container className="section" as="section">
        <div className="stack--lg stack">
          {featureCategories.map((cat) => (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              <div className="section__head" style={{ marginBottom: "var(--s5)" }}>
                <h2 id={`cat-${cat.id}`}>{cat.title}</h2>
                <p>{cat.blurb}</p>
              </div>
              <div className="grid grid--3">
                {features.filter((f) => f.category === cat.id).map((f) => (
                  <FeatureCard key={f.id} feature={f} showStatus />
                ))}
              </div>
            </section>
          ))}
        </div>
      </Container>

      <section className="section section--alt" aria-labelledby="customization-title">
        <Container>
          <div className="split">
            <div className="section__head" style={{ marginBottom: 0 }}>
              <h2 id="customization-title">interface customization</h2>
              <p>
                Customization is a core goal: appearance and behavior should be adjustable without digging through nested menus.
              </p>
            </div>
            <div className="stack">
              <p>
                The modules page documents how options are organized into categories, with typed settings such as toggles, numbers, dropdowns, colors and keybinds.
              </p>
              <p>The settings shown there are a website demonstration and do not change the real client.</p>
              <div>
                <Button to="/modules" variant="secondary">browse the module catalog</Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
