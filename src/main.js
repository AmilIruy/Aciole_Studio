import './index.css';

import { Header } from './features/header/Header.js';
import { initMobileMenu } from './features/header/MobileMenu.js';
import { Hero, initHeroGlitch } from './features/hero/Hero.js';
import { initHero3D } from './features/hero/HeroScene.js';
import { MotionSection, initMotion } from './features/motion/MotionSection.js';
import { LandingPagesSection } from './features/landingPages/LandingPagesSection.js';
import { BrandingSection } from './features/branding/BrandingSection.js';
import { AboutSection } from './features/about/AboutSection.js';
import { ProcessSection } from './features/process/ProcessSection.js';
import { ProjectsSection, initProjects } from './features/projects/ProjectsSection.js';
import { Footer } from './features/footer/Footer.js';
import { initLenis } from './features/motion/motionAnimations.js';

document.getElementById('root').innerHTML = `
  ${Header()}
  <main>

    ${Hero()}
    ${MotionSection()}
    ${LandingPagesSection()}
    ${BrandingSection()}
    ${AboutSection()}
    ${ProcessSection()}
    ${ProjectsSection()}
  </main>
  ${Footer()}
`;

// Lenis substitui o smoothScroll manual — inicializar antes das animações
initLenis();

// Feature-specific scripts
initProjects();
initMobileMenu();
initHero3D();
initHeroGlitch();

// Animações cinematográficas da seção Motion
initMotion();

// Intersection Observer para animações de fade/entrada nas demais seções
// (a seção Motion usa GSAP/ScrollTrigger e não precisa deste observer)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

// Exclui #motion-experience do observer (GSAP cuida das animações do Motion)
const animatedElements = document.querySelectorAll('.animate-in, section:not(#motion-title-block):not(#motion-video-block):not(#motion-cards)');
animatedElements.forEach((el) => observer.observe(el));
