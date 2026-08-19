# Aciole Studio — Documentação do Projeto

## 1. Sobre o projeto

O Aciole Studio é um portfólio digital voltado para Motion Design, Web Design e experiências digitais criativas.

O site tem como objetivo apresentar os trabalhos do estúdio de forma visual, moderna e interativa, mantendo boa performance, acessibilidade e facilidade de manutenção.

## 2. Tecnologias

- Vite
- JavaScript
- HTML
- CSS
- GSAP
- ScrollTrigger
- Three.js
- Lenis
- WebP / formatos de mídia otimizados

## 3. Estrutura do projeto

A organização principal segue a separação por funcionalidades:

    src/
    ├── assets/
    ├── components/
    ├── features/
    │   ├── hero/
    │   ├── motion/
    │   └── projects/
    ├── styles/
    └── main.js

A estrutura existente deve ser preservada sempre que possível. Novos arquivos ou reorganizações devem ter uma justificativa técnica clara.

## 4. Arquitetura

O site utiliza carregamento progressivo para evitar que recursos pesados prejudiquem o carregamento inicial.

### Renderização inicial

O `main.js` deve priorizar a construção imediata da estrutura visual da página.

Recursos pesados e funcionalidades que não são necessárias para o primeiro conteúdo visual devem ser carregados posteriormente.

### Hero

A Hero possui duas experiências:

**Desktop**
- Conteúdo visual da Hero
- Cena 3D utilizando Three.js

**Mobile**
- Conteúdo visual da Hero
- SVG `aciole9.svg`

O Three.js / `HeroScene` não deve ser carregado em dispositivos mobile.

No desktop, o 3D deve aparecer somente depois que estiver devidamente carregado e pronto para renderização, evitando que o usuário veja a cena em uma posição ou estado de inicialização incorreto. Não há fallback visual do SVG no desktop.

A animação da Hero também deve evitar processamento desnecessário quando a seção não estiver visível.

## 5. Motion Design

A seção Motion Design utiliza GSAP e ScrollTrigger.

Essas dependências e suas lógicas devem permanecer separadas do JavaScript inicial sempre que possível.

A seção utiliza:
- animações controladas pelo scroll;
- máscaras e transições;
- entrada de cards;
- parallax;
- reprodução controlada de vídeos.

As animações devem ser interrompidas ou suspensas quando a seção não estiver visível, evitando processamento desnecessário.

## 6. Projetos

A seção de projetos apresenta trabalhos em formato de carrossel.

Os vídeos dos projetos utilizam carregamento sob demanda.

A estratégia atual inclui:
- `data-video`;
- carregamento do vídeo somente quando necessário;
- botão de reprodução;
- pausa de vídeos anteriores;
- remoção do `src` de vídeos que não estão sendo utilizados.

O objetivo é evitar o download desnecessário de vídeos durante o carregamento inicial.

## 7. Performance

Performance é uma preocupação importante do projeto, mas não deve comprometer desnecessariamente a experiência visual.

Prioridades:
1. Carregamento inicial rápido.
2. Baixo JavaScript inicial.
3. Carregamento sob demanda de recursos pesados.
4. Redução de trabalho desnecessário na CPU/GPU.
5. Imagens e vídeos otimizados.
6. Evitar bloqueios da thread principal.
7. Evitar mudanças de layout desnecessárias.

### JavaScript

Bibliotecas pesadas devem ser carregadas somente quando forem necessárias.

Sempre que apropriado, utilizar imports dinâmicos para:
- Three.js;
- GSAP;
- ScrollTrigger;
- lógicas específicas de seções.

Evitar colocar dependências pesadas no bundle inicial sem necessidade.

### Animações

Sempre que possível, priorizar `transform` e `opacity`.

Evitar animações que provoquem layout/reflow desnecessário.

Animações de seções que não estão visíveis devem ser pausadas ou suspensas quando isso não alterar a experiência esperada.

### Imagens

Utilizar formatos modernos e otimizados, como WebP ou AVIF, quando apropriado.

Imagens devem possuir dimensões explícitas quando necessário para evitar mudanças de layout.

### Vídeos

Vídeos não devem ser carregados automaticamente sem necessidade.

Sempre que possível, utilizar carregamento sob demanda e iniciar o download somente quando houver uma necessidade real de reprodução.

## 8. Mobile

Mobile deve ser tratado como um cenário de performance próprio.

**Three.js / HeroScene não deve ser carregado em mobile.**

No mobile, a Hero utiliza o SVG `aciole9.svg`.

Animações e recursos pesados também podem ser simplificados em dispositivos menores quando isso melhorar significativamente a performance sem prejudicar o design.

## 9. Desenvolvimento e manutenção

Antes de modificar uma funcionalidade:
1. Verifique como ela está implementada atualmente.
2. Reutilize componentes, funções e helpers existentes.
3. Evite mudanças arquiteturais desnecessárias.
4. Mantenha cada funcionalidade isolada em seu respectivo módulo.
5. Adicione novas dependências somente quando houver necessidade real.

Ao corrigir um problema, prefira a menor alteração necessária para resolver a causa sem introduzir regressões.

## 10. Regras importantes

- Three.js não deve carregar em mobile.
- A Hero 3D deve aparecer somente quando estiver pronta para renderização.
- Recursos pesados devem ser carregados sob demanda quando possível.
- GSAP e ScrollTrigger não devem aumentar desnecessariamente o JavaScript inicial.
- Vídeos de projetos devem utilizar carregamento controlado.
- Animações fora da área visível devem evitar processamento contínuo desnecessário.
- O design e as animações existentes não devem ser removidos apenas por motivos de performance sem avaliar o impacto visual.
- Não substituir a arquitetura atual sem justificativa técnica.
- Mudanças de performance não devem causar regressões visuais ou funcionais.

## 11. Comandos

Instalar dependências:
`npm install`

Executar desenvolvimento:
`npm run dev`

Gerar build:
`npm run build`

Visualizar build:
`npm run preview`

## 12. Princípio geral

O Aciole Studio deve equilibrar:

**Design + Experiência + Performance**

Performance deve servir à experiência do usuário, e não substituir a identidade visual do projeto.

Ao realizar alterações, procure sempre a solução que preserve a experiência visual enquanto reduz complexidade, processamento e carregamento desnecessários.
