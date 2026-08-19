import Lenis from 'lenis';

let lenisInstance = null;
let rafId = null;

// Loop de animação independente executado antes do GSAP ser carregado
function raf(time) {
  if (lenisInstance) {
    lenisInstance.raf(time);
    rafId = requestAnimationFrame(raf);
  }
}

export function initLenis() {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    lerp: 0.1,
    smoothWheel: true,
    syncTouch: false,
  });

  // Inicia o loop de scroll suave imediatamente
  rafId = requestAnimationFrame(raf);

  return lenisInstance;
}

// Permite parar o loop nativo para passar o controle ao gsap.ticker
export function stopNativeRaf() {
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}
