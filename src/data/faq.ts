import { download, getDownloadState } from "../config/download";
import { site } from "../config/site";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Answers reflect the configuration in src/config. Unknown facts are stated as unknown.
export function buildFaq(): FaqItem[] {
  const state = getDownloadState();
  const version = download.minecraftVersion;
  const hasChecksum = Boolean(download.checksum);
  return [
    {
      id: "what",
      question: "what is fractal client?",
      answer: `${site.name} is a Minecraft client. This website is its official home: it documents the project, its design goals and its module catalog.`,
    },
    {
      id: "where",
      question: "where can i download fractal client?",
      answer:
        state === "available"
          ? "Use the download page. The button there always points to the current official release."
          : "The download page is where releases will be published. A client download is not configured yet, so there is nothing to download right now.",
    },
    {
      id: "install",
      question: "how do i install the client?",
      answer:
        "Installation steps are on the download page. Exact requirements depend on the final client release, and they will be updated once the supported format and game version are confirmed.",
    },
    {
      id: "versions",
      question: "which minecraft versions are supported?",
      answer: version
        ? `The current release is listed for Minecraft ${version}.`
        : "The supported Minecraft version has not been confirmed yet, so none is listed.",
    },
    {
      id: "broken",
      question: "what should i do if the download does not work?",
      answer:
        "Try again after a minute, check your connection, and make sure a browser extension is not blocking the file. If it still fails, ask in the community server and include the page you used and any error shown.",
    },
    {
      id: "bugs",
      question: "where can i report a bug?",
      answer:
        "Report bugs through the official community server. Include your game version, what you expected, what happened, and steps to reproduce it.",
    },
    {
      id: "help",
      question: "where can i get help?",
      answer:
        "The community page links to the official server. Help is given by community members and is not guaranteed for every issue.",
    },
    {
      id: "available",
      question: "is the client currently available?",
      answer:
        state === "available"
          ? "Yes. A release is configured as available on the download page."
          : state === "temporarily-unavailable"
            ? "The client is temporarily unavailable. Check the community server for updates."
            : "Not yet. No client release has been published through this website.",
    },
    {
      id: "verify",
      question: "how do i verify that i downloaded the correct file?",
      answer: hasChecksum
        ? "Compare the SHA-256 checksum of your file with the one shown on the download page. They must match exactly."
        : "No checksum has been published yet. When one is available it will appear on the download page. Only download the client from links on this website or the official community server.",
    },
    {
      id: "notes",
      question: "where can i find release notes?",
      answer: download.releaseNotesUrl
        ? "A release notes link is shown on the download page."
        : "No release notes have been published yet.",
    },
  ];
}
