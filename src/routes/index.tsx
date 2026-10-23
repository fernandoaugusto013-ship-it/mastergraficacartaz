import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import A_H8 from "@/assets/img/cartaz-hortifrutti-h8.png";
import A_C8 from "@/assets/img/cartaz-carne-c8.png";
import A_H32 from "@/assets/img/cartaz-hortifrutti-h32.png";
import A_C32 from "@/assets/img/cartaz-carne-c32.png";
import logoImg from "@/assets/img/master-logo.png";
import logoLightImg from "@/assets/img/master-logo-light.png";
import bannerImg from "@/assets/img/master-banner.jpg";
import bfImg from "@/assets/img/black-friday.png";
import { ThemeToggle } from "@/components/theme-toggle";
import { MapPin, Phone, Truck } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Master Gráfica Cartaz — Cartazes de oferta para supermercado" },
      { name: "description", content: "21 modelos de cartaz oferta, splash, hortifrutti, carne e Black Friday, em pacotes com 50 unidades. Compre com segurança pelo Mercado Livre." },
      { property: "og:title", content: "Master Gráfica Cartaz — Cartazes de oferta para supermercado" },
      { property: "og:description", content: "Cartazes de oferta, splash e etiquetas para supermercados. Compre pelo Mercado Livre." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const ML = "https://www.mercadolivre.com.br/pagina/adnhntgs";
const WA = "https://wa.me/5581999487101";
const IG = "https://www.instagram.com/masterofertacartaz/";
const WA_RMR = `${WA}?text=${encodeURIComponent("Olá! Sou da Região Metropolitana do Recife e quero fazer um pedido de cartazes.")}`;
const WA_PE = `${WA}?text=${encodeURIComponent("Olá! Sou do interior de Pernambuco e quero saber sobre a entrega dos cartazes.")}`;
const RMR = ["Recife", "Jaboatão dos Guararapes", "Olinda", "Paulista", "Cabo de Santo Agostinho", "Camaragibe", "São Lourenço da Mata", "Abreu e Lima", "Igarassu", "Ipojuca", "Moreno", "Itapissuma", "Ilha de Itamaracá", "Araçoiaba"];

const CATS = [
  { id: "todos", label: "Todos" },
  { id: "oferta", label: "Cartaz Oferta" },
  { id: "splash", label: "Splash Oferta" },
  { id: "horti", label: "Hortifrutti" },
  { id: "carne", label: "Carne" },
  { id: "black", label: "Black Friday" },
  { id: "mini", label: "Mini e etiqueta" },
];

type P = { code: string; name: string; kind: "liso" | "folha" | "mini" | "splash" | "img" | "bf"; w?: number; h?: number; size: string; cat: string; img?: string; portrait?: boolean };
const ALL: P[] = [
  { code: "F1", name: "Cartaz Amarelo Liso", kind: "liso", w: 62, h: 92, size: "92 × 62 cm", cat: "oferta" },
  { code: "F1", name: "Cartaz Oferta Gigante", kind: "folha", w: 62, h: 92, size: "92 × 62 cm", cat: "oferta" },
  { code: "F2", name: "Cartaz Oferta Grande", kind: "folha", w: 44, h: 65, size: "65 × 44 cm", cat: "oferta" },
  { code: "F4", name: "Cartaz Oferta Médio", kind: "folha", w: 31, h: 44, size: "44 × 31 cm", cat: "oferta" },
  { code: "F8", name: "Cartaz Oferta", kind: "folha", w: 23, h: 33, size: "33 × 23 cm", cat: "oferta" },
  { code: "F16", name: "Cartaz Oferta Pequeno", kind: "folha", w: 14.5, h: 22, size: "22 × 14,5 cm", cat: "oferta" },
  { code: "F32", name: "Cartaz Oferta Prateleira", kind: "folha", w: 10, h: 14.5, size: "14,5 × 10 cm", cat: "oferta" },
  { code: "S8", name: "Splash Oferta Grande", kind: "splash", size: "33 × 23 cm", cat: "splash" },
  { code: "S16", name: "Splash Oferta Médio", kind: "splash", size: "22 × 14,5 cm", cat: "splash" },
  { code: "S32", name: "Splash Oferta Pequeno", kind: "splash", size: "16,5 × 12 cm", cat: "splash" },
  { code: "H8", name: "Cartaz Hoje é Dia de Hortifrutti", kind: "img", img: A_H8.url, portrait: true, size: "33 × 23 cm", cat: "horti" },
  { code: "H32", name: "Splash Hoje é Dia de Hortifrutti", kind: "img", img: A_H32.url, size: "16,5 × 12 cm", cat: "horti" },
  { code: "C8", name: "Cartaz Hoje é Dia de Carne", kind: "img", img: A_C8.url, portrait: true, size: "33 × 23 cm", cat: "carne" },
  { code: "C32", name: "Splash Hoje é Dia de Carne", kind: "img", img: A_C32.url, size: "16,5 × 12 cm", cat: "carne" },
  { code: "B1", name: "Cartaz Black Friday Gigante", kind: "bf", w: 62, h: 92, size: "92 × 62 cm", cat: "black" },
  { code: "B2", name: "Cartaz Black Friday Grande", kind: "bf", w: 44, h: 65, size: "65 × 44 cm", cat: "black" },
  { code: "B4", name: "Cartaz Black Friday Médio", kind: "bf", w: 31, h: 44, size: "44 × 31 cm", cat: "black" },
  { code: "B16", name: "Cartaz Black Friday Pequeno", kind: "bf", w: 14.5, h: 22, size: "22 × 14,5 cm", cat: "black" },
  { code: "B32", name: "Cartaz Black Friday Prateleira", kind: "bf", w: 10, h: 14.5, size: "14,5 × 10 cm", cat: "black" },
  { code: "9×5", name: "Mini Cartaz Oferta 9×5", kind: "mini", w: 9, h: 5, size: "9 × 5 cm", cat: "mini" },
  { code: "R5", name: "Mini Cartaz Oferta R5", kind: "mini", w: 9, h: 3, size: "9 × 3 cm", cat: "mini" },
];

const GUIDE: [string, number, number, string][] = [["F1", 62, 92, "92 × 62"], ["F2", 44, 65, "65 × 44"], ["F4", 31, 44, "44 × 31"], ["F8", 23, 33, "33 × 23"], ["F16", 14.5, 22, "22 × 14,5"], ["F32", 10, 14.5, "14,5 × 10"], ["9×5", 9, 5, "9 × 5"], ["R5", 9, 3, "9 × 3"]];

const FAQ = [
  { q: "Onde eu compro os cartazes e vejo os preços?", a: "Na nossa loja no Mercado Livre. Cada modelo do catálogo tem um botão que leva direto ao anúncio, com preço, frete e formas de pagamento." },
  { q: "Quantas unidades vêm em cada pacote?", a: "Todos os modelos são vendidos em pacotes com 50 unidades." },
  { q: "O que significam os códigos F1, F2, F4…?", a: "O número indica a fração da folha F1 (92 × 62 cm). O F2 tem metade do tamanho, o F4 um quarto, o F8 um oitavo, até o F32. As letras indicam a linha: F para cartaz oferta, S para splash, H para hortifrutti, C para carne e B para Black Friday." },
  { q: "Vocês entregam na minha cidade?", a: "Na Região Metropolitana do Recife a entrega é grátis: faça o pedido pelo WhatsApp. No restante de Pernambuco, chame no WhatsApp para combinar a entrega. Nos outros estados do Brasil, a compra é feita pelo Mercado Livre e a entrega é feita pelo próprio Mercado Livre." },
  { q: "Posso comprar vários modelos ou uma quantidade maior?", a: "Sim. Para montar um pedido com vários modelos ou mais pacotes, fale com a gente pelo WhatsApp (81) 99948-7101." },
];

const DIFS = [
  { t: "Cores que chamam atenção", d: "Amarelo vivo com faixa vermelha e área livre ampla para o preço, visível de longe no corredor." },
  { t: "Do grande à etiqueta", d: "21 modelos, de 92 × 62 cm ao mini de 9 × 3 cm, para fachada, gôndola, ilha, prateleira e balcão." },
  { t: "Compra segura", d: "Pagamento, entrega e garantia pelo Mercado Livre, com as formas de pagamento que você já usa." },
  { t: "Atendimento direto", d: "Dúvida sobre tamanho ou modelo? Fale com a equipe pelo WhatsApp antes de comprar." },
];

const STEPS = [
  { t: "Escolha o modelo", d: "Filtre pela linha e use o guia de tamanhos para escolher o cartaz certo para cada ponto da loja." },
  { t: "Faça o pedido", d: "Na Região Metropolitana do Recife, peça pelo WhatsApp com entrega grátis. Nos outros estados, o botão leva ao anúncio no Mercado Livre, onde você vê o preço e paga com Pix, cartão ou boleto." },
  { t: "Receba e use na loja", d: "Receba na sua loja e é só escrever o produto e o preço e expor. Fora de Pernambuco, acompanhe a entrega pelo Mercado Livre." },
];

const STAR = "100.0,16.0 116.5,33.1 141.7,21.9 146.1,41.6 175.1,38.6 166.7,56.9 193.6,62.6 174.0,76.0 193.6,89.4 166.7,95.1 175.1,113.4 146.1,110.4 141.7,130.1 116.5,118.9 100.0,136.0 83.5,118.9 58.3,130.1 53.9,110.4 24.9,113.4 33.3,95.1 6.4,89.4 26.0,76.0 6.4,62.6 33.3,56.9 24.9,38.6 53.9,41.6 58.3,21.9 83.5,33.1";

/* Ícones do WhatsApp e do Instagram: desenhos do conjunto Simple Icons (simpleicons.org, licença CC0) */
function WhatsIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function InstaIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={`shrink-0 ${className}`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077" />
    </svg>
  );
}
function Arrow() {
  return (
    <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function Splash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className}>
      <polygon points={STAR} className="fill-poster-yellow stroke-poster-red" strokeWidth="4" strokeLinejoin="round" />
      <ellipse cx="100" cy="22" rx="40" ry="15" className="fill-poster-red stroke-poster-yellow" strokeWidth="3" />
      <text x="100" y="27.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="15" className="fill-white">OFERTA</text>
    </svg>
  );
}

