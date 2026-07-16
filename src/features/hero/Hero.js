import './hero.css';

export function Hero() {
  return `
    <section class="hero" id="hero">
      <canvas id="hero-canvas" class="hero-bg-canvas"></canvas>
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            EXPERIÊNCIAS
            <span class="blue-light">{DIGITAIS}</span>
            QUE GERAM
            <span class="highlight-yellow">RESULTADOS.</span>
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
