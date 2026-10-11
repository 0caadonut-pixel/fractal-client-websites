import { Search, RotateCcw } from "lucide-react";
import { moduleCategories, type ModuleCategory } from "../data/modules";

export type CategoryFilter = ModuleCategory | "all";

interface Props {
  category: CategoryFilter;
  query: string;
  counts: Record<CategoryFilter, number>;
  onCategory: (c: CategoryFilter) => void;
  onQuery: (q: string) => void;
  onReset: () => void;
  canReset: boolean;
}

const allCategories: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "all" },
  ...moduleCategories.map((c) => ({ id: c.id as CategoryFilter, label: c.label })),
];

/** Desktop sidebar categories. */
export function CategoryNav({ category, counts, onCategory }: Pick<Props, "category" | "counts" | "onCategory">) {
  return (
    <nav className="mod-side" aria-label="Module categories">
      {allCategories.map((c) => (
        <button key={c.id} type="button" className="cat-btn" aria-pressed={category === c.id} onClick={() => onCategory(c.id)}>
          <span>{c.label}</span>
          <span className="cat-btn__count">{counts[c.id]}</span>
        </button>
      ))}
    </nav>
  );
}

/** Mobile category chips plus search and reset controls. */
export function ModuleToolbar({ category, query, counts, onCategory, onQuery, onReset, canReset }: Props) {
  return (
    <>
      <div className="cat-chips" role="group" aria-label="Module categories">
        {allCategories.map((c) => (
          <button key={c.id} type="button" className="chip" aria-pressed={category === c.id} onClick={() => onCategory(c.id)}>
            {c.label} ({counts[c.id]})
          </button>
        ))}
      </div>
      <div className="mod-toolbar" role="search">
        <div className="search">
          <label htmlFor="module-search" className="visually-hidden">Search modules by name or description</label>
          <Search size={18} aria-hidden="true" />
          <input
            id="module-search"
            type="search"
            value={query}
            placeholder="search modules"
            autoComplete="off"
            onChange={(e) => onQuery(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn--secondary btn--sm" onClick={onReset} disabled={!canReset} style={canReset ? undefined : { opacity: 0.5, cursor: "not-allowed" }}>
          <RotateCcw size={16} aria-hidden="true" />
          reset filters
        </button>
      </div>
    </>
  );
}

export function EmptyResults({ onReset }: { onReset: () => void }) {
  return (
    <div className="empty" role="status">
      <h3>no modules match</h3>
      <p>Try a different search term or choose another category.</p>
      <button type="button" className="btn btn--secondary btn--sm" onClick={onReset}>clear search and filters</button>
    </div>
  );
}
