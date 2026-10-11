import { ChevronRight } from "lucide-react";
import { availabilityLabels, type ClientModule } from "../data/modules";

export function ModuleCard({ module, onSelect }: { module: ClientModule; onSelect: (m: ClientModule) => void }) {
  return (
    <button type="button" className="mod-row" onClick={() => onSelect(module)} aria-haspopup="dialog">
      <span>
        <span className="mod-row__name">
          {module.name}
          <span className={`tag ${module.availability === "verified" ? "tag--ok" : module.availability === "planned" ? "tag--warn" : ""}`}>
            {availabilityLabels[module.availability]}
          </span>
        </span>
        <span className="mod-row__desc" style={{ display: "block" }}>{module.description}</span>
      </span>
      <span className="mod-row__side">
        <span className="tag">{module.category}</span>
        <ChevronRight size={18} aria-hidden="true" color="var(--text-3)" />
      </span>
    </button>
  );
}
