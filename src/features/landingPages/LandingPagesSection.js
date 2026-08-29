import './landingPages.css';
import landingMockup from '../../assets/landing_mockup.webp';

export function LandingPagesSection() {
  return `
    <section class="landing-section animate-in animate-repeat" id="landing-section">
      <!-- Glow background overlay -->
      <div class="landing-bg-glow"></div>
      
      <div class="container">
        <div class="landing-content">
          <span class="landing-tag">02 — EXPERIÊNCIA WEB</span>
          
          <h2 class="landing-title">
            <span class="landing-line">PÁGINAS FEITAS</span>
            <span class="landing-line">PARA <em class="highlight">CONVERTER.</em></span>
          </h2>
          
          <p class="landing-description">
            Criamos landing pages modernas, responsivas e desenvolvidas para gerar resultados. Cada projeto é construído com código limpo, organizado e otimizado para oferecer carregamento rápido, excelente desempenho e uma experiência consistente em computadores, tablets e celulares.
            Aplicamos boas práticas de SEO técnico, estrutura semântica e otimização de performance para melhorar a visibilidade da página nos mecanismos de busca. Também desenvolvemos animações e interações personalizadas que tornam a experiência mais dinâmica e ajudam sua marca a se destacar sem comprometer a velocidade do site.
            Do design ao código, cada detalhe é pensado para unir estética, performance, acessibilidade e conversão transformando visitantes em clientes.
          </p>
          
          <div class="landing-features">
            <div class="landing-feature-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <span>Design Responsivo</span>
            </div>
            
            <div class="landing-feature-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <span>SEO Técnico</span>
            </div>

            <div class="landing-feature-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <span>Alta Performance</span>
            </div>

            <div class="landing-feature-card">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
              </div>
              <span>Integrações Flexíveis</span>
            </div>
          </div>
        </div>

        <div class="landing-mockup">
          <div class="landing-mockup-wrapper">
             <div class="landing-mockup-glow"></div>
             <div class="landing-mockup-card">
               <img src="${landingMockup}" alt="Landing Page Mockup" loading="lazy" />
               <div class="mockup-reflection"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
