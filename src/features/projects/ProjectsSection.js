import './projects.css';
import motionThumb from '../../assets/motion_thumb.png';
import landingMockup from '../../assets/landing_mockup.png';
import brandingMockup from '../../assets/branding_mockup.png';
import projectPortfolio from '../../assets/project_portfolio.png';

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
      image: brandingMockup,
      title: 'Branding Vólcax',
      category: 'Branding',
      hasPlay: false,
    },
  ];

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
          <div class="projects-nav" id="projects-nav">
            <button id="carousel-prev" aria-label="Anterior">‹</button>
            <button id="carousel-next" aria-label="Próximo">›</button>
          </div>
        </div>

        <div class="projects-carousel" id="projects-carousel">
          ${projects.map(project => `
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

        <div class="projects-cta">
          <a href="#" class="btn-outline-dark" id="projects-portfolio-cta">
            Ver Portfólio Completo <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  `;
}

export function initProjects() {
  const carousel = document.getElementById('projects-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 324;

    prevBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}