function Folha({ w, h, head, className }: { w: number; h: number; head: boolean; className?: string }) {
  const H = Math.round((1000 * h) / w) / 10;
  const land = w > h;
  const b1 = land ? H * 0.36 : H * 0.17;
  const b2 = land ? H * 0.52 : H * 0.26;
  const fs = land ? Math.min(15, Math.round(b1 * 8.5) / 10) : 18;
  return (
    <svg viewBox={`0 0 100 ${H}`} className={className}>
      <rect width="100" height={H} className="fill-poster-yellow" />
      {head && (
        <>
          <polygon points={`0,0 100,0 100,${b1.toFixed(1)} 50,${b2.toFixed(1)} 0,${b1.toFixed(1)}`} className="fill-poster-red" />
          <text x="50" y={(b1 * (land ? 0.78 : 0.76)).toFixed(1)} textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize={fs} className="fill-white">OFERTA</text>
        </>
      )}
    </svg>
  );
}

function Bf({ w, h, className }: { w: number; h: number; className?: string }) {
  const H = Math.round((1000 * h) / w) / 10;
  const pts: string[] = [];
  for (let i = 0; i < 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    // bloco quase quadrado (superelipse) com bordas de rabisco desfiadas
    const p = 4;
    const square = Math.pow(Math.pow(Math.abs(Math.cos(a)), p) + Math.pow(Math.abs(Math.sin(a)), p), -1 / p) / 1.12;
    const scribble = 0.1 * Math.sin(23 * a + 1.1) + 0.07 * Math.sin(41 * a + 4.7);
    const feather = Math.max(0, Math.sin(11 * a - 0.6) - 0.88) * 0.9;
    const r = Math.max(0.72, square * (1 + scribble) + feather);
    pts.push(`${(50 + 36 * r * Math.cos(a)).toFixed(1)},${((0.6 + 0.32 * r * Math.sin(a)) * H).toFixed(1)}`);
  }
  return (
    <svg viewBox={`0 0 100 ${H}`} className={className} aria-hidden="true">
      <rect width="100" height={H} className="fill-poster-yellow" />
      <polygon points={pts.join(" ")} className="fill-poster-black" />
      <text x="50" y={(H * 0.115).toFixed(1)} textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="15" letterSpacing="1.5" className="fill-poster-black stroke-white" strokeWidth="1.6" paintOrder="stroke" strokeLinejoin="round">BLACK</text>
      <text x="50" y={(H * 0.225).toFixed(1)} textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="15" letterSpacing="1.5" className="fill-poster-black stroke-white" strokeWidth="1.6" paintOrder="stroke" strokeLinejoin="round">FRIDAY</text>
      <g transform={`translate(90 ${(H * 0.055).toFixed(1)}) rotate(14)`}>
        <rect x="-9" y="-5.5" width="19" height="11" rx="2.5" className="fill-poster-black" />
        <text x="0.5" y="3.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="800" fontSize="8.5" className="fill-poster-yellow">%</text>
      </g>
    </svg>
  );
}

