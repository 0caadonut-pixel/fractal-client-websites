import { Bug, LifeBuoy, Megaphone } from "lucide-react";
import { Container } from "../components/Container";
import { CommunityButton } from "../components/CommunityButton";
import { PageIntro } from "../components/PageIntro";
import { usePageMeta } from "../hooks/usePageMeta";

const items = [
  { icon: LifeBuoy, title: "get help", body: "Ask installation and usage questions in the server. Answers come from community members and are not guaranteed." },
  { icon: Bug, title: "report bugs", body: "Include your game version, what you expected, what happened and steps to reproduce it." },
  { icon: Megaphone, title: "follow updates", body: "Project announcements and release news are shared through the community server when available." },
];

export default function Community() {
  usePageMeta("community", "Join the fractal client community on Discord.");
  return (
    <>
      <Container>
        <PageIntro eyebrow="community" title="community">
          <p className="lead">The official place to talk about fractal client, ask for help and report problems.</p>
          <div>
            <CommunityButton variant="primary" label="join discord" />
          </div>
        </PageIntro>
      </Container>
      <Container as="section" className="section">
        <div className="grid grid--3">
          {items.map(({ icon: Icon, title, body }) => (
            <article className="card" key={title}>
              <div className="card__icon"><Icon size={18} aria-hidden="true" /></div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </Container>
    </>
  );
}
