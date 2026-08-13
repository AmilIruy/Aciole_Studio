import './header.css';
import './mobileMenu.css';
// SVG moved to `public/aciole9.svg` — use public root path instead of importing
import { MobileMenu } from './MobileMenu.js';

export function Header() {
  return `
    ${MobileMenu()}

    <header class="header" id="header">
      <div class="container">
        <a href="#" class="header-logo" id="header-logo">
          <img src="/aciole9.svg" alt="Aciole Studio" fetchpriority="high" width="296" height="275" />
        </a>

        <nav class="header-nav" id="header-nav">
          <a href="#hero">Início</a>
          <a href="#motion-cards">Motion</a>
          <a href="#process-section">Serviços</a>
          <a href="#about-section">Sobre</a>
          <a href="#footer-cta">Contato</a>
        </nav>

        <div class="header-right">
          <div class="header-socials" id="header-socials">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
          </div>
          <a href="#footer-cta" class="header-cta" id="header-cta-btn">Contato</a>
        </div>

        <!-- Hamburger — visível apenas em mobile -->
        <button
          class="hamburger"
          id="hamburger-btn"
          aria-label="Abrir menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </header>
  `;
}
