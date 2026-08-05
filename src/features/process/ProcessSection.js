import './process.css';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Descoberta',
      description: 'Entendemos sua marca, público e objetivos.',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      `,
    },
    {
      number: '02',
      title: 'Estratégia',
      description: 'Planejamos a melhor solução para o projeto.',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      `,
    },
    {
      number: '03',
      title: 'Criação',
      description: 'Desenvolvemos design, motion ou experiência web.',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19l7-7 3 3-7 7-3-3z"/>
          <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/>
          <path d="M2 2l7.586 7.586"/>
          <circle cx="11" cy="11" r="2"/>
        </svg>
      `,
    },
    {
      number: '04',
      title: 'Entrega',
      description: 'Publicação, otimização e suporte.',
      icon: `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"/>
          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      `,
    },
  ];

  return `
    <section class="process-section animate-in" id="process-section">
      <div class="container">
        <div class="process-header">
          <div>
            <span class="section-label">Nosso Processo</span>
            <h2>
              COMO TRANSFORMAMOS<br />
              IDEIAS EM <span class="highlight">RESULTADOS.</span>
            </h2>
          </div>
        </div>

        <div class="process-steps" id="process-steps">
          ${steps.map(step => `
            <div class="process-step">
              <div class="process-step-icon">${step.icon}</div>
              <span class="process-step-number">${step.number}</span>
              <h3>${step.title}</h3>
              <p>${step.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
