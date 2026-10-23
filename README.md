# Master Gráfica Cartaz — site

Site da Master Gráfica Cartaz: catálogo de cartazes de oferta para supermercados, com compra pelo Mercado Livre e pedidos pelo WhatsApp.

- Feito em React + Tailwind CSS (TanStack Start), conectado à [Lovable](https://lovable.dev).
- Modo claro (Sol) e escuro (Lua), banner animado e animações ao rolar a página.
- Publicação automática e gratuita no **GitHub Pages** a cada alteração.

## Onde fica cada coisa

| Pasta ou arquivo | O que é |
| --- | --- |
| `src/routes/index.tsx` | A página inteira: catálogo, entrega, tamanhos, dúvidas, contatos e links |
| `src/styles.css` | Cores do modo claro e escuro, fontes e animações |
| `src/components/theme-toggle.tsx` | Botão Sol/Lua |
| `src/assets/img/` | Logo, banner e imagens dos cartazes |
| `github-pages/` | Gera a versão do site publicada no GitHub Pages (usa o mesmo código de `src/`) |
| `.github/workflows/github-pages.yml` | Publica o site sozinho a cada alteração no branch `main` |
| `COMO-RODAR.md` | Como rodar o site no computador |

## Colocar no GitHub

Escolha **um** dos caminhos abaixo.

### Caminho 1 — Pela Lovable (recomendado)

Mantém a Lovable e o GitHub sincronizados: o que muda em um aparece no outro.

1. Crie uma conta em [github.com](https://github.com), se ainda não tiver.
2. Na Lovable, abra o projeto e clique em **GitHub → Connect to GitHub**. Autorize e escolha **Create repository**. A Lovable cria o repositório com o código atual.
3. No repositório criado, envie as mudanças que ainda não estão na Lovable (veja "Enviar arquivos pelo site do GitHub", abaixo).
4. Em poucos segundos, as mudanças aparecem também na Lovable.

### Caminho 2 — Repositório novo, sem a Lovable

1. No GitHub, clique em **New repository**, dê um nome (ex.: `master-grafica-cartaz`) e crie **sem** README.
2. Use o [GitHub Desktop](https://desktop.github.com): **File → Add local repository**, escolha esta pasta, clique em **Publish repository**.
   - O site do GitHub aceita no máximo 100 arquivos por envio, e o projeto tem um pouco mais que isso. Por isso o GitHub Desktop é o caminho mais fácil.
3. Pela linha de comando, o mesmo resultado:

```sh
git init
git add .
git commit -m "Site Master Gráfica Cartaz"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/master-grafica-cartaz.git
git push -u origin main
```

### Enviar arquivos pelo site do GitHub

Para atualizar poucos arquivos sem instalar nada:

1. No repositório, abra a pasta do arquivo (ex.: `src/routes`).
2. Clique em **Add file → Upload files**, arraste o arquivo novo com o **mesmo nome** e clique em **Commit changes**. O arquivo antigo é substituído.
3. Para a pasta `.github/workflows`, que começa com ponto: clique em **Add file → Create new file**, digite `.github/workflows/github-pages.yml` como nome, cole o conteúdo do arquivo e clique em **Commit changes**.

## Publicar o site de graça (GitHub Pages)

1. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
2. Abra a aba **Actions**. A publicação roda sozinha a cada alteração no `main`. Para rodar agora: **Publicar site no GitHub Pages → Run workflow**.
3. Em 1 a 2 minutos o site fica no ar em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`. O endereço aparece em **Settings → Pages**.

Observações:

- No plano gratuito do GitHub, o Pages só funciona com repositório **público**.
- **Domínio próprio** (ex.: `mastergraficacartaz.com.br`): em **Settings → Pages → Custom domain**, digite o domínio e siga as instruções de DNS mostradas na tela.
- A Lovable continua podendo publicar o site no endereço dela. Os dois usam o mesmo código.

## Alterações mais comuns

- **Links do Mercado Livre**: em `src/routes/index.tsx`, procure `const ML =`. Hoje todos os botões levam à loja. Para cada cartaz levar ao próprio anúncio, cada modelo da lista `ALL` precisa ganhar o seu link (é uma mudança pequena no código).
- **WhatsApp e Instagram**: `const WA =` e `const IG =` no mesmo arquivo.
- **Cidades com entrega grátis**: `const RMR =` no mesmo arquivo.

## Rodar no computador

Veja o [COMO-RODAR.md](COMO-RODAR.md).
