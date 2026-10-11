// Central download configuration for the fractal client release.
//
// IMPORTANT: this is the CLIENT release (for example fractal-client.jar), not the
// website source archive. Never point downloadUrl at fractal-client-website.zip.
//
// To publish a release:
//   1. Set downloadUrl to an https:// link to the real client file, OR place the real
//      file in public/downloads/ and set localAssetPath to "/downloads/<file name>".
//   2. Set releaseStatus to "available".
//   3. Fill in the metadata fields you know. Leave unknown ones empty.

export type ReleaseStatus = "available" | "coming-soon" | "temporarily-unavailable";

export interface DownloadConfig {
  productName: string;
  /** External https URL of a real release artifact. */
  downloadUrl: string;
  /** Optional path to a real file served from /public, e.g. "/downloads/fractal-client.jar". */
  localAssetPath: string;
  versionLabel: string;
  releaseDate: string;
  fileFormat: string;
  fileSize: string;
  minecraftVersion: string;
  /** Optional SHA-256 checksum published by the project owner. */
  checksum: string;
  releaseNotesUrl: string;
  installGuideUrl: string;
  releaseStatus: ReleaseStatus;
}

const envUrl = (import.meta.env.VITE_CLIENT_DOWNLOAD_URL as string | undefined) ?? "";
const envStatus = (import.meta.env.VITE_RELEASE_STATUS as string | undefined) ?? "";

const STATUSES: ReleaseStatus[] = ["available", "coming-soon", "temporarily-unavailable"];

export const download: DownloadConfig = {
  productName: "fractal client",
  downloadUrl: envUrl,
  localAssetPath: "",
  versionLabel: "",
  releaseDate: "",
  fileFormat: "",
  fileSize: "",
  minecraftVersion: "",
  checksum: "",
  releaseNotesUrl: "",
  installGuideUrl: "",
  releaseStatus: STATUSES.includes(envStatus as ReleaseStatus)
    ? (envStatus as ReleaseStatus)
    : "coming-soon",
};

export type DownloadState = "available" | "coming-soon" | "temporarily-unavailable" | "unconfigured";

function isHttps(value: string): boolean {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

/** The destination the download button should use, or null when none is valid. */
export function getDownloadHref(config: DownloadConfig = download): string | null {
  const local = config.localAssetPath.trim();
  if (local.startsWith("/") && !local.startsWith("//") && !local.toLowerCase().endsWith(".zip")) {
    return local;
  }
  const external = config.downloadUrl.trim();
  if (external && isHttps(external)) return external;
  return null;
}

export function isLocalDownload(config: DownloadConfig = download): boolean {
  const local = config.localAssetPath.trim();
  return local !== "" && getDownloadHref(config) === local;
}

/**
 * A release counts as available only when the owner marked it available AND a valid
 * destination exists. A URL string alone never makes a release available.
 */
export function getDownloadState(config: DownloadConfig = download): DownloadState {
  const href = getDownloadHref(config);
  if (config.releaseStatus === "available") return href ? "available" : "unconfigured";
  return config.releaseStatus;
}

export const statusLabels: Record<DownloadState, string> = {
  available: "available",
  "coming-soon": "coming soon",
  "temporarily-unavailable": "temporarily unavailable",
  unconfigured: "download not configured",
};
