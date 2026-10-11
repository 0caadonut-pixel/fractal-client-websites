# Deployment

The site is fully static. Run `npm run build` and publish the contents of `dist/`.

Because the site uses client-side routing (`/modules`, `/download`, ...), the host must serve `index.html` for unknown paths. This project ships the needed files:

- `public/_redirects` (Netlify, Cloudflare Pages)
- `dist/404.html`, created automatically by `npm run build` (GitHub Pages)

## Netlify

- Build command: `npm run build`
- Publish directory: `dist`
- The `_redirects` file enables direct visits to every route.

## Cloudflare Pages

- Framework preset: Vite (or none)
- Build command: `npm run build`
- Build output directory: `dist`
- Direct route visits work through the included `_redirects` file.

## GitHub Pages

1. In `vite.config.ts`, set `base` to `"/<repository-name>/"` for a project site (leave `"/"` for a user/organization site or a custom domain).
2. Because React Router uses root-relative paths, a project site under a sub-path also needs `<BrowserRouter basename="/<repository-name>">` in `src/main.tsx`.
3. Run `npm run build` and publish the `dist/` folder (for example with a GitHub Actions Pages workflow).
4. `dist/404.html` lets direct visits to `/modules` and other routes load the app.

A custom domain or a user site avoids the sub-path steps.

## Other static hosts

Any host that serves static files works, provided unknown paths fall back to `index.html`.

## After deploying

Set `siteUrl` in `src/config/site.ts` (or `VITE_SITE_URL`) to the real address to enable canonical URLs. A sitemap is not included because no real domain was supplied.
