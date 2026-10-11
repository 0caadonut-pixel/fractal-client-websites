import { useMemo } from "react";
import { Container } from "../components/Container";
import { CommunityButton } from "../components/CommunityButton";
import { FAQAccordion } from "../components/FAQAccordion";
import { PageIntro } from "../components/PageIntro";
import { buildFaq } from "../data/faq";
import { usePageMeta } from "../hooks/usePageMeta";

export default function FAQ() {
  usePageMeta("faq", "Frequently asked questions about fractal client.");
  const items = useMemo(() => buildFaq(), []);
  return (
    <>
      <Container>
        <PageIntro eyebrow="faq" title="frequently asked questions">
          <p className="lead">Answers reflect what is currently known. Where something is unknown, it says so.</p>
        </PageIntro>
      </Container>
      <Container as="section" className="section">
        <div style={{ maxWidth: 780 }}>
          <FAQAccordion items={items} />
        </div>
      </Container>
      <Container as="section" className="section">
        <div className="cta">
          <h2>still have a question?</h2>
          <p>Ask in the official community server.</p>
          <CommunityButton variant="primary" />
        </div>
      </Container>
    </>
  );
}
