// Versão estática para o GitHub Pages.
// Renderiza a MESMA página do site (../src/routes/index.tsx), sem nenhuma alteração.
import "@/styles.css";
import { createRoot } from "react-dom/client";
import { createElement } from "react";
import { themeInitScript } from "@/components/theme-toggle";
import { Route } from "@/routes/index";

// Mesmo script que o __root.tsx coloca no <head>: aplica o tema salvo (Sol/Lua).
new Function(themeInitScript)();

const Page = Route.options.component as () => JSX.Element;
createRoot(document.getElementById("root")!).render(createElement(Page));
