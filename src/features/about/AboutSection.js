import './about.css';
import yuriImage from '../../assets/Yuri-Aciole.webp';

export function AboutSection() {
  return `
    <section class="about-section animate-in" id="about-section">
      <div class="container">
        <div class="about-media">
          <span class="about-media-label">Yuri Aciole — Designer & Dev</span>
          <div class="about-image-frame">
            <img src="${yuriImage}" alt="Yuri Aciole — Designer e Desenvolvedor da Aciole Studio" class="about-image" />
          </div>
        </div>

        <div class="about-content">
          <span class="section-label" style="color: rgba(255,255,255,0.35)">Sobre a Aciole Studio</span>
          <h2>
            CRIATIVIDADE<br />
            COM <span class="highlight">PROPÓSITO.</span>
          </h2>
          <p class="global-scroll-gradient">
            A Aciole Studio nasceu para unir design, tecnologia e audiovisual em projetos que realmente geram resultados.
          </p>
          <p class="global-scroll-gradient">
            Criamos experiências digitais e conteúdos visuais que conectam marcas e pessoas, ajudando empresas a se destacar em mercados cada vez mais competitivos.
          </p>

          <div class="about-stats">
            <div class="about-stat">
              <span class="about-stat-value">3+</span>
              <span class="about-stat-label">Anos</span>
            </div>
            <div class="about-stat">
              <span class="about-stat-value">50+</span>
              <span class="about-stat-label">Projetos</span>
            </div>
            <div class="about-stat">
              <span class="about-stat-value">100%</span>
              <span class="about-stat-label">Foco</span>
            </div>
          </div>

          <a href="https://wa.me/24999593389" target="_blank" rel="noopener noreferrer" class="btn-outline-white">
            Fale Comigo <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
