import './process.css';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'Descoberta',
      description: 'Entendemos sua marca, público e objetivos para construir uma base sólida.',
    },
    {
      number: '02',
      title: 'Estratégia',
      description: 'Planejamos a melhor solução criativa e técnica para o seu projeto.',
    },
    {
      number: '03',
      title: 'Criação',
      description: 'Desenvolvemos design, motion ou experiência web com foco em resultado.',
    },
    {
      number: '04',
      title: 'Entrega',
      description: 'Publicação, otimização e suporte para garantir o sucesso do projeto.',
    },
  ];

  return `
    <section class="process-section animate-in" id="process-section">
      <div class="container">
        <div class="process-header">
          <span class="section-label">Nosso Processo</span>
          <h2>
            COMO TRANSFORMAMOS<br />
            IDEIAS EM <span class="highlight">RESULTADOS.</span>
          </h2>
          <p class="process-header-desc">
            Um processo estruturado que garante clareza, qualidade e impacto em cada etapa do projeto.
          </p>
        </div>

        <div class="process-steps" id="process-steps">
          ${steps.map(step => `
            <div class="process-step">
              <span class="process-step-number">${step.number}</span>
              <div class="process-step-body">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
