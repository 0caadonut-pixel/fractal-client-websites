import { Button } from "./Button";
import { Container } from "./Container";
import { usePageMeta } from "../hooks/usePageMeta";

export function NotFound() {
  usePageMeta("page not found", "This page does not exist.");
  return (
    <Container>
      <div className="not-found">
        <span className="code">404</span>
        <h1>page not found</h1>
        <p>The page you are looking for does not exist or was moved.</p>
        <Button to="/">back to home</Button>
      </div>
    </Container>
  );
}
