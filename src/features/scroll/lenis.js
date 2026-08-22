import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

let lenisInstance = null;
let rafId = null;
let gsapBridgeInitialized = false;

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

export function connectLenisToGsap(gsap, ScrollTrigger) {
  const lenis = initLenis();
  if (gsapBridgeInitialized) return lenis;

  gsapBridgeInitialized = true;
  stopNativeRaf();

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  lenis.on('scroll', ScrollTrigger.update);

  return lenis;
}
