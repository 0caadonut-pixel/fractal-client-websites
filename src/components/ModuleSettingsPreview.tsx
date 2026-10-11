import { useMemo, useState } from "react";
import { FlaskConical, RotateCcw } from "lucide-react";
import type { SettingDefinition } from "../data/modules";

type Value = string | number | boolean;

function defaults(settings: SettingDefinition[]): Record<string, Value> {
  return Object.fromEntries(settings.map((s) => [s.id, s.defaultValue]));
}

function Control({ setting, value, onChange }: { setting: SettingDefinition; value: Value; onChange: (v: Value) => void }) {
  const id = `setting-${setting.id}`;
  switch (setting.type) {
    case "boolean":
      return (
        <button type="button" role="switch" id={id} className="switch" aria-checked={Boolean(value)} aria-label={setting.label} onClick={() => onChange(!value)} />
      );
    case "number":
      return (
        <span className="setting__num">
          <input id={id} type="range" min={setting.min} max={setting.max} step={setting.step ?? 1} value={Number(value)} onChange={(e) => onChange(Number(e.target.value))} aria-label={setting.label} />
          <output htmlFor={id}>{String(value)}{setting.unit ?? ""}</output>
        </span>
      );
    case "select":
      return (
        <select id={id} value={String(value)} onChange={(e) => onChange(e.target.value)} aria-label={setting.label}>
          {setting.options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      );
    case "color":
      return <input id={id} type="color" value={String(value)} onChange={(e) => onChange(e.target.value)} aria-label={setting.label} />;
    case "keybind":
      // Keybinds are documentation only: the website never captures or changes real keybinds.
      return <kbd className="keycap" id={id}>{String(value)}</kbd>;
    case "text":
      return <input id={id} type="text" value={String(value)} placeholder={setting.placeholder} onChange={(e) => onChange(e.target.value)} aria-label={setting.label} />;
  }
}

export function ModuleSettingsPreview({ settings }: { settings: SettingDefinition[] }) {
  const [values, setValues] = useState<Record<string, Value>>(() => defaults(settings));

  const groups = useMemo(() => {
    const map = new Map<string, SettingDefinition[]>();
    for (const s of settings) {
      const key = s.group ?? "";
      map.set(key, [...(map.get(key) ?? []), s]);
    }
    return [...map.entries()];
  }, [settings]);

  return (
    <div className="preview">
      <div className="panel__head">
        <span className="preview__label">
          <FlaskConical size={14} aria-hidden="true" />
          website demonstration. Changes here are not saved and do not affect the client.
        </span>
        <button type="button" className="btn btn--ghost btn--sm" onClick={() => setValues(defaults(settings))}>
          <RotateCcw size={14} aria-hidden="true" />
          reset to defaults
        </button>
      </div>
      {groups.map(([group, items]) => (
        <div className="preview__group" key={group || "default"}>
          {group && <h4>{group}</h4>}
          <div>
            {items.map((s) => (
              <div className="setting" key={s.id}>
                <label className="setting__label" htmlFor={`setting-${s.id}`}>
                  {s.label}
                  {s.description && <span className="setting__desc">{s.description}</span>}
                  <span className="setting__desc">type: {s.type === "keybind" ? "keybind (documented default)" : s.type}</span>
                </label>
                <Control setting={s} value={values[s.id] ?? s.defaultValue} onChange={(v) => setValues((prev) => ({ ...prev, [s.id]: v }))} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
