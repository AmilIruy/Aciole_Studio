import './index.css';

import { Header } from './features/header/Header.js';
import { initMobileMenu } from './features/header/MobileMenu.js';
import { Hero } from './features/hero/Hero.js';
import { initHero3D } from './features/hero/HeroScene.js';
import { MotionSection } from './features/motion/MotionSection.js';
import { LandingPagesSection } from './features/landingPages/LandingPagesSection.js';
import { BrandingSection } from './features/branding/BrandingSection.js';
import { AboutSection } from './features/about/AboutSection.js';
import { ProcessSection } from './features/process/ProcessSection.js';
import { ProjectsSection, initProjects } from './features/projects/ProjectsSection.js';
import { Footer } from './features/footer/Footer.js';
import { SectionDivider } from './shared/components/SectionDivider.js';

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

// Initialize feature specific scripts
initProjects();
initMobileMenu();
initHero3D();

// Intersection Observer for scroll animations
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

// We attach the observer to any element with .animate-in if they exist, or we can select sections directly
const animatedElements = document.querySelectorAll('.animate-in, section');
animatedElements.forEach((el) => observer.observe(el));
