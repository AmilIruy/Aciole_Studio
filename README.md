# Aciole Studio Landing Page

## Visão geral

Este repositório contém um site estático de apresentação para o Aciole Studio, focado em motion design, landing pages e branding. O site é construído com Vite e JavaScript moderno, usando componentes baseados em strings HTML retornadas por funções.

O projeto combina:
- Visual estático em HTML/CSS
- Carregamento de componentes por template strings
- Interações simples com DOM
- Animação 3D integrada no hero com Three.js
- Comportamentos responsivos e animações de entrada via Intersection Observer

## Tecnologias

- Vite
- Vanilla JavaScript (ES modules)
- Three.js
- GSAP + ScrollTrigger — animações de scroll cinematográficas na seção Motion
- Lenis — scroll suave com integração nativa ao GSAP ticker
- CSS customizado com variáveis e consultas de mídia
- Asset bundling via Vite

## Instalação

```bash
npm install
```

## Desenvolvimento

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Preview de produção

```bash
npm run preview
```

## Estrutura do projeto

- `index.html` — arquivo HTML principal com `#root` e carregamento do `src/main.js`.
- `package.json` — scripts NPM e dependências.
- `vite.config.js` — configuração do Vite.
- `src/index.css` — reset global, variáveis de tema, utilitários e responsividade.
- `src/main.js` — entrypoint que monta todas as seções no DOM e inicializa comportamentos.
- `src/features/` — seções do site, cada uma exporta HTML e, quando necessário, funções de inicialização.
- `src/shared/components/SectionDivider.js` — componente de divisor de seção.
- `src/assets/` — imagens, SVGs e o arquivo `Logo3d.glb` usado no hero.

## Como o site funciona

### `src/main.js`

- Importa `index.css` e as seções do site.
- Define o conteúdo principal em `document.getElementById('root').innerHTML`.
- Chama funções de inicialização:
  - `initProjects()` — ativa o carrossel horizontal de projetos.
  - `initMobileMenu()` — controla o menu hamburger em mobile.
  - `initHero3D()` — monta a cena Three.js no canvas do hero.
- Cria um `IntersectionObserver` para aplicar animações de fade/entrada às seções com `.animate-in`.

### Seções principais

- `Header.js` / `MobileMenu.js`
  - Cabeçalho fixo com navegação.
  - Menu mobile com overlay e fechamento via click ou Escape.
  - Ícones sociais e CTA.

- `Hero.js` / `HeroScene.js`
  - Hero com título, descrição e CTA.
  - Canvas 3D com Three.js executado em `initHero3D()`.
  - Carrega `Logo3d.glb` e exibe partículas, luzes e animação contínua.

- `MotionSection.js` / `motionAnimations.js`
  - Experiência cinematográfica completa de scroll para a seção Motion Design.
  - Estrutura em três blocos: título gigante com parallax, vídeo fullscreen pinado e três cards de projetos.
  - `initMotion()` — orquestra todas as animações GSAP/ScrollTrigger.
  - `initLenis()` — inicializa Lenis e integra com o GSAP ticker (substitui o smoothScroll.js manual).
  - Cada card possui vídeo com play/pause automático por viewport e animação stagger por linha de texto.

- `LandingPagesSection.js`
  - Seção de landing pages com mockup e recursos.
  - Usa asset de mockup importado e botões de navegação.

- `BrandingSection.js`
  - Seção de branding com imagens e pontos de destaque.

- `AboutSection.js`
  - Bloco sobre a agência com estatísticas e CTA.

- `ProcessSection.js`
  - Processo de trabalho em quatro passos com ícones inline.

- `ProjectsSection.js`
  - Galeria de projetos em carrossel horizontal.
  - `initProjects()` adiciona navegação scroll suave.

- `Footer.js`
  - CTA final e rodapé com links.

## Notas de implementação

- O projeto usa Vite com JavaScript puro e não depende de frameworks.
- A renderização é feita em strings HTML retornadas pelos módulos de seção.
- O componente `SectionDivider` está presente em `src/shared/components/SectionDivider.js` mas não é utilizado atualmente no markup final.
- O hero 3D usa Three.js e GLTFLoader. A cena é montada apenas se o canvas existir.
- Os assets são importados diretamente nos módulos JS para que o Vite trate o bundling.

## Dependências

- `three` — renderização WebGL 3D.
- `gsap` — animações de alta performance e ScrollTrigger para a seção Motion.
- `lenis` — scroll suave, integrado ao GSAP ticker para compatibilidade com ScrollTrigger.
- `vite` — bundler de desenvolvimento e build.
- `oxlint` — linting de código.

## Pontos importantes para IAs e futuras edições

- A base do site é estática e não há backend nem rotas dinâmicas.
- A lógica de interação está concentrada em `src/main.js`, `HeroScene.js`, `MobileMenu.js` e `ProjectsSection.js`.
- Para expandir o site, adicione novas seções em `src/features/` e importe no `main.js`.
- Evite alterar `index.html` além de meta tags, pois o conteúdo principal é montado via JavaScript.
- A responsividade é gerenciada em `src/index.css` com variáveis CSS e media queries.
- **Seção Motion**: toda a lógica de animação está em `src/features/motion/motionAnimations.js`. Não misture com o IntersectionObserver global do `main.js` — a seção Motion usa exclusivamente GSAP ScrollTrigger.
- **Lenis**: substitui o `smoothScroll.js` manual. O arquivo `smoothScroll.js` pode ser removido futuramente. Inicializar sempre antes de qualquer ScrollTrigger.
- **Vídeos Motion**: os vídeos dos cards e blocos usam o arquivo temporário `(oziart43) Zenitsu Ori.mp4`. Substitua os `src` nos elementos `<video>` do `MotionSection.js` pelos vídeos reais quando disponíveis.
- **Performance**: os vídeos dos cards só reproduzem quando o card está na viewport (ScrollTrigger onEnter/onLeave). Nunca mais de um vídeo de card roda simultaneamente durante scroll normal.

## Como usar este README

- Consulte a seção **Estrutura do projeto** para encontrar rapidamente onde cada bloco do site é definido.
- Use **Como o site funciona** para entender a renderização e inicialização de scripts.
- Verifique **Notas de implementação** antes de mexer no carregamento de assets ou no fluxo de renderização do hero 3D.
