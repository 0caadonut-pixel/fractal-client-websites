// Central module catalog. The /modules page, filters, search and detail view all read this file.
//
// IMPORTANT: the entries below are ILLUSTRATIVE EXAMPLES that show how the catalog works.
// They are not a list of confirmed fractal client modules. Replace them with verified
// modules and change availability to "verified" for confirmed ones.

export type ModuleCategory =
  | "combat"
  | "render"
  | "movement"
  | "player"
  | "world"
  | "misc"
  | "hud"
  | "settings";

export const moduleCategories: { id: ModuleCategory; label: string; blurb: string }[] = [
  { id: "combat", label: "combat", blurb: "Combat-related modules." },
  { id: "render", label: "render", blurb: "Visual presentation and display effects." },
  { id: "movement", label: "movement", blurb: "Movement-related functionality." },
  { id: "player", label: "player", blurb: "Player utilities and information." },
  { id: "world", label: "world", blurb: "World features and interactions." },
  { id: "misc", label: "misc", blurb: "Modules that fit no other category." },
  { id: "hud", label: "hud", blurb: "Heads-up display elements and interface customization." },
  { id: "settings", label: "settings", blurb: "General client configuration and preferences." },
];

/** verified = confirmed by the project owner; illustrative = example only; planned = not built yet. */
export type Availability = "verified" | "illustrative" | "planned";

export const availabilityLabels: Record<Availability, string> = {
  verified: "verified",
  illustrative: "illustrative example",
  planned: "planned",
};

interface SettingBase {
  id: string;
  label: string;
  description?: string;
  /** Optional group name used to cluster settings in the preview. */
  group?: string;
}

export type SettingDefinition =
  | (SettingBase & { type: "boolean"; defaultValue: boolean })
  | (SettingBase & { type: "number"; defaultValue: number; min: number; max: number; step?: number; unit?: string })
  | (SettingBase & { type: "select"; defaultValue: string; options: string[] })
  | (SettingBase & { type: "color"; defaultValue: string })
  | (SettingBase & { type: "keybind"; defaultValue: string })
  | (SettingBase & { type: "text"; defaultValue: string; placeholder?: string });

export interface ClientModule {
  id: string;
  name: string;
  category: ModuleCategory;
  /** "module" entries are toggleable features; "preference" entries are general client settings. */
  kind: "module" | "preference";
  description: string;
  longDescription?: string;
  availability: Availability;
  settings?: SettingDefinition[];
  compatibility?: string;
}

export const modules: ClientModule[] = [
  {
    id: "example-reach-display",
    name: "Reach Display",
    category: "combat",
    kind: "module",
    description: "Example entry: shows hit distance after an attack.",
    longDescription:
      "An illustrative entry showing how a combat module could be documented. It does not describe a confirmed feature of fractal client.",
    availability: "illustrative",
    settings: [
      { id: "decimals", type: "number", label: "Decimal places", defaultValue: 2, min: 0, max: 3, step: 1 },
      { id: "fade", type: "boolean", label: "Fade out", description: "Fade the text after a short delay.", defaultValue: true },
    ],
  },
  {
    id: "example-combo-counter",
    name: "Combo Counter",
    category: "combat",
    kind: "module",
    description: "Example entry: counts consecutive hits.",
    availability: "illustrative",
    settings: [{ id: "reset", type: "number", label: "Reset delay", defaultValue: 3, min: 1, max: 10, step: 1, unit: "s" }],
  },
  {
    id: "example-block-outline",
    name: "Block Outline",
    category: "render",
    kind: "module",
    description: "Example entry: customizes the targeted block outline.",
    longDescription:
      "An illustrative render module with grouped settings, used to demonstrate the settings preview.",
    availability: "illustrative",
    settings: [
      { id: "color", type: "color", group: "appearance", label: "Outline color", defaultValue: "#a78bfa" },
      { id: "width", type: "number", group: "appearance", label: "Line width", defaultValue: 2, min: 1, max: 6, step: 1, unit: "px" },
      { id: "mode", type: "select", group: "behavior", label: "Style", defaultValue: "solid", options: ["solid", "dashed", "pulse"] },
    ],
  },
  {
    id: "example-zoom",
    name: "Zoom",
    category: "render",
    kind: "module",
    description: "Example entry: temporary camera zoom while a key is held.",
    availability: "illustrative",
    settings: [
      { id: "key", type: "keybind", label: "Zoom key", description: "Documented default key.", defaultValue: "C" },
      { id: "factor", type: "number", label: "Zoom factor", defaultValue: 4, min: 1, max: 10, step: 1, unit: "x" },
    ],
  },
  {
    id: "example-toggle-sprint",
    name: "Toggle Sprint",
    category: "movement",
    kind: "module",
    description: "Example entry: keeps sprint active without holding the key.",
    availability: "illustrative",
    settings: [{ id: "hud", type: "boolean", label: "Show status on HUD", defaultValue: true }],
  },
  {
    id: "example-coordinates",
    name: "Coordinates",
    category: "player",
    kind: "module",
    description: "Example entry: shows the player's position.",
    availability: "illustrative",
    settings: [{ id: "format", type: "select", label: "Format", defaultValue: "xyz", options: ["xyz", "xz", "block"] }],
  },
  {
    id: "example-armor-status",
    name: "Armor Status",
    category: "player",
    kind: "module",
    description: "Example entry: shows equipped armor and durability.",
    availability: "planned",
  },
  {
    id: "example-chunk-borders",
    name: "Chunk Borders",
    category: "world",
    kind: "module",
    description: "Example entry: displays chunk boundaries in the world.",
    availability: "illustrative",
    compatibility: "Compatibility notes would be listed here once confirmed.",
  },
  {
    id: "example-screenshot-helper",
    name: "Screenshot Helper",
    category: "misc",
    kind: "module",
    description: "Example entry: small utilities around taking screenshots.",
    availability: "planned",
  },
  {
    id: "example-fps-counter",
    name: "FPS Counter",
    category: "hud",
    kind: "module",
    description: "Example entry: compact frame rate readout.",
    availability: "illustrative",
    settings: [
      { id: "label", type: "text", label: "Label", defaultValue: "fps", placeholder: "fps" },
      { id: "color", type: "color", label: "Text color", defaultValue: "#f4f2fa" },
      { id: "position", type: "select", label: "Position", defaultValue: "top left", options: ["top left", "top right", "bottom left", "bottom right"] },
    ],
  },
  {
    id: "example-hud-editor",
    name: "HUD Layout",
    category: "hud",
    kind: "module",
    description: "Example entry: arranges HUD elements on screen.",
    availability: "planned",
  },
  {
    id: "example-interface-scale",
    name: "Interface",
    category: "settings",
    kind: "preference",
    description: "Example preference group: general interface options.",
    longDescription:
      "Preferences are general client options rather than toggleable modules. This entry demonstrates the grouped settings model.",
    availability: "illustrative",
    settings: [
      { id: "accent", type: "color", group: "appearance", label: "Accent color", defaultValue: "#8b5cf6" },
      { id: "scale", type: "number", group: "appearance", label: "Interface scale", defaultValue: 100, min: 50, max: 150, step: 5, unit: "%" },
      { id: "menuKey", type: "keybind", group: "controls", label: "Open menu", defaultValue: "Right Shift" },
      { id: "profile", type: "text", group: "controls", label: "Profile name", defaultValue: "default", placeholder: "profile name" },
      { id: "animations", type: "boolean", group: "controls", label: "Menu animations", defaultValue: true },
    ],
  },
];
