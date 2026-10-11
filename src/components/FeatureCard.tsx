import type { Feature } from "../data/features";

export function FeatureCard({ feature, showStatus = false }: { feature: Feature; showStatus?: boolean }) {
  const Icon = feature.icon;
  return (
    <article className="card">
      <div className="card__icon">
        <Icon size={18} aria-hidden="true" />
      </div>
      <h3>{feature.title}</h3>
      <p>{feature.description}</p>
      {showStatus && <span className="tag">{feature.status === "goal" ? "design goal" : "planned"}</span>}
    </article>
  );
}
