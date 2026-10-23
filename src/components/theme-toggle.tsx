import { useEffect, useState, type MouseEvent } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "master-theme";

/** Script que roda antes da página aparecer, para não piscar o tema errado. */
export const themeInitScript = `(function(){var c=document.documentElement.classList;c.add('js');try{if(localStorage.getItem('${STORAGE_KEY}')==='dark')c.add('dark');}catch(e){}})();`;

type ViewTransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> };
};

/**
 * Seletor de tema: Sol = site claro, Lua = site escuro.
 * A escolha fica salva no navegador do visitante.
 */
export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function choose(next: boolean, e: MouseEvent<HTMLButtonElement>) {
    if (next === dark) return;
    const root = document.documentElement;
    const apply = () => {
      root.classList.toggle("dark", next);
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        /* navegação privada: só não salva a escolha */
      }
      setDark(next);
    };

    const doc = document as ViewTransitionDoc;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!doc.startViewTransition || reduce) {
      apply();
      return;
    }

    // Transição em círculo que se abre a partir do botão clicado
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2;
    const y = r.top + r.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const t = doc.startViewTransition(() => flushSync(apply));
    t.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  const btn =
    "relative z-10 flex size-9 items-center justify-center rounded-full transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

  return (
    <div role="group" aria-label="Tema do site" className="relative flex items-center rounded-full border border-border bg-secondary p-1">
      <span
        aria-hidden="true"
        className={`absolute left-1 top-1 size-9 rounded-full bg-card shadow-[var(--shadow-soft)] transition-transform duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${dark ? "translate-x-9" : "translate-x-0"}`}
      />
      <button
        type="button"
        aria-pressed={!dark}
        aria-label="Site claro"
        title="Site claro"
        onClick={(e) => choose(false, e)}
        className={`${btn} ${!dark ? "text-accent-foreground" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Sun className={`size-[18px] transition-transform duration-700 ${!dark ? "rotate-0 scale-100 text-[oklch(0.72_0.17_75)]" : "-rotate-90 scale-90"}`} strokeWidth={2.2} />
      </button>
      <button
        type="button"
        aria-pressed={dark}
        aria-label="Site escuro"
        title="Site escuro"
        onClick={(e) => choose(true, e)}
        className={`${btn} ${dark ? "text-accent" : "text-muted-foreground hover:text-foreground"}`}
      >
        <Moon className={`size-[18px] transition-transform duration-700 ${dark ? "rotate-0 scale-100" : "-rotate-12 scale-90"}`} strokeWidth={2.2} />
      </button>
    </div>
  );
}
