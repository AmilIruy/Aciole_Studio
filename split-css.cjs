const fs = require('fs');
const path = require('path');

const cssContent = fs.readFileSync(path.join(__dirname, 'src/index.css'), 'utf-8');

// The CSS contains markers like /* ===== HEADER ===== */
// We will extract content based on these markers and media queries

// Let's define the parts we want to extract
const markers = [
  { name: 'header', match: '/* ===== HEADER ===== */' },
  { name: 'hero', match: '/* ===== HERO ===== */' },
  { name: 'sectionDivider', match: '/* ===== SECTION DIVIDER ===== */' },
  { name: 'motion', match: '/* ===== MOTION SECTION ===== */' },
  { name: 'landingPages', match: '/* ===== LANDING PAGES SECTION ===== */' },
  { name: 'branding', match: '/* ===== BRANDING SECTION ===== */' },
  { name: 'about', match: '/* ===== ABOUT SECTION ===== */' },
  { name: 'process', match: '/* ===== PROCESS SECTION ===== */' },
  { name: 'projects', match: '/* ===== PROJECTS SECTION ===== */' },
  { name: 'footer', match: '/* ===== FOOTER CTA ===== */' },
];

let globalCss = '';
let currentSection = 'global';
let sections = {};

markers.forEach(m => sections[m.name] = '');
sections['global'] = '';

const lines = cssContent.split('\n');
let i = 0;

while (i < lines.length) {
  let line = lines[i];
  
  // Check if we hit a marker
  let matchedMarker = markers.find(m => line.includes(m.match));
  if (matchedMarker) {
    currentSection = matchedMarker.name;
    sections[currentSection] += line + '\n';
    i++;
    continue;
  }
  
  if (line.includes('/* ===== RESPONSIVE ===== */')) {
    break; // We handle responsive manually below
  }

  // Footer section continues until ANIMATIONS
  if (line.includes('/* ===== ANIMATIONS ===== */')) {
    currentSection = 'global';
  }

  sections[currentSection] += line + '\n';
  i++;
}

// Now let's handle the media queries
// We'll just read them as string blocks and append them to the correct sections manually since they are small
const media1024 = `
@media (max-width: 1024px) {
  .hero-title { font-size: 3rem; }
  .hero .container { flex-direction: column; }
  .hero-image { max-width: 360px; }

  .motion-section .container { flex-direction: column; }
  .landing-section .container { flex-direction: column; }
  .branding-section .container { flex-direction: column; }
  
  .about-section .container { flex-direction: column; }
  .about-stats { grid-template-columns: repeat(2, 1fr); width: 100%; }

  .process-steps { grid-template-columns: repeat(2, 1fr); }

  .footer-cta .container { flex-direction: column; text-align: center; }
  .footer-cta-right { align-items: center; }
  .footer-cta-right p { text-align: center; }
}
`;

const media768 = `
@media (max-width: 768px) {
  .container { padding: 0 20px; }

  .header-nav { display: none; }

  .hero-title { font-size: 2.4rem; }

  .motion-content h2 { font-size: 2rem; }
  .motion-features { grid-template-columns: 1fr; }

  .landing-content h2 { font-size: 2rem; }

  .branding-content h2 { font-size: 2rem; }
  .branding-features { grid-template-columns: 1fr; }
  .branding-images { flex-direction: column; }
  .branding-img-main, .branding-img-side { width: 100%; height: 240px; }

  .about-section .container { gap: 40px; }
  .about-stats { grid-template-columns: repeat(2, 1fr); }

  .process-steps { grid-template-columns: 1fr; }

  .projects-header { flex-direction: column; align-items: flex-start; gap: 16px; }

  .footer-cta h2 { font-size: 1.6rem; }
}
`;

// Append media queries to the correct sections
sections.global += `\n@media (max-width: 768px) {\n  .container { padding: 0 20px; }\n}\n`;

sections.header += `\n@media (max-width: 768px) {\n  .header-nav { display: none; }\n}\n`;

sections.hero += `\n@media (max-width: 1024px) {
  .hero-title { font-size: 3rem; }
  .hero .container { flex-direction: column; }
  .hero-image { max-width: 360px; }
}
@media (max-width: 768px) {
  .hero-title { font-size: 2.4rem; }
}\n`;

sections.motion += `\n@media (max-width: 1024px) {
  .motion-section .container { flex-direction: column; }
}
@media (max-width: 768px) {
  .motion-content h2 { font-size: 2rem; }
  .motion-features { grid-template-columns: 1fr; }
}\n`;

sections.landingPages += `\n@media (max-width: 1024px) {
  .landing-section .container { flex-direction: column; }
}
@media (max-width: 768px) {
  .landing-content h2 { font-size: 2rem; }
}\n`;

sections.branding += `\n@media (max-width: 1024px) {
  .branding-section .container { flex-direction: column; }
}
@media (max-width: 768px) {
  .branding-content h2 { font-size: 2rem; }
  .branding-features { grid-template-columns: 1fr; }
  .branding-images { flex-direction: column; }
  .branding-img-main, .branding-img-side { width: 100%; height: 240px; }
}\n`;

sections.about += `\n@media (max-width: 1024px) {
  .about-section .container { flex-direction: column; }
  .about-stats { grid-template-columns: repeat(2, 1fr); width: 100%; }
}
@media (max-width: 768px) {
  .about-section .container { gap: 40px; }
  .about-stats { grid-template-columns: repeat(2, 1fr); }
}\n`;

sections.process += `\n@media (max-width: 1024px) {
  .process-steps { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .process-steps { grid-template-columns: 1fr; }
}\n`;

sections.projects += `\n@media (max-width: 768px) {
  .projects-header { flex-direction: column; align-items: flex-start; gap: 16px; }
}\n`;

sections.footer += `\n@media (max-width: 1024px) {
  .footer-cta .container { flex-direction: column; text-align: center; }
  .footer-cta-right { align-items: center; }
  .footer-cta-right p { text-align: center; }
}
@media (max-width: 768px) {
  .footer-cta h2 { font-size: 1.6rem; }
}\n`;

// Write the files
const writeCss = (file, content) => {
  // Ensure the directory exists
  const dir = path.dirname(file);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(file, content.trim() + '\n', 'utf-8');
};

writeCss('src/index.css', sections.global);
writeCss('src/features/header/header.css', sections.header);
writeCss('src/features/hero/hero.css', sections.hero);
writeCss('src/shared/components/sectionDivider.css', sections.sectionDivider);
writeCss('src/features/motion/motion.css', sections.motion);
writeCss('src/features/landingPages/landingPages.css', sections.landingPages);
writeCss('src/features/branding/branding.css', sections.branding);
writeCss('src/features/about/about.css', sections.about);
writeCss('src/features/process/process.css', sections.process);
writeCss('src/features/projects/projects.css', sections.projects);
writeCss('src/features/footer/footer.css', sections.footer);

console.log('CSS separated successfully!');
