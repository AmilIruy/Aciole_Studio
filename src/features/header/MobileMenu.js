import './mobileMenu.css';

export function MobileMenu() {
  return `
    <div class="mobile-menu-backdrop" id="mobile-menu-backdrop"></div>

    <div class="mobile-menu" id="mobile-menu" aria-hidden="true">
      <nav class="mobile-menu-nav" id="mobile-menu-nav">
        <a href="#hero" class="mobile-menu-link" data-menu-link>Início</a>
        <a href="#motion-cards" class="mobile-menu-link" data-menu-link>Vídeos</a>
        <a href="#landing-section" class="mobile-menu-link" data-menu-link>Landing Pages</a>
        <a href="#projects-section" class="mobile-menu-link" data-menu-link>Projetos</a>
        <a href="#process-section" class="mobile-menu-link" data-menu-link>Processos</a>
        <a href="#about-section" class="mobile-menu-link" data-menu-link>Sobre</a>
        <a href="#footer-cta" class="mobile-menu-link" data-menu-link>Contato</a>
      </nav>

      <div class="mobile-menu-footer">
        <div class="mobile-menu-socials">
          <a href="https://www.youtube.com/@locke0101" target="_blank" rel="noopener noreferrer" aria-label="YouTube" class="mobile-social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"/>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
            </svg>
            YouTube
          </a>
          <a href="https://www.instagram.com/yuri_aciole/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="mobile-social-link">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
        </div>

        <a href="https://wa.me/24999593389" target="_blank" rel="noopener noreferrer" class="mobile-menu-cta" data-menu-link>
          Contato
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16" aria-hidden="true">
            <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 1 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
          </svg>
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
  const focusableSelector = 'a, button, input, select, textarea, [tabindex]';

  if (!hamburger || !menu || !backdrop) return;

  function openMenu() {
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    
    setFocusable(menu, true);
    
    if ('inert' in HTMLElement.prototype) menu.inert = false;
    backdrop.classList.add('is-visible');
    document.body.classList.add('menu-open');
    
    const first = menu.querySelector(focusableSelector);
    if (first) first.focus();
  }

  function closeMenu() {
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    
    setFocusable(menu, false);
    if ('inert' in HTMLElement.prototype) menu.inert = true;
    backdrop.classList.remove('is-visible');
    document.body.classList.remove('menu-open');
    
    hamburger.focus();
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

  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  
  function setFocusable(container, enable) {
    const nodes = container.querySelectorAll(focusableSelector);
    nodes.forEach((el) => {
      if (enable) {
        
        if (el.hasAttribute('data-saved-tabindex')) {
          el.setAttribute('tabindex', el.getAttribute('data-saved-tabindex'));
          el.removeAttribute('data-saved-tabindex');
        } else {
          el.removeAttribute('tabindex');
        }
      } else {
        
        if (el.hasAttribute('tabindex')) {
          el.setAttribute('data-saved-tabindex', el.getAttribute('tabindex'));
        }
        el.setAttribute('tabindex', '-1');
      }
    });
  }

  
  if (menu && menu.getAttribute('aria-hidden') === 'true') {
    setFocusable(menu, false);
    if ('inert' in HTMLElement.prototype) menu.inert = true;
  }
}
