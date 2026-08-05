import './about.css';

export function AboutSection() {
  const stats = [
    { icon: '⭐', number: '+50', label: 'Projetos Entregues' },
    { icon: '🏆', number: '+30', label: 'Marcas Atendidas' },
    { icon: '🎯', number: '100%', label: 'Foco em Resultados' },
    { icon: '🌎', number: 'Brasil', label: 'Atendemos em todo o país' },
  ];

  return `
    <section class="about-section animate-in" id="about-section">
      <div class="container">
        <div class="about-content">
          <span class="section-label" style="color: rgba(255,255,255,0.6)">Sobre a Aciole Studio</span>
          <h2>
            CRIATIVIDADE<br />
            COM <span class="highlight">PROPÓSITO.</span>
          </h2>
          <p>
            A Aciole Studio nasceu para unir design, tecnologia e estratégia em projetos que realmente geram resultados.
          </p>
          <p>
            Nós criamos agency de experiências, criamos experiências digitais capazes de destacar empresas em mercados cada vez mais competitivos.
          </p>
        </div>

        <div class="about-stats" id="about-stats">
          ${stats.map(stat => `
            <div class="about-stat">
              <div class="stat-icon">${stat.icon}</div>
              <span class="stat-number">${stat.number}</span>
              <span class="stat-label">${stat.label}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
