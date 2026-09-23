import './index.css';
import { Header } from './features/header/Header.js';
import { initMobileMenu } from './features/header/MobileMenu.js';
import { Hero, initHeroGlitch, initScrollIndicator } from './features/hero/Hero.js';
import { MotionSection } from './features/motion/MotionSection.js';
import { LandingPagesSection } from './features/landingPages/LandingPagesSection.js';
import { ProjectsSection, initProjects } from './features/projects/ProjectsSection.js';
import { AboutSection } from './features/about/AboutSection.js';
import { ProcessSection } from './features/process/ProcessSection.js';
import { Footer } from './features/footer/Footer.js';

document.getElementById('root').innerHTML = `
  ${Header()}
  <main>
    ${Hero()}
    ${MotionSection()}
    ${LandingPagesSection()}
    ${ProjectsSection()}
    ${ProcessSection()}
    ${AboutSection()}
  </main>
  ${Footer()}
`;

initMobileMenu();
initHeroGlitch();
initProjects();

const isDesktop = window.matchMedia('(min-width: 769px)').matches;

// Adia Lenis + HeroScene para tempo ocioso — evita long tasks no startup
const loadScrollAndScene = () => {
  import('./features/scroll/lenis.js').then(({ initLenis }) => {
    const lenis = initLenis();
    initScrollIndicator(lenis);
  });

  if (isDesktop) {
    import('./features/hero/HeroScene.js').then(({ initHero3D }) => initHero3D());
  }
};

if ('requestIdleCallback' in window) {
  requestIdleCallback(loadScrollAndScene, { timeout: 1500 });
} else {
  setTimeout(loadScrollAndScene, 200);
}

const loadMotionOnInteraction = () => {
  const events = ['scroll', 'wheel', 'touchstart', 'mousemove'];
  
  const trigger = () => {
    events.forEach(e => window.removeEventListener(e, trigger));
    
    const fetchMotion = () => {
      import('./features/motion/motionAnimations.js')
        .then(({ initMotion }) => initMotion())
        .catch(err => console.error("Erro ao carregar Motion JS", err));
    };

    if ('requestIdleCallback' in window) {
      requestIdleCallback(fetchMotion, { timeout: 2000 });
    } else {
      setTimeout(fetchMotion, 50);
    }
  };

  events.forEach(e => window.addEventListener(e, trigger, { passive: true }));
};

loadMotionOnInteraction();



const visualObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      if (!entry.target.classList.contains('animate-repeat')) {
        visualObserver.unobserve(entry.target);
      }
    } else {
      if (entry.target.classList.contains('animate-repeat')) {
        if (entry.boundingClientRect.y > 0) {
          entry.target.classList.remove('visible');
        }
      }
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

const animatedElements = document.querySelectorAll('.animate-in');
animatedElements.forEach((el) => visualObserver.observe(el));

// --- Global Scroll Gradient Tracker ---
const updateScrollGradient = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return;
  const progress = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
  document.documentElement.style.setProperty('--scroll-gradient-x', `-${progress * 900}vw`);
};
window.addEventListener('scroll', updateScrollGradient, { passive: true });
window.addEventListener('resize', updateScrollGradient, { passive: true });
updateScrollGradient();