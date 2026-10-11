import { useCallback, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../components/Button";
import { Container } from "../components/Container";
import { CategoryNav, EmptyResults, ModuleToolbar, type CategoryFilter } from "../components/ModuleFilters";
import { ModuleCard } from "../components/ModuleCard";
import { ModuleDetails } from "../components/ModuleDetails";
import { ModuleSettingsPreview } from "../components/ModuleSettingsPreview";
import { PageIntro } from "../components/PageIntro";
import { moduleCategories, modules, type ClientModule } from "../data/modules";
import { usePageMeta } from "../hooks/usePageMeta";

function matchesQuery(m: ClientModule, q: string): boolean {
  if (!q) return true;
  return [m.name, m.description, m.longDescription ?? ""].some((t) => t.toLowerCase().includes(q));
}

export default function Modules() {
  usePageMeta("modules", "Browse the fractal client module catalog by category, with search and settings previews.");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<ClientModule | null>(null);

  const q = query.trim().toLowerCase();

  // Counts respect the current search text so the numbers match what a category would show.
  const counts = useMemo(() => {
    const base = modules.filter((m) => matchesQuery(m, q));
    const result = { all: base.length } as Record<CategoryFilter, number>;
    for (const c of moduleCategories) result[c.id] = base.filter((m) => m.category === c.id).length;
    return result;
  }, [q]);

  const results = useMemo(
    () => modules.filter((m) => (category === "all" || m.category === category) && matchesQuery(m, q)),
    [category, q],
  );

  const reset = useCallback(() => {
    setCategory("all");
    setQuery("");
  }, []);
  const closeDetails = useCallback(() => setSelected(null), []);

  const activeBlurb = moduleCategories.find((c) => c.id === category)?.blurb;
  const preference = modules.find((m) => m.kind === "preference" && m.settings?.length);

  return (
    <>
      <Container>
        <PageIntro eyebrow="modules" title="modules">
          <p className="lead">
            Modules group client functionality into categories. Browse, search and open an entry to see its documented settings.
          </p>
          <div className="notice" style={{ maxWidth: 680 }}>
            <strong>Catalog framework with example entries</strong>
            <span>
              Entries marked "illustrative example" or "planned" are not confirmed features of fractal client. They show how the catalog works and will be replaced with verified modules.
            </span>
          </div>
        </PageIntro>
      </Container>

      <Container className="mod-layout" as="section">
        <CategoryNav category={category} counts={counts} onCategory={setCategory} />
        <div>
          <ModuleToolbar
            category={category}
            query={query}
            counts={counts}
            onCategory={setCategory}
            onQuery={setQuery}
            onReset={reset}
            canReset={category !== "all" || query !== ""}
          />
          <p className="mod-count" aria-live="polite">
            {results.length} {results.length === 1 ? "module" : "modules"}
            {category !== "all" ? ` in ${category}` : ""}
            {q ? ` matching "${query.trim()}"` : ""}
            {activeBlurb && category !== "all" ? `. ${activeBlurb}` : ""}
          </p>

          {results.length === 0 ? (
            <EmptyResults onReset={reset} />
          ) : (
            <ul className="mod-list">
              {results.map((m) => (
                <li key={m.id}>
                  <ModuleCard module={m} onSelect={setSelected} />
                </li>
              ))}
            </ul>
          )}

          {preference?.settings && (
            <section className="settings-section" aria-labelledby="settings-demo-title">
              <div className="section__head" style={{ marginBottom: "var(--s5)" }}>
                <h2 id="settings-demo-title">client settings</h2>
                <p>
                  General client options are separate from toggleable modules. This is an interactive demonstration of the settings data model.
                </p>
              </div>
              <ModuleSettingsPreview settings={preference.settings} />
            </section>
          )}

          <div style={{ marginTop: "var(--s7)" }}>
            <Button to="/download" variant="secondary">
              go to download
              <ArrowRight size={18} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>

      {selected && <ModuleDetails module={selected} onClose={closeDetails} />}
    </>
  );
}
