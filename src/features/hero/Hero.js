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
      <canvas id="hero-canvas" class="hero-bg-canvas" aria-hidden="true"></canvas>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            EXPERIÊNCIAS
            <span class="blue-light" id="hero-word-1">DIGITAIS</span>
            QUE GERAM
            <span class="highlight-yellow" id="hero-word-2">RESULTADOS.</span>
          </h1>
          <p class="hero-subtitle">
            Transformamos ideias em experiências digitais memoráveis através de Motion Design e Landing Pages estratégicas.
          </p>
          <a href="#projects-section" class="btn-primary" id="hero-cta">
            Ver Projetos <span class="arrow">→</span>
          </a>
        </div>
        <div class="hero-image">
          <img
            id="hero-logo-svg"
            class="hero-logo-svg"
            src="/aciole9.svg"
            alt="Aciole Studio"
            aria-hidden="true"
            width="480"
            height="480"
            fetchpriority="high"
          >
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
  let io = null;
  let isVisible = true;

  const clearScheduledTasks = () => {
    timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId));
    timeoutIds = [];

    if (cycleIntervalId !== null) {
      window.clearInterval(cycleIntervalId);
      cycleIntervalId = null;
    }

    isAnimating = false;
    word1Element.classList.remove('glitch-left');
    word2Element.classList.remove('glitch-right');
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

  const startCycle = () => {
    if (cycleIntervalId === null) {
      
      animateSwap();
      cycleIntervalId = window.setInterval(animateSwap, CYCLE_INTERVAL);
    }
  };

  
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    io = new IntersectionObserver((entries) => {
      const entry = entries[0];
      const currentlyVisible = entry.isIntersecting;

      if (currentlyVisible && !cycleIntervalId) {
        isVisible = true;
        startCycle();
      } else if (!currentlyVisible) {
        isVisible = false;
        clearScheduledTasks();
      }
    }, { threshold: 0.01 });

    io.observe(heroSection);
  } else {
    
    startCycle();
  }

  window.addEventListener('beforeunload', () => {
    clearScheduledTasks();
    if (io) io.disconnect();
  }, { once: true });
}

export function initScrollIndicator(lenis) {
  // Cria e anexa direto ao body — fora de qualquer stacking context
  const indicator = document.createElement('div');
  indicator.className = 'scroll-indicator';
  indicator.id = 'scroll-indicator';
  indicator.setAttribute('aria-hidden', 'true');
  indicator.innerHTML = `
    <svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.836,34.437c-0.195,0.195-0.451,0.293-0.707,0.293s-0.512-0.098-0.707-0.293
        L25.129,20.144L10.836,34.437c-0.391,0.391-1.023,0.391-1.414,0
        s-0.391-1.023,0-1.414l15-15c0.391-0.391,1.023-0.391,1.414,0l15,15
        C41.227,33.414,41.227,34.046,40.836,34.437z"
        transform="rotate(180 25 25)"/>
    </svg>
  `;
  document.body.appendChild(indicator);

  let hideTimer = null;
  let isHidden = false;
  let destroyed = false;

  const show = () => {
    if (destroyed) return;
    isHidden = false;
    indicator.classList.remove('hidden');
  };

  const hide = () => {
    if (destroyed) return;
    isHidden = true;
    indicator.classList.add('hidden');
  };

  const onScroll = () => {
    if (!isHidden) hide();
    clearTimeout(hideTimer);
    hideTimer = setTimeout(show, 800);
  };

  const destroy = () => {
    if (destroyed) return;
    destroyed = true;
    clearTimeout(hideTimer);
    indicator.classList.add('hidden');
    if (lenis) {
      lenis.off('scroll', onScroll);
    } else {
      window.removeEventListener('scroll', onScroll);
    }
  };

  // Subscreve ao Lenis (preferencial) ou fallback nativo
  if (lenis) {
    lenis.on('scroll', onScroll);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Some permanentemente quando o footer entra na viewport
  const footerTrigger = document.getElementById('footer-cta');
  if (footerTrigger) {
    const footerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          destroy();
          footerObserver.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    footerObserver.observe(footerTrigger);
  }
}
