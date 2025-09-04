import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import svgLoader from "vite-svg-loader";

export default defineConfig({
  plugins: [vue(), tailwindcss(), svgLoader(), Icons({ compiler: "vue3" })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
