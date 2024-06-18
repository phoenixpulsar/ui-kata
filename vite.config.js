import { defineConfig } from "vite";
import staticCopy from "vite-plugin-static-copy";

export default defineConfig({
  plugins: [
    staticCopy({
      targets: [
        {
          src: "src/assets/*",
          dest: "assets/",
        },
      ],
    }),
  ],
  base: "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
});
