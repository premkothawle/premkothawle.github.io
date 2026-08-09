import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/
// so the base path must match the repository name exactly.
// If you deploy to a user/organization root site (username.github.io repo),
// set base back to "/".
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    outDir: "dist",
  },
});
