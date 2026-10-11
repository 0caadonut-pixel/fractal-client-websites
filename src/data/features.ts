import type { LucideIcon } from "lucide-react";
import { Eye, LayoutPanelTop, Layers, SlidersHorizontal, Sparkles, ShieldCheck } from "lucide-react";

export interface Feature {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  category: "interface" | "configuration" | "principles";
  /** goal = a stated design goal; planned = intended but not confirmed. */
  status: "goal" | "planned";
}

// Feature copy describes design goals, not verified client capabilities.
export const features: Feature[] = [
  {
    id: "clean-interface",
    icon: LayoutPanelTop,
    title: "clean interface",
    description: "A consistent, uncluttered menu where controls are easy to find.",
    category: "interface",
    status: "goal",
  },
  {
    id: "customization",
    icon: Sparkles,
    title: "interface customization",
    description: "Appearance options so the client can fit the way you play.",
    category: "interface",
    status: "planned",
  },
  {
    id: "modules",
    icon: Layers,
    title: "organized modules",
    description: "Functionality grouped into clear categories you can browse quickly.",
    category: "configuration",
    status: "goal",
  },
  {
    id: "configuration",
    icon: SlidersHorizontal,
    title: "configurable behavior",
    description: "Settings are designed to be grouped, described and easy to reset.",
    category: "configuration",
    status: "planned",
  },
  {
    id: "clarity",
    icon: Eye,
    title: "clarity over clutter",
    description: "Information is shown only where it helps, with restrained visuals.",
    category: "principles",
    status: "goal",
  },
  {
    id: "honesty",
    icon: ShieldCheck,
    title: "honest documentation",
    description: "Features are listed as confirmed only once the project owner verifies them.",
    category: "principles",
    status: "goal",
  },
];

export const featureCategories: { id: Feature["category"]; title: string; blurb: string }[] = [
  { id: "interface", title: "interface", blurb: "How the client looks and feels." },
  { id: "configuration", title: "configuration", blurb: "How the client is organized and adjusted." },
  { id: "principles", title: "principles", blurb: "The approach behind the project." },
];
