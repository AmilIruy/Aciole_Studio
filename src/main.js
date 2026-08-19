import './index.css';

// 1. Imports críticos e templates HTML
import { Header } from './features/header/Header.js';
import { initMobileMenu } from './features/header/MobileMenu.js';
import { Hero, initHeroGlitch } from './features/hero/Hero.js';
import { MotionSection } from './features/motion/MotionSection.js';
import { LandingPagesSection } from './features/landingPages/LandingPagesSection.js';
import { ProjectsSection } from './features/projects/ProjectsSection.js';
import { AboutSection } from './features/about/AboutSection.js';
import { ProcessSection } from './features/process/ProcessSection.js';
import { Footer } from './features/footer/Footer.js';

// 2. Renderização imediata do HTML estático (FCP/LCP otimizados)
document.getElementById('root').innerHTML = `
  ${Header()}
  <main>
    ${Hero()}
    ${MotionSection()}
    ${LandingPagesSection()}
    ${ProjectsSection()}
    ${AboutSection()}
    ${ProcessSection()}
  </main>
  ${Footer()}
`;

// 3. Inicialização de scripts prioritários já embutidos no bundle
initMobileMenu();
initHeroGlitch();

// Three.js do Hero — só carrega em desktop (769px+ consistente com o CSS)
// No mobile, o SVG aciole9.svg é exibido diretamente (zero Three.js/GLB)
const isDesktop = window.matchMedia('(min-width: 769px)').matches;
if (isDesktop) {
  import('./features/hero/HeroScene.js').then(({ initHero3D }) => initHero3D());
}
// Lenis: Inicializado assincronamente logo após o render crítico para garantir UX suave
import('./features/scroll/lenis.js').then(({ initLenis }) => initLenis());

// Motion: Inicializado via Idle Loading após a página carregar (evita penalidade no Lighthouse e evita Jitter no Scroll)
window.addEventListener('load', () => {
  const loadMotion = () => {
    import('./features/motion/motionAnimations.js')
      .then(({ initMotion }) => initMotion())
      .catch(err => console.error("Erro ao carregar Motion JS", err));
  };
  
  if ('requestIdleCallback' in window) {
    requestIdleCallback(loadMotion, { timeout: 2000 });
  } else {
    setTimeout(loadMotion, 500);
  }
});

// 4. Estratégia de Lazy Loading de JS via IntersectionObserver
const jsLazyLoadObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Espaço reservado para futuras implementações lazy load via observer (ex: projetos)
      }
    });
  },
  { 
    // rootMargin de 600px garante que o JS começará a baixar antes de ser visível
    rootMargin: '24px 0px 24px 0px',
    threshold: 0 
  }
);

// Observa seções pesadas


const projectsSection = document.getElementById('projects-section');
if (projectsSection) jsLazyLoadObserver.observe(projectsSection);

// 5. Intersection Observer para animações puramente visuais (fade-in)
const visualObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      visualObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const animatedElements = document.querySelectorAll('.animate-in');
animatedElements.forEach((el) => visualObserver.observe(el));
