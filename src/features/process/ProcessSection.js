import './process.css';

export function ProcessSection() {
  const steps = [
    {
      number: '01',
      title: 'EDIÇÃO',
      description: 'Cortes, ritmo, tratamento de imagem e sound design. Aqui que o material bruto começa a ganhar forma.',
    },
    {
      number: '02',
      title: 'MOTION DESIGN',
      description: 'Animação de elementos, tipografia e composição. Movimento pensado para dar vida às ideias e transmitir mensagens.',
    },
    {
      number: '03',
      title: 'COMPOSIÇÃO & PÓS-PRODUÇÃO',
      description: 'Camadas, máscaras, recortes e efeitos visuais que ampliam as possibilidades da imagem.',
    },
    {
      number: '04',
      title: 'CAPTAÇÃO & IMAGEM',
      description: 'Enquadramento, iluminação e movimento de câmera para construir imagens que contam histórias.',
    },
  ];

  return `
    <section class="process-section animate-in" id="process-section">
      <div class="process-bg-layer" id="process-bg-layer"></div>
      <div class="container">
        <div class="process-header">
          <span class="section-label">NOS BASTIDORES</span>
          <h2>
            ONDE AS IDEIAS<br />
            GANHAM <span class="highlight">MOVIMENTO.</span>
          </h2>
          <p class="process-header-desc global-scroll-gradient">
            Um olhar por trás de cada projeto. Das primeiras gravações à edição e animação, explore os processos que transformam ideias em experiências visuais.
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
