import './about.css';
import yuriImage from '../../assets/Yuri-Aciole.webp';

export function AboutSection() {
  return `
    <section class="about-section" id="about-section">
      <div class="container">
        <div class="about-media">
          <img src="${yuriImage}" alt="Yuri Aciole" class="about-image" />
        </div>
        
        <div class="about-content">
          <span class="section-label" style="color: rgba(255,255,255,0.6)">Sobre a Aciole Studio</span>
          <h2>
            CRIATIVIDADE<br />
            COM <span class="highlight">PROPÓSITO.</span>
          </h2>
          <p>
            A Aciole Studio nasceu para unir design, tecnologia e audiovisual em projetos que realmente geram resultados.
          </p>
          <p>
            Criamos experiências digitais e conteúdos visuais que conectam marcas e pessoas, ajudando empresas a se destacar em mercados cada vez mais competitivos.
          </p>
        </div>
      </div>
    </section>
  `;
}
