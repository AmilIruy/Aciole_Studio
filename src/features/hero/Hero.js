import './hero.css';

const WORD_PAIRS = [
  { word1: 'DIGITAIS', word2: 'RESULTADOS' },
  { word1: 'ANIMADAS', word2: 'IMPACTO' },
  { word1: 'VISUAIS', word2: 'VENDAS' },
  { word1: 'INTERATIVAS', word2: 'CONVERSÕES' },
];

const GLITCH_DURATION = 600;
const CYCLE_INTERVAL = 4500;

export function Hero() {
  return `
    <section class="hero" id="hero">
      <canvas id="hero-canvas" class="hero-bg-canvas"></canvas>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            EXPERIÊNCIAS
            <span class="blue-light" id="hero-word-1">DIGITAIS</span>
            QUE GERAM
            <span class="highlight-yellow" id="hero-word-2">RESULTADOS.</span>
          </h1>
          <p class="hero-subtitle">
            Transformamos ideias em experiências digitais memoráveis através de Motion Design, Landing Pages e Branding estratégico.
          </p>
          <a href="#projects-section" class="btn-primary" id="hero-cta">
            Ver Projetos <span class="arrow">→</span>
          </a>
        </div>
        <div class="hero-image">
          <!-- Espaço reservado para manter o layout flexbox -->
        </div>
      </div>
    </section>
  `;
}

export function initHeroGlitch() {
  const word1Element = document.getElementById('hero-word-1');
  const word2Element = document.getElementById('hero-word-2');

  if (!word1Element || !word2Element) return;

  let currentIndex = 0;
  let isAnimating = false;
  let cycleIntervalId = null;
  let timeoutIds = [];

  const clearScheduledTasks = () => {
    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIds = [];

    if (cycleIntervalId !== null) {
      window.clearInterval(cycleIntervalId);
      cycleIntervalId = null;
    }
  };

  const updateWords = (index) => {
    const { word1, word2 } = WORD_PAIRS[index];
    word1Element.textContent = word1;
    word2Element.textContent = `${word2}.`;
  };

  const animateSwap = () => {
    if (isAnimating) return;

    isAnimating = true;
    const nextIndex = (currentIndex + 1) % WORD_PAIRS.length;

    word1Element.classList.add('glitch-left');
    word2Element.classList.add('glitch-right');

    timeoutIds.push(
      window.setTimeout(() => {
        updateWords(nextIndex);
        currentIndex = nextIndex;
      }, GLITCH_DURATION / 2),
      window.setTimeout(() => {
        word1Element.classList.remove('glitch-left');
        word2Element.classList.remove('glitch-right');
        isAnimating = false;
      }, GLITCH_DURATION)
    );
  };

  cycleIntervalId = window.setInterval(animateSwap, CYCLE_INTERVAL);
  window.addEventListener('beforeunload', clearScheduledTasks, { once: true });
}
