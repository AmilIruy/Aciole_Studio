# Aciole Studio Landing Page

## Visão geral

Este repositório contém um site estático de apresentação para o Aciole Studio, focado em motion design e landing pages. O site é construído com Vite e JavaScript moderno, usando componentes baseados em strings HTML retornadas por funções.

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

<!-- Branding section removed -->

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

## Performance Architecture

O site foi otimizado para atingir as melhores métricas de carregamento (LCP, FCP e TBT) garantindo a experiência de usuário através de uma estratégia agressiva de **Code Splitting** e **Lazy Loading**:

- **Caminho Crítico (Initial Render):** Apenas o HTML base, CSS essencial e pequenos scripts interativos são carregados inicialmente. As funções que geram HTML (`Hero()`, `MotionSection()`, etc.) estão no bundle principal para garantir que a página "exista" imediatamente, impedindo a quebra de layout durante *Fast Navigation* (pulos rápidos via links âncora).
- **Dynamic Imports:** Módulos que dependem de bibliotecas pesadas (Three.js, GSAP, ScrollTrigger, Lenis) foram desacoplados. Eles são requisitados através de `import('...')` retornando Promises.
- **Three.js & Hero:** O modelo 3D é carregado de forma assíncrona. O usuário vê o conteúdo da Hero instantaneamente, e o 3D surge logo em seguida, sem bloquear a thread principal.
- **Lenis (Smooth Scroll):** É inicializado via import dinâmico imediatamente após o render crítico. Isso evita atrasar o LCP da página, sem que a experiência global de scroll do usuário seja perdida.
- **Lazy Loading de Seções (Intersection Observer):** Um `IntersectionObserver` global (`jsLazyLoadObserver` com root margin estendida para 600px) monitora o scroll. Somente quando o usuário se aproxima de uma seção pesada (como Motion ou Projetos), o JavaScript e as animações dessas seções são baixados, parseados e executados.
- **Vídeos "Click-to-Load":** Os vídeos pesados das landing pages não carregam imediatamente. A tag `<video>` recebe a URL num atributo `data-video` e conta com uma thumbnail otimizada e um botão de Play, evitando sobrecarga de dados não solicitados. Ao clicar no Play, o JavaScript atribui o `src` ao vídeo.

## Performance Guidelines

Para manter o nível de excelência performática em futuras edições, siga rigorosamente as regras abaixo:

1. **Evite novos imports estáticos na `main.js`**: Não adicione funcionalidades pesadas via `import { ... }` na `main.js`. Use sempre `import('...').then(...)` para funcionalidades abaixo da dobra da página.
2. **Separe HTML de Lógica**: Componentes visuais (`.js` que retorna a string do template) devem ser importados estaticamente. Toda lógica de eventos e bibliotecas extras (`initMotion()`, `initProjects()`) deve viver em um arquivo separado e importado sob demanda.
3. **Imagens Otimizadas**: Use sempre os formatos WebP ou AVIF, definindo dimensões explicitamente (`width` e `height`) no CSS ou HTML para evitar Cumulative Layout Shift (CLS).
4. **Vídeos Sob Demanda**: Nunca coloque arquivos pesados `.mp4` carregando diretamente pelo atributo `src` se o usuário não pediu para reproduzir. Siga o padrão *Click-to-Load* com thumbnails.
5. **Auditoria Pós-alterações pesadas**: Ao adicionar uma nova biblioteca (ex: animação, slider), analise o impacto visualizando os chunks após executar `npm run build`. O pacote principal (`index.js`) deve se manter o mais próximo de ~30kb gzipped possível.
6. **Múltiplas Instâncias**: Evite inicializar GSAP, ScrollTrigger ou Lenis várias vezes. Gerencie-os de modo singular.
7. **Fast Navigation**: Ao adicionar uma nova interação lazy loaded, certifique-se de que a estrutura HTML exista primeiro. Se o usuário pular direto do header para o rodapé em 0.1s, o site jamais deverá gerar erros de DOM null.
