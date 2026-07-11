import './branding.css';
import brandingMockup from '../../assets/branding_mockup.png';
import brandingVideo from '../../assets/branding_video.png';

export function BrandingSection() {
  return `
    <section class="branding-section animate-in" id="branding-section">
      <div class="container">
        <div class="branding-images">
          <img src="${brandingMockup}" alt="Branding Mockup" class="branding-img-main" />
          <img src="${brandingVideo}" alt="Branding Video" class="branding-img-side" />
        </div>

        <div class="branding-content">
          <span class="section-label">03 — Branding</span>
          <h2>
            IDENTIDADES QUE<br />
            FICAM NA <span class="highlight">MEMÓRIA.</span>
          </h2>
          <p>
            Construímos marcas fortes através da criação de logos, paletas, tipografia e sistemas visuais consistentes.
          </p>
          <div class="branding-features">
            <div class="branding-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </span>
              Logotipo
            </div>
            <div class="branding-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </span>
              Manual de Marca
            </div>
            <div class="branding-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="13.5" cy="6.5" r="2.5"/>
                  <path d="M17 2H7a5 5 0 0 0-5 5v10a5 5 0 0 0 5 5h10a5 5 0 0 0 5-5V7a5 5 0 0 0-5-5z"/>
                  <path d="M2 17l5-5 4 4 4-4 7 7"/>
                </svg>
              </span>
              Identidade Visual
            </div>
            <div class="branding-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                </svg>
              </span>
              Redes Sociais
            </div>
          </div>
          <a href="#projects-section" class="btn-outline-dark" id="branding-cta">
            Ver Mais Projetos de Branding <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
