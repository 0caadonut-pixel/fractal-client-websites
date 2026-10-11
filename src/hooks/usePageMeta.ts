import { useEffect } from "react";
import { site } from "../config/site";

function setMeta(selector: string, value: string) {
  const el = document.head.querySelector<HTMLMetaElement>(selector);
  if (el) el.setAttribute("content", value);
}

/** Sets the document title, description and social metadata for the current page. */
export function usePageMeta(title: string | null, description?: string) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : site.name;
    const desc = description ?? site.description;
    document.title = fullTitle;
    setMeta('meta[name="description"]', desc);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', desc);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', desc);

    if (site.siteUrl) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = site.siteUrl.replace(/\/$/, "") + window.location.pathname;
    }
  }, [title, description]);
}
