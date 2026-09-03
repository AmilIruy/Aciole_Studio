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
          <a href="https://wa.me/24999593389" target="_blank" rel="noopener noreferrer" class="btn-outline-dark" id="hero-cta" style="display: inline-flex; align-items: center; gap: 8px;">
            Contato <span class="arrow" style="display: flex; align-items: center;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
            </span>
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
