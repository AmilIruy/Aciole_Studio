import './hero.css';
import heroLogo from '../../assets/aciole11.png';

export function Hero() {
  return `
    <section class="hero" id="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">
            EXPERIÊNCIAS
            <span class="blue-light">DIGITAIS</span>
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
          <img src="${heroLogo}" alt="Aciole Studio Logo 3D" />
        </div>
      </div>
    </section>
  `;
}