function Preview({ p }: { p: P }) {
  if (p.kind === "bf") return <img src={bfImg.url} alt={p.name} loading="lazy" className="poster-shadow h-48 w-auto object-contain" />;
  if (p.kind === "splash") return <Splash className="poster-shadow w-48" />;
  if (p.kind === "img") return <img src={p.img} alt={`${p.name} ${p.size}`} loading="lazy" className={`poster-shadow ${p.portrait ? "h-48 w-auto" : "w-48"}`} />;
  const land = p.w! > p.h!;
  return <Folha w={p.w!} h={p.h!} head={p.kind !== "liso"} className={`poster-shadow ${land ? "w-48" : "h-48 w-auto"}`} />;
}

function Logo({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <a href="#inicio" className="inline-block">
      <img src={logoImg.url} alt="Master Gráfica Cartaz" className={`${className} dark:hidden`} />
      <img src={logoLightImg.url} alt="Master Gráfica Cartaz" className={`${className} hidden dark:block`} />
    </a>
  );
}

const btnPrimary = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition hover:opacity-90";
const btnAccent = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-semibold text-accent-foreground transition hover:brightness-95";
const btnGhost = "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-[15px] font-semibold text-foreground transition hover:border-foreground/30";

function SectionHead({ eyebrow, title, text, id }: { eyebrow: string; title: string; text?: string; id?: string }) {
  return (
    <div data-reveal className="max-w-2xl">
      <span className="eyebrow">{eyebrow}</span>
      <h2 id={id} className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{text}</p>}
    </div>
  );
}

