# Master Gráfica Cartaz — como rodar o site

O site é um projeto React (TanStack Start + Tailwind CSS v4). As imagens do logo,
do banner e dos cartazes estão dentro de `src/assets/img/`, então o pacote funciona
sozinho, sem depender de nenhum serviço externo.

## Rodar no computador

1. Instale o Node.js (https://nodejs.org).
2. Descompacte este arquivo e entre na pasta `MasterGraficaCartaz`.
3. No terminal, dentro da pasta:

```sh
npm install
npm run dev
```

4. Abra o endereço que aparecer (normalmente http://localhost:8080).

## Gerar a versão final para publicar

```sh
npm run build
```

O resultado fica na pasta `dist`.

## Onde fica cada coisa

- `src/routes/index.tsx` — a página inteira (catálogo, filtros, tamanhos, dúvidas, contatos).
- `src/styles.css` — as cores do site e as fontes.
- `src/assets/img/` — logo, banner e fotos dos cartazes.
- `public/favicon.png` — o ícone da aba do navegador.
