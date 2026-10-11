import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set base to "/your-repo-name/" when deploying to a GitHub Pages project site.
export default defineConfig({
  base: "/",
  plugins: [react()],
});