/** índice usado para as animações em sequência */
const idx = (i: number) => ({ "--i": i }) as CSSProperties;
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Cartaz de exemplo que fica pendurado e balançando no banner */
function HangingPoster() {
  return (
    <svg viewBox="0 0 100 143.5" className="w-36 poster-shadow 2xl:w-40">
      <rect width="100" height="143.5" className="fill-poster-yellow" />
      <polygon points="0,0 100,0 100,24 50,37 0,24" className="fill-poster-red" />
      <text x="50" y="18.5" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="18" className="fill-white">OFERTA</text>
      <text x="50" y="66" textAnchor="middle" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="800" fontSize="19" className="fill-poster-black">ARROZ</text>
      <text x="50" y="80" textAnchor="middle" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="700" fontSize="11" className="fill-poster-black">5 kg</text>
      <text x="8" y="106" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="800" fontSize="10" className="fill-poster-red">R$</text>
      <text x="24" y="120" textLength="68" lengthAdjust="spacingAndGlyphs" fontFamily="'Barlow Condensed', Arial, sans-serif" fontWeight="800" fontSize="34" className="fill-poster-red">19,98</text>
    </svg>
  );
}

/** Faz cada bloco (data-reveal) e cada item de lista (filhos de data-stagger) aparecer ao rolar a tela */
function useScrollReveal() {
  useEffect(() => {
    const show = (el: Element, d = 0) => {
      (el as HTMLElement).style.setProperty("--d", `${d}ms`);
      el.classList.add("is-in");
    };
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal], [data-stagger] > *").forEach((el) => el.classList.add("is-in"));
      return;
    }
    const blocks = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); blocks.unobserve(e.target); }
      }),
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );
    // itens que entram juntos na tela aparecem em sequência (70 ms entre cada um)
    const items = new IntersectionObserver(
      (entries) => {
        let n = 0;
        entries.forEach((e) => {
          if (e.isIntersecting) { show(e.target, Math.min(n++, 8) * 70); items.unobserve(e.target); }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => blocks.observe(el));
    const lists = document.querySelectorAll("[data-stagger]");
    lists.forEach((list) => Array.from(list.children).forEach((c) => items.observe(c)));
    // cards novos (ao trocar o filtro do catálogo) também animam
    const mo = new MutationObserver((muts) => muts.forEach((m) => m.addedNodes.forEach((node) => {
      if (node instanceof Element && !node.classList.contains("is-in")) items.observe(node);
    })));
    lists.forEach((list) => mo.observe(list, { childList: true }));
    return () => { blocks.disconnect(); items.disconnect(); mo.disconnect(); };
  }, []);
}

/** Foto do banner se move mais devagar que a página (efeito de profundidade) */
function useParallax(ref: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = el.parentElement?.offsetHeight ?? window.innerHeight;
      const y = Math.min(window.scrollY * 0.18, h * 0.1);
      el.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf && window.scrollY < window.innerHeight * 1.5) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
}

