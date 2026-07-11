import './landingPages.css';
import landingMockup from '../../assets/landing_mockup.png';

export function LandingPagesSection() {
  return `
    <section class="landing-section animate-in" id="landing-section">
      <div class="container">
        <div class="landing-content">
          <span class="section-label" style="color: var(--gray-500)">02 — Landing Pages</span>
          <h2>
            PÁGINAS FEITAS<br />
            PARA <span class="highlight">CONVERTER.</span>
          </h2>
          <p>
            Desenvolvemos landing pages modernas, rápidas e otimizadas para transformar visitantes em clientes.
          </p>
          <div class="landing-features">
            <div class="landing-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </span>
              Design Responsivo
            </div>
            <div class="landing-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
              SEO Técnico
            </div>
            <div class="landing-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </span>
              Performance Alta
            </div>
            <div class="landing-feature">
              <span class="icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </span>
              Integrações
            </div>
          </div>
          <a href="#projects-section" class="btn-primary" id="landing-cta">
            Ver Mais Landing Pages <span class="arrow">→</span>
          </a>
        </div>

        <div class="landing-mockup">
          <div class="landing-mockup-card">
            <img src="${landingMockup}" alt="Landing Page Mockup - Impulsione seu negócio no digital" />
            <div class="mockup-nav-arrows">
              <button class="mockup-nav-arrow" aria-label="Anterior">‹</button>
              <button class="mockup-nav-arrow" aria-label="Próximo">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
