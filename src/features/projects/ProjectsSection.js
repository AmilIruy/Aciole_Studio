import './projects.css';
import motionThumb from '../../assets/motion_thumb.webp';
import landingMockup from '../../assets/landing_mockup.webp';
import projectPortfolio from '../../assets/project_portfolio.webp';

export function ProjectsSection() {
  const projects = [
    {
      image: projectPortfolio,
      title: 'Portfólio Completo',
      category: 'Landing Page',
      hasPlay: false,
    },
    {
      image: motionThumb,
      title: 'Campanha Viva',
      category: 'Motion Design',
      hasPlay: true,
    },
    {
      image: landingMockup,
      title: 'Landing Page Nacera',
      category: 'Landing Page',
      hasPlay: false,
    },
    {
      image: landingMockup,
      title: 'Landing Page Nacera',
      category: 'Landing Page',
      hasPlay: false,
    },
    
  ];

  const marqueeProjects = [...projects, ...projects];

  return `
    <section class="projects-section animate-in" id="projects-section">
      <div class="container">
        <div class="projects-header">
          <div>
            <span class="section-label">Projetos em Destaque</span>
            <h2>
              RESULTADOS<br />
              QUE <span class="highlight">FALAM<br />POR SI.</span>
            </h2>
          </div>
        </div>

        <div class="projects-carousel" id="projects-carousel">
         <div class="track">
            ${marqueeProjects.map(project => `
              <div class="project-card">
                <div class="project-card-image">
                  <img src="${project.image}" alt="${project.title}" />
                  ${project.hasPlay ? `
                    <div class="project-card-play">
                      <svg viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  ` : ''}
                </div>
                <div class="project-card-info">
                  <h3>${project.title}</h3>
                  <span>${project.category}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
        </div>
      </div>
    </section>
  `;
}

