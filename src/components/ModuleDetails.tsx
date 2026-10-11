import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { availabilityLabels, type ClientModule } from "../data/modules";
import { ModuleSettingsPreview } from "./ModuleSettingsPreview";

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ModuleDetails({ module, onClose }: { module: ClientModule; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previous?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} className="modal" role="dialog" aria-modal="true" aria-labelledby="module-dialog-title">
        <div className="modal__head">
          <div style={{ display: "grid", gap: 8 }}>
            <h2 id="module-dialog-title">{module.name}</h2>
            <div className="btn-row" style={{ gap: 8 }}>
              <span className="tag">{module.category}</span>
              <span className="tag">{module.kind === "preference" ? "client setting" : "module"}</span>
              <span className={`tag ${module.availability === "verified" ? "tag--ok" : module.availability === "planned" ? "tag--warn" : ""}`}>
                {availabilityLabels[module.availability]}
              </span>
            </div>
          </div>
          <button ref={closeRef} type="button" className="modal__close" aria-label="Close details" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <p>{module.longDescription ?? module.description}</p>

        {module.availability !== "verified" && (
          <div className="notice">
            <strong>{module.availability === "planned" ? "Planned entry" : "Illustrative example"}</strong>
            <span>This entry is not confirmed as a working feature of fractal client.</span>
          </div>
        )}

        <div>
          <h3 style={{ marginBottom: 8 }}>compatibility</h3>
          <p>{module.compatibility ?? "No compatibility information has been provided."}</p>
        </div>

        <div>
          <h3 style={{ marginBottom: 8 }}>settings</h3>
          {module.settings && module.settings.length > 0 ? (
            <ModuleSettingsPreview settings={module.settings} />
          ) : (
            <p>No settings are documented for this entry.</p>
          )}
        </div>
      </div>
    </div>
  );
}
