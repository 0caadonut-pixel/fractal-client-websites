// Central site configuration. Edit values here; do not hard-code them in components.

export interface NavItem {
  label: string;
  to: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  /** Real production domain, e.g. "https://example.com". Leave empty until one exists. */
  siteUrl: string;
  /** Official community invitation. Every community button reads this value. */
  communityUrl: string;
  /** Optional real destinations. Leave empty to hide the matching links. */
  githubUrl: string;
  docsUrl: string;
  nav: NavItem[];
}

export const site: SiteConfig = {
  name: "fractal client",
  tagline: "your client. your configuration.",
  description: "The official website for fractal client, a Minecraft client.",
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? "",
  communityUrl: "https://discord.gg/RazHmSvdRK",
  githubUrl: "",
  docsUrl: "",
  nav: [
    { label: "home", to: "/" },
    { label: "modules", to: "/modules" },
    { label: "features", to: "/features" },
    { label: "download", to: "/download" },
    { label: "faq", to: "/faq" },
    { label: "community", to: "/community" },
  ],
};
