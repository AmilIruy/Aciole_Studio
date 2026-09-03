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
      title: 'Landing Page',
      category: 'Landing Page',
      hasPlay: false,
    },
    {
      image: landingMockup,
      title: 'Landing Page',
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
              QUE <span class="highlight">FALAM POR SI.</span>
            </h2>
          </div>
          <div class="projects-nav-buttons">
            <button class="nav-btn" id="carousel-prev" aria-label="Anterior">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            </button>
            <button class="nav-btn" id="carousel-next" aria-label="Próximo">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
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

export function initProjects() {
  const carousel = document.getElementById('projects-carousel');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (carousel && prevBtn && nextBtn) {
    const scrollAmount = 324;
    let isHovering = false;
    let clickTimeout;

    // Smooth auto-scroll
    const autoScroll = () => {
      if (!isHovering) {
        carousel.scrollLeft += 1;
        // Snap back to start if we scrolled past the original set
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft -= carousel.scrollWidth / 2;
        }
      }
      requestAnimationFrame(autoScroll);
    };
    
    // Start auto scroll
    requestAnimationFrame(autoScroll);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => isHovering = true);
    carousel.addEventListener('mouseleave', () => isHovering = false);
    
    // Handle manual scroll clicks smoothly
    const handleManualScroll = (amount) => {
      isHovering = true;
      clearTimeout(clickTimeout);
      
      const halfWidth = carousel.scrollWidth / 2;

      // Wrap around logic for manual scroll
      if (amount < 0 && carousel.scrollLeft < Math.abs(amount)) {
        carousel.scrollLeft += halfWidth;
      } else if (amount > 0 && carousel.scrollLeft >= halfWidth - amount) {
        carousel.scrollLeft -= halfWidth;
      }

      carousel.scrollBy({ left: amount, behavior: 'smooth' });
      
      clickTimeout = setTimeout(() => {
        isHovering = false;
      }, 800); // Resume auto-scroll after smooth transition finishes
    };

    prevBtn.addEventListener('click', () => handleManualScroll(-scrollAmount));
    nextBtn.addEventListener('click', () => handleManualScroll(scrollAmount));

    // Support touch devices (pause while touching)
    carousel.addEventListener('touchstart', () => isHovering = true, { passive: true });
    carousel.addEventListener('touchend', () => {
      clearTimeout(clickTimeout);
      clickTimeout = setTimeout(() => { isHovering = false; }, 800);
    });
  }
}

