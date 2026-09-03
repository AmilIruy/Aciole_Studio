

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { connectLenisToGsap } from '../scroll/lenis.js';

gsap.registerPlugin(ScrollTrigger);

const MOTION_ANIMATION_CONFIG = {
  titleMaskSize: '2200vw',
  titleMaskSizeStart: '52.36vw',
  titleRevealDuration: 0.6,
  cardFadeDuration: 1,
  cardLineDuration: 0.7,
  cardLineStagger: 0.08,
};



function safePlay(video) {
  if (!video || video.paused === false) return;
  video.play().catch(() => {});
}

function safePause(video) {
  if (!video || video.paused) return;
  video.pause();
}

function setupVideoPlaybackTrigger(video, triggerElement, start, end) {
  if (!video || !triggerElement) return;

  ScrollTrigger.create({
    trigger: triggerElement,
    start,
    end,
    onEnter: () => safePlay(video),
    onLeave: () => safePause(video),
    onEnterBack: () => safePlay(video),
    onLeaveBack: () => safePause(video),
  });
}



let cachedMaskPosition = null;
let resizeTimer = null;

function calculateMaskPosition() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const maskMultiplier = parseFloat(MOTION_ANIMATION_CONFIG.titleMaskSize) / 100;
  const iw = maskMultiplier * vw; 
  const ih = iw / (533.79 / 235.01);
  const fx = 235.94 / 533.79;
  const fy = 52.185 / 235.01;
  const x = (vw / 2 - iw * fx) / (vw - iw) * 100;
  const y = (vh / 2 - ih * fy) / (vh - ih) * 100;
  cachedMaskPosition = `${x}% ${y}%`;
}

window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    calculateMaskPosition();
  }, 150);
});

function getTargetMaskPosition() {
  if (!cachedMaskPosition) calculateMaskPosition();
  return cachedMaskPosition;
}

function animateMotionTitle() {
  const block = document.getElementById('motion-title-block');
  const mask = document.getElementById('motion-zoom-mask');
  const whiteOverlay = document.getElementById('motion-white-overlay');
  const bgVideo = document.getElementById('motion-bg-video');
  const overlay = block?.querySelector('.motion-title-video-overlay');
  const label = block?.querySelector('.motion-section-label');

  if (!block || !mask || !bgVideo) return;

  gsap.fromTo(
    mask,
    { y: 60, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: block,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    }
  );

  const titleTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: block,
      start: 'top top',
      end: '+=150%',
      pin: true,
      scrub: true,
      anticipatePin: 1,
    },
  });

  titleTimeline
    .fromTo(mask,
      {
        maskSize: MOTION_ANIMATION_CONFIG.titleMaskSizeStart,
        maskPosition: '50% 50%',
      },
      {
        maskSize: MOTION_ANIMATION_CONFIG.titleMaskSize,
        maskPosition: getTargetMaskPosition,
        duration: MOTION_ANIMATION_CONFIG.titleRevealDuration,
        ease: 'power2.in',
      }, 0)
    .to(whiteOverlay, {
      opacity: 0,
      duration: 0.4,
      ease: 'power1.out',
    }, 0.2)
    .to(label, { opacity: 0, y: -20, duration: 0.5 }, 0)
    .fromTo(
      bgVideo,
      { opacity: 0, scale: 1.06 },
      { opacity: 0.8, scale: 1, duration: 0.5, ease: 'power2.out' },
      0.1
    )
    .to(overlay, { opacity: 0.15, duration: 0.5 }, 0.1)
    .to(bgVideo, { opacity: 0, scale: 1.04, duration: 0.3, ease: 'power2.in' }, 0.7)
    .to(overlay, { opacity: 0.72, duration: 0.3 }, 0.7);

  setupVideoPlaybackTrigger(bgVideo, block, 'top top', '+=150%');
}

function animateMotionCards() {
  const cards = document.querySelectorAll('.motion-card');
  const isMobile = window.innerWidth <= 768;
  const cardStart = isMobile ? 'top 92%' : 'top 82%';
  const lineStart = isMobile ? 'top 90%' : 'top 75%';

  cards.forEach((card) => {
    const video = card.querySelector('.motion-card__video');
    const playBtn = card.querySelector('.motion-play-btn');
    const thumbnail = card.querySelector('.motion-card__thumbnail');
    const descRight = card.querySelector('.motion-card__desc--right');
    const lines = card.querySelectorAll('.motion-card__line');

    
    const cardTl = gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: cardStart,
        toggleActions: 'play none none reverse',
      }
    });

    cardTl.fromTo(
      card,
      { opacity: 0, y: 70 },
      {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.8 : MOTION_ANIMATION_CONFIG.cardFadeDuration,
        ease: 'power3.out',
      },
      0
    );

    if (lines.length) {
      const fromX = descRight ? 50 : -50;
      const delayOffset = isMobile ? 0.1 : 0.15;
      
      cardTl.fromTo(
        lines,
        { opacity: 0, x: fromX },
        {
          opacity: 1,
          x: 0,
          duration: isMobile ? 0.55 : MOTION_ANIMATION_CONFIG.cardLineDuration,
          ease: 'power3.out',
          stagger: isMobile ? 0.05 : MOTION_ANIMATION_CONFIG.cardLineStagger,
        },
        delayOffset
      );
    }

    if (playBtn && video) {
      playBtn.addEventListener('click', () => {
        document.querySelectorAll('.motion-card__video').forEach(v => {
          if (v !== video && (!v.paused || v.hasAttribute('src'))) {
            v.pause();
            v.removeAttribute('src'); 
            v.load();
            v.classList.remove('playing');
            
            const parent = v.closest('.motion-card__video-wrap');
            if (parent) {
              const otherBtn = parent.querySelector('.motion-play-btn');
              const otherThumb = parent.querySelector('.motion-card__thumbnail');
              if (otherBtn) otherBtn.classList.remove('hidden');
              if (otherThumb) otherThumb.classList.remove('hidden');
            }
          }
        });

        const dataVideo = video.getAttribute('data-video');
        if (!video.getAttribute('src') && dataVideo) {
          video.setAttribute('src', dataVideo);
          video.load();
        }

        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.then(() => {
            playBtn.classList.add('hidden');
            if (thumbnail) thumbnail.classList.add('hidden');
            video.classList.add('playing');
          }).catch(err => {
            console.error("Erro ao reproduzir o vídeo:", err);
          });
        }
      });
      
      video.addEventListener('click', () => {
        if (!video.paused) {
          video.pause();
          playBtn.classList.remove('hidden');
        }
      });
    }
  });
}

function animateCardsParallaxEntry() {
  const cardsSection = document.getElementById('motion-cards');
  if (!cardsSection) return;

  gsap.fromTo(
    cardsSection,
    { yPercent: 10 },
    {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: cardsSection,
        start: 'top bottom',
        end: 'top 20%',
        scrub: 1.2,
      },
    }
  );
}

let isMotionInitialized = false;

export function initMotion() {
  if (isMotionInitialized) return;
  isMotionInitialized = true;

  connectLenisToGsap(gsap, ScrollTrigger);
  
  animateMotionTitle();
  animateMotionCards();
  animateCardsParallaxEntry();
}
