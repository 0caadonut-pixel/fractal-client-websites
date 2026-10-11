# fractal client website

The official website for **fractal client**, a Minecraft client. This is a static React + TypeScript + Vite project with a dark, purple-accented design.

> This repository is the **website source code**. It is not the Minecraft client. The client release (for example `fractal-client.jar`) is a separate file that you supply and configure (see "Configure the client download").

## Tech stack

React 18, TypeScript (strict), Vite 5, React Router 6, lucide-react icons, plain CSS with design tokens. No backend, database, analytics or tracking.

## Prerequisites

Install Node.js (LTS, version 18 or newer) from <https://nodejs.org/>. npm is included.

## Getting started on Windows

1. Download `fractal-client-website.zip`.
2. Right-click it and choose **Extract All**.
3. Open Visual Studio Code, choose **File > Open Folder**, and select the extracted `fractal-client-website` folder.
4. Open the integrated terminal (**Terminal > New Terminal**).

## Local development

```bash
npm install
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Open it in your browser.

## Production build

```bash
npm run build
```

The output is in the `dist/` folder. The build type-checks the project, bundles it, and creates `dist/404.html` as a single-page-app fallback for GitHub Pages.

## Preview the production build

```bash
npm run preview
```

## Pages

`/` home, `/modules`, `/features`, `/download`, `/faq`, `/community`, plus a custom 404 page.

## Configuration

Everything you are likely to change lives in a few files.

| What | Where |
| --- | --- |
| Brand text, tagline, navigation, Discord invite, GitHub/docs links | `src/config/site.ts` |
| Client download URL, status and release metadata | `src/config/download.ts` |
| Module catalog (categories, modules, settings) | `src/data/modules.ts` |
| Feature summaries | `src/data/features.ts` |
| FAQ answers | `src/data/faq.ts` |
| Page content | `src/pages/*.tsx` |
| Colors, spacing, fonts | CSS variables at the top of `src/styles/globals.css` |
| Logo and favicon | `public/favicon.svg`, `public/assets/logo-mark.svg`, `src/components/Logo.tsx` |

### Change the Discord invitation

Edit `communityUrl` in `src/config/site.ts`. Every community button and link reads this single value.

### Configure the client download

Open `src/config/download.ts`. A release is shown as available only when **both** are true: `releaseStatus` is `"available"` and a valid destination exists. A URL alone never makes the release available.

**Option A: externally hosted release.** Set `downloadUrl` to an `https://` link to the real client file and set `releaseStatus: "available"`.

**Option B: file hosted with the website.** Place the real client file in `public/downloads/` (create the folder), set `localAssetPath: "/downloads/fractal-client.jar"` and `releaseStatus: "available"`. The button then uses the browser's native download.

Then fill in whatever you know: `versionLabel`, `releaseDate`, `fileFormat`, `fileSize`, `minecraftVersion`, `checksum` (SHA-256), `releaseNotesUrl`, `installGuideUrl`. Empty fields display as "not yet provided".

Do **not** put the website source zip in the download button. Do not generate or rename a placeholder `.jar`. The configuration refuses local `.zip` paths.

You can also use environment variables instead (see `.env.example`): `VITE_CLIENT_DOWNLOAD_URL`, `VITE_RELEASE_STATUS`, `VITE_SITE_URL`. Values are public: never put secrets in them.

### Replace the module examples

The entries in `src/data/modules.ts` are **illustrative examples**, not confirmed fractal client modules. Replace them with real modules and set `availability: "verified"` for confirmed ones. The settings shown on the website are a demonstration only and never change the real client.

### Change the purple accent

Edit `--purple`, `--purple-2` and `--purple-3` in `src/styles/globals.css`.

### Replace images and the logo

Replace `public/favicon.svg` and `public/assets/logo-mark.svg`, and update the SVG in `src/components/Logo.tsx` to match. The hero illustration is `src/components/HeroMockup.tsx`. If you have a real screenshot, add it under `public/assets/` and use it there.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md).

## Notes

- No real domain is configured. Set `siteUrl` (or `VITE_SITE_URL`) once you have one to enable canonical URLs.
- Fonts use the system sans-serif stack, so no third-party font requests are made.
