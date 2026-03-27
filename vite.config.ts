import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [vue(), tailwindcss(), svgLoader(), Icons({ compiler: "vue3" })],
  resolve: {
    alias: {
      "@": path.resolve(rootDir, "./src"),
    },
  },
});
