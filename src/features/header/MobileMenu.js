import './mobileMenu.css';

export function MobileMenu() {
  return `
    <div class="mobile-menu-backdrop" id="mobile-menu-backdrop"></div>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu-nav" id="mobile-menu-nav">
        <a href="#hero" class="mobile-menu-link" data-menu-link>Início</a>
        <a href="#motion-cards" class="mobile-menu-link" data-menu-link>Motion</a>
        <a href="#process-section" class="mobile-menu-link" data-menu-link>Serviços</a>
        <a href="#about-section" class="mobile-menu-link" data-menu-link>Sobre</a>
        <a href="#footer-cta" class="mobile-menu-link" data-menu-link>Contato</a>
      </nav>

      <div class="mobile-menu-footer">
        <div class="mobile-menu-socials">
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="mobile-social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </svg>
            YouTube
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="mobile-social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
        </div>

        <a href="#footer-cta" class="mobile-menu-cta" data-menu-link>
          Solicitar Orçamento
        </a>
      </div>
    </div>
  `;
}

export function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const menu = document.getElementById('mobile-menu');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const menuLinks = document.querySelectorAll('[data-menu-link]');

  if (!hamburger || !menu || !backdrop) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    backdrop.classList.add('is-visible');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    backdrop.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
  }

  hamburger.addEventListener('click', () => {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });
}
