import { ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { Container } from "./Container";

interface CtaSectionProps {
  title?: string;
  body?: string;
}

export function CtaSection({
  title = "get fractal client",
  body = "The download page shows the current release status, installation steps and troubleshooting. If a release is not published yet, it says so.",
}: CtaSectionProps) {
  return (
    <section className="section" aria-labelledby="cta-title">
      <Container>
        <div className="cta">
          <h2 id="cta-title">{title}</h2>
          <p>{body}</p>
          <Button to="/download">
            go to download
            <ArrowRight size={18} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