function HomePage() {
  const [cat, setCat] = useState("todos");
  const [open, setOpen] = useState(0);
  const labelOf = Object.fromEntries(CATS.map((c) => [c.id, c.label]));
  const products = ALL.filter((p) => cat === "todos" || p.cat === cat);
  const bannerRef = useRef<HTMLDivElement>(null);
  useScrollReveal();
  useParallax(bannerRef);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* Topo */}
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
          <Logo />
          <nav aria-label="Menu principal" className="flex items-center gap-3 sm:gap-7">
            <div className="hidden items-center gap-7 text-sm font-medium text-muted-foreground lg:flex">
              <a href="#produtos" className="transition hover:text-foreground">Modelos</a>
              <a href="#entrega" className="transition hover:text-foreground">Entrega</a>
              <a href="#tamanhos" className="transition hover:text-foreground">Tamanhos</a>
              <a href="#como-comprar" className="transition hover:text-foreground">Como comprar</a>
              <a href="#sobre" className="transition hover:text-foreground">Sobre</a>
              <a href="#duvidas" className="transition hover:text-foreground">Dúvidas</a>

            </div>
            <ThemeToggle />
            <a href={WA} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground">
              <WhatsIcon /> WhatsApp
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative isolate overflow-hidden">
        {/* Banner em segundo plano, com zoom lento */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div ref={bannerRef} className="absolute inset-x-0 -top-[10%] h-[120%] will-change-transform">
            <img
              src={bannerImg.url}
              alt="Cartazes de oferta Master expostos nas gôndolas de um supermercado"
              className="hero-photo h-full w-full object-cover object-center"
            />
            {/* brilho passando pela foto */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="hero-glare absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ transform: "translate3d(-120%,0,0)" }} />
            </div>
          </div>
          {/* véu claro sobre a foto (banner transparente) */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Cartazes animados sobre o banner (telas grandes) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
          <div className="hero-hang absolute right-[3%] top-0">
            <div className="hero-swing flex flex-col items-center">
              <span className="h-14 w-px bg-foreground/50" />
              <span className="-mt-0.5 mb-[-6px] size-2.5 rounded-full border-2 border-foreground/60 bg-background" />
              <HangingPoster />
            </div>
          </div>
          <div className="hero-splash absolute bottom-[14%] right-[230px]">
            <div className="hero-float">
              <Splash className="hero-pop poster-shadow w-44 2xl:w-52" />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-28">
          <div className="max-w-3xl">
            <span style={delay(100)} className="hero-in inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-muted-foreground backdrop-blur-sm">
              <span className="size-1.5 rounded-full bg-accent" /> NOVOS VENTOS PARA O SEU NEGÓCIO
            </span>
            <h1 style={delay(250)} className="hero-in mt-6 font-display text-5xl font-extrabold leading-[0.95] tracking-tight md:text-7xl">
              Cartazes de oferta prontos para a sua loja{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10 dark:text-accent">vender mais</span>
                <span aria-hidden="true" className="hero-mark absolute inset-x-0 bottom-1 z-0 h-3 rounded-sm bg-accent md:h-4 dark:bottom-0 dark:h-1.5 dark:md:h-2" />
              </span>
              .
            </h1>
            <p style={delay(450)} className="hero-in mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              21 modelos de cartaz oferta, splash, hortifrutti, carne e Black Friday, do grande 92 × 62 cm ao mini de 9 × 3 cm. Escolha aqui e compre com segurança pelo Mercado Livre.
            </p>
            <div style={delay(600)} className="hero-in mt-8 flex flex-wrap gap-3">
              <a href="#produtos" className={btnPrimary}>Ver os modelos <Arrow /></a>
              <a href={WA} className={btnGhost}><WhatsIcon /> Tirar dúvida no WhatsApp</a>
            </div>
            <ul style={delay(750)} className="hero-in mt-10 grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-3">
              {["Entrega grátis na Região Metropolitana do Recife", "Pacotes com 50 unidades", "Compra protegida no Mercado Livre"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <svg aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Faixa Mercado Livre */}
      <section aria-label="Onde comprar" className="mx-auto max-w-6xl px-6">
        <div data-reveal="zoom" className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-card p-6 shadow-[var(--shadow-soft)] md:flex-row md:items-center md:px-8">
          <p className="text-[15px]">
            Todos os modelos estão à venda na nossa loja no <strong>Mercado Livre</strong>. <span className="text-muted-foreground">Os preços aparecem direto no anúncio.</span>
          </p>
          <a href={ML} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold underline decoration-accent decoration-2 underline-offset-4">
            Visitar a loja no Mercado Livre
            <svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8" /></svg>
          </a>
        </div>
      </section>

      {/* Entrega */}
      <section id="entrega" aria-labelledby="entrega-titulo" className="mx-auto max-w-6xl scroll-mt-20 px-6 pt-24">
        <SectionHead id="entrega-titulo" eyebrow="Entrega" title="Como o seu pedido chega até você" text="A forma de pedir e de receber depende de onde fica a sua loja." />
        <div data-stagger className="mt-10 grid gap-5 lg:grid-cols-3">
          {/* Região Metropolitana do Recife */}
          <article className="flex flex-col rounded-2xl bg-accent p-7 text-accent-foreground shadow-[var(--shadow-soft)]">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em]"><MapPin className="size-4" strokeWidth={2.4} /> Região Metropolitana do Recife</span>
            <h3 className="mt-4 font-display text-4xl font-extrabold leading-none">Entrega grátis</h3>
            <p className="mt-3 leading-relaxed">Faça o pedido pelo WhatsApp e levamos os cartazes até a sua loja, sem custo de entrega.</p>
            <p className="mt-4 text-sm leading-relaxed opacity-85"><strong>Cidades atendidas:</strong> {RMR.join(", ")}.</p>
            <div className="mt-auto pt-7"><a href={WA_RMR} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[15px] font-semibold text-primary-foreground transition hover:opacity-90"><WhatsIcon /> Pedir pelo WhatsApp</a></div>
          </article>

          {/* Restante de Pernambuco */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-7">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"><Phone className="size-4" strokeWidth={2.4} /> Restante de Pernambuco</span>
            <h3 className="mt-4 font-display text-4xl font-extrabold leading-none">Fale com a gente</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">Para cidades do interior do estado, entre em contato pelo WhatsApp para saber como fica a entrega.</p>
            <div className="mt-auto pt-7"><a href={WA_PE} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-[15px] font-semibold text-foreground transition hover:border-foreground/30"><WhatsIcon /> Consultar entrega</a></div>
          </article>

          {/* Outros estados */}
          <article className="flex flex-col rounded-2xl border border-border bg-card p-7">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground"><Truck className="size-4" strokeWidth={2.4} /> Outros estados do Brasil</span>
            <h3 className="mt-4 font-display text-4xl font-extrabold leading-none">Pelo Mercado Livre</h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">A compra é feita pelo Mercado Livre, e a entrega também é feita pelo Mercado Livre. O prazo e o frete aparecem no anúncio antes de finalizar.</p>
            <div className="mt-auto pt-7"><a href={ML} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-[15px] font-semibold text-foreground transition hover:border-foreground/30">Comprar no Mercado Livre <Arrow /></a></div>
          </article>
        </div>
        <p data-reveal className="mt-5 text-sm text-muted-foreground">Não sabe se o seu endereço está na Região Metropolitana do Recife? <a href={WA} className="font-semibold text-foreground underline decoration-accent decoration-2 underline-offset-4">Pergunte pelo WhatsApp</a>.</p>
      </section>

      {/* Catálogo */}
      <section id="produtos" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <SectionHead eyebrow="Catálogo" title="Todos os modelos Master" text="Filtre pela linha, confira o tamanho e veja o preço no anúncio do Mercado Livre. Todos os modelos são vendidos em pacotes com 50 unidades." />

        <div data-reveal style={delay(120)} role="group" aria-label="Filtrar por linha" className="mt-10 flex flex-wrap gap-2">
          {CATS.map((c) => {
            const on = c.id === cat;
            const count = c.id === "todos" ? ALL.length : ALL.filter((p) => p.cat === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setCat(c.id)}
                className={`min-h-10 rounded-full px-4 text-sm font-semibold transition ${on ? "bg-primary text-primary-foreground" : "border border-border bg-card text-foreground hover:border-foreground/30"}`}
              >
                {c.label} <span className="opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div data-stagger className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p, i) => (
            <article key={p.code + p.name + i} style={idx(i)} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition hover:shadow-[var(--shadow-soft)]">
              <div className="relative flex h-60 items-center justify-center bg-secondary">
                <span className="absolute left-3 top-3 rounded-md bg-card px-2 py-1 font-display text-sm font-bold">{p.code}</span>
                <div className="transition duration-300 group-hover:-translate-y-1">
                  <Preview p={p} />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="eyebrow">{labelOf[p.cat]}</span>
                <h3 className="mt-1.5 font-display text-xl font-bold leading-tight">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground"><strong className="text-foreground">{p.size}</strong> · pacote com 50 un.</p>
                <div className="mt-auto flex flex-col gap-1 pt-5">
                  {p.cat === "black" ? (
                    <span aria-disabled="true" className="inline-flex min-h-11 items-center justify-center rounded-full bg-secondary px-4 text-sm font-semibold text-muted-foreground">Produto Indisponível</span>
                  ) : (
                    <a href={ML} className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-4 text-sm font-semibold text-accent-foreground transition hover:brightness-95">Ver preço no Mercado Livre</a>
                  )}
                  <a href={ML} className="inline-flex min-h-10 items-center justify-center text-sm font-medium text-muted-foreground transition hover:text-foreground">Ver detalhes do modelo</a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div data-reveal className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-border p-6 md:flex-row md:items-center">
          <p className="text-[15px]"><strong>Precisa de mais de um pacote ou de vários modelos?</strong> <span className="text-muted-foreground">Fale com a gente e monte o pedido da sua loja.</span></p>
          <a href={WA} className={btnPrimary}><WhatsIcon /> Falar no WhatsApp</a>
        </div>
      </section>

      {/* Guia de tamanhos */}
      <section id="tamanhos" className="scroll-mt-20 border-y border-border bg-card py-24">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHead eyebrow="Guia de tamanhos" title="Compare os cartazes lado a lado" text="Desenhados na mesma escala. O número do código indica a fração da folha F1: o F2 tem metade do tamanho, o F4 um quarto, e assim por diante." />
          <div className="mt-12 overflow-x-auto pb-2">
            <div data-stagger className="flex min-w-max items-end gap-8">
              {GUIDE.map(([code, w, h, size], gi) => {
                const W = Math.round(w * 2.6), Hh = Math.round(h * 2.6);
                return (
                  <div key={code} style={idx(gi)} className="flex flex-col items-center gap-3">
                    <div aria-hidden="true" className="grow-bar overflow-hidden rounded-[2px] bg-poster-yellow shadow-[var(--shadow-soft)]" style={{ width: W, height: Hh }}>
                      <div className="bg-poster-red" style={{ height: Math.max(3, Math.round(Hh * (w > h ? 0.4 : 0.2))) }} />
                    </div>
                    <span className="text-center leading-tight">
                      <strong className="block font-display text-lg">{code}</strong>
                      <span className="text-xs text-muted-foreground">{size} cm</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <p data-reveal className="mt-8 text-sm text-muted-foreground">Splash e temáticos: S8, H8 e C8 têm 33 × 23 cm · S16 tem 22 × 14,5 cm · S32, H32 e C32 têm 16,5 × 12 cm. Black Friday: B1, B2, B4, B16 e B32 seguem os tamanhos dos cartazes F1, F2, F4, F16 e F32.</p>
        </div>
      </section>

      {/* Como comprar + Diferenciais */}
      <section id="como-comprar" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <SectionHead eyebrow="Como comprar" title="Do site para a sua loja em 3 passos" />
        <ol data-stagger className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.t} style={idx(i * 2)} className="border-t-2 border-foreground pt-5">
              <span className="font-display text-sm font-bold text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-bold">{s.t}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>

        <div className="mt-24" aria-labelledby="dif-titulo">
          <SectionHead id="dif-titulo" eyebrow="Por que a Master" title="Cartaz feito para quem vive o dia a dia do mercado" />
          <div data-stagger className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {DIFS.map((d, i) => (
              <div key={d.t} style={idx(i)} className="bg-card p-7">
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary font-display font-bold">{i + 1}</span>
                <h3 className="mt-5 font-display text-xl font-bold">{d.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sobre nós */}
      <section id="sobre" className="scroll-mt-20 overflow-x-clip border-y border-border bg-card py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <div data-reveal="left">
            <span className="eyebrow">Sobre nós</span>
            <h2 id="sobre-titulo" className="mt-3 font-display text-4xl font-bold leading-[1.02] tracking-tight md:text-5xl">Sobre a Master Gráfica Cartaz</h2>
            <dl className="mt-10 space-y-5 border-t border-border pt-6 text-sm">
              <div>
                <dt className="eyebrow">CNPJ</dt>
                <dd className="mt-1 font-semibold text-foreground">20.598.807/0001-85</dd>
              </div>
              <div>
                <dt className="eyebrow">Instagram</dt>
                <dd className="mt-1">
                  <a href={IG} className="inline-flex items-center gap-1.5 font-semibold underline decoration-accent decoration-2 underline-offset-4"><InstaIcon /> @mastergraficacartaz</a>
                </dd>
              </div>
            </dl>
          </div>
          <div data-reveal="right" style={delay(150)} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p className="border-l-2 border-accent pl-5 font-display text-2xl font-semibold leading-snug text-foreground">
              Com mais de 12 anos de experiência no mercado, a Master Gráfica Cartaz consolidou-se como a principal parceira do varejo, sendo especialista na produção de cartazes para supermercados.
            </p>
            <p>Nossa trajetória é marcada pelo compromisso com a excelência, entregando exclusivamente impressão em alta qualidade. Sabemos que no setor supermercadista, a comunicação visual precisa ser nítida, atrativa e rápida para destacar as melhores ofertas e impulsionar as vendas do seu negócio.</p>
            <p>Para garantir o máximo de agilidade e otimizar o seu tempo, não operamos com balcão físico. Nosso atendimento é prático e trabalhamos apenas com entregas diretas. Você faz o seu pedido de onde estiver, e nós levamos o material pronto até o seu estabelecimento com segurança e pontualidade.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}

      <section id="duvidas" className="scroll-mt-20 border-t border-border py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1fr_1.6fr]">
          <SectionHead eyebrow="Dúvidas frequentes" title="Perguntas mais comuns" />
          <div data-stagger className="divide-y divide-border border-y border-border">
            {FAQ.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q} style={idx(i)}>
                  <button type="button" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold">
                    <span>{f.q}</span>
                    <span aria-hidden="true" className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-lg transition ${isOpen ? "rotate-45 bg-accent text-accent-foreground" : ""}`}>+</span>
                  </button>
                  {isOpen && <p className="animate-in fade-in slide-in-from-top-1 duration-300 pb-5 pr-12 leading-relaxed text-muted-foreground">{f.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section id="contato" className="mx-auto max-w-6xl px-6 pb-24">
        <div data-reveal="zoom" className="flex flex-col items-start justify-between gap-8 rounded-[2rem] bg-primary p-10 text-primary-foreground md:flex-row md:items-center md:p-14">
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold leading-tight md:text-5xl">Precisa de ajuda para escolher o cartaz?</h2>
            <p className="mt-4 text-lg opacity-80">Conte o tamanho da sua loja e os setores que quer sinalizar. A gente indica os modelos ideais.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href={WA} className={btnAccent}><WhatsIcon className="size-5" /> (81) 99948-7101</a>
            <a href={IG} className="inline-flex min-h-12 items-center justify-center rounded-full border border-primary-foreground/30 px-6 text-[15px] font-semibold transition hover:border-primary-foreground/60 gap-2 text-primary-foreground"><InstaIcon className="size-5" /> Ver o Instagram</a>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="border-t border-border">
        <div data-stagger className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div style={idx(0)}>
            <Logo className="h-20 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">Cartazes de oferta, splash e etiquetas para supermercados de pequeno e médio porte. Novos ventos para o seu negócio.</p>
          </div>
          <nav aria-label="Rodapé" style={idx(1)} className="flex flex-col gap-2.5 text-sm">
            <span className="eyebrow mb-1">Navegação</span>
            <a href="#produtos" className="text-muted-foreground hover:text-foreground">Modelos</a>
            <a href="#entrega" className="text-muted-foreground hover:text-foreground">Entrega</a>
            <a href="#tamanhos" className="text-muted-foreground hover:text-foreground">Guia de tamanhos</a>
            <a href="#como-comprar" className="text-muted-foreground hover:text-foreground">Como comprar</a>
            <a href="#sobre" className="text-muted-foreground hover:text-foreground">Sobre nós</a>
            <a href="#duvidas" className="text-muted-foreground hover:text-foreground">Dúvidas frequentes</a>

          </nav>
          <div style={idx(2)} className="flex flex-col gap-2.5 text-sm">
            <span className="eyebrow mb-1">Contato</span>
            <a href={WA} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"><WhatsIcon /> WhatsApp: (81) 99948-7101</a>
            <a href={IG} className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"><InstaIcon /> Instagram: @masterofertacartaz</a>
            <a href={ML} className="text-muted-foreground hover:text-foreground">Loja no Mercado Livre</a>
          </div>
        </div>
        <div className="border-t border-border">
          <p className="mx-auto max-w-6xl px-6 py-5 text-xs text-muted-foreground">© 2026 Master Gráfica Cartaz · CNPJ 20.598.807/0001-85</p>
        </div>
      </footer>

      <a href={WA} aria-label="Falar no WhatsApp" className="fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-whats text-primary-foreground shadow-[var(--shadow-poster)] transition hover:scale-105">
        <WhatsIcon className="size-6" />
      </a>
    </div>
  );
}
