import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const src = fileURLToPath(new URL("../src", import.meta.url));

// Na Lovable, importar uma imagem devolve um objeto { url }. Aqui fazemos igual,
// para o código do site funcionar sem mudanças.
const lovableAssets = {
  name: "lovable-asset-objects",
  enforce: "post",
  transform(code, id) {
    if (/\.(png|jpe?g|webp|svg)$/.test(id) && code.startsWith("export default ")) {
      return code.replace(/^export default (.*?);?\s*$/s, "export default { url: $1 };");
    }
  },
};

export default defineConfig({
  base: "./",
  publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  resolve: { alias: { "@": src }, dedupe: ["react", "react-dom"] },
  plugins: [react(), tailwindcss(), lovableAssets],
  build: { outDir: "dist", emptyOutDir: true },
});
