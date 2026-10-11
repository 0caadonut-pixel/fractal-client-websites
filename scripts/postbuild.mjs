// Cross-platform post-build step: copies index.html to 404.html so GitHub Pages
// serves the single-page app for deep links such as /modules.
import { copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = "dist";
if (existsSync(join(dist, "index.html"))) {
  copyFileSync(join(dist, "index.html"), join(dist, "404.html"));
  console.log("postbuild: created dist/404.html (SPA fallback)");
} else {
  console.error("postbuild: dist/index.html not found");
  process.exit(1);
}
