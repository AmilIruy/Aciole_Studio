import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { connectLenisToGsap } from '../scroll/lenis.js';
import './splitTransition.css';

gsap.registerPlugin(ScrollTrigger);

let isSplitInitialized = false;

export function initSplitTransition() {
  if (isSplitInitialized) return;
  isSplitInitialized = true;

  const processSection = document.getElementById('process-section');
  const aboutSection = document.getElementById('about-section');

  if (!processSection || !aboutSection) {
    console.warn('[splitTransition] Seções não encontradas no DOM.');
    return;
  }

  connectLenisToGsap(gsap, ScrollTrigger);

  const { wrapper, sliderA, sliderB } = buildSplitDOM(processSection, aboutSection);
  setupScrollTrigger(wrapper, sliderA, sliderB);
  requestAnimationFrame(() => ScrollTrigger.refresh());
}

function buildSplitDOM(processSection, aboutSection) {
  [processSection, aboutSection].forEach((section) => {
    section.classList.remove('animate-in', 'visible');
  });

  const wrapper = document.createElement('div');
  wrapper.id = 'split-transition-wrapper';

  const canvas = document.createElement('div');
  canvas.id = 'split-process-canvas';
  canvas.setAttribute('aria-hidden', 'true');

  const panelA = createPanel('a', [
    createContent(processSection, 'process'),
    createContent(aboutSection, 'about'),
  ]);
  const panelB = createPanel('b', [
    createContent(aboutSection, 'about'),
    createContent(processSection, 'process'),
  ]);

  canvas.append(panelA.panel, panelB.panel);
  processSection.parentNode.insertBefore(wrapper, processSection);

  const a11yContainer = document.createElement('div');
  a11yContainer.className = 'split-a11y-container';
  a11yContainer.append(processSection, aboutSection);

  wrapper.append(a11yContainer, canvas);

  return { wrapper, sliderA: panelA.slider, sliderB: panelB.slider };
}

function createPanel(name, contents) {
  const panel = document.createElement('div');
  panel.className = `split-panel split-panel--${name}`;

  const slider = document.createElement('div');
  slider.className = `split-slider split-slider--${name}`;
  slider.append(...contents);
  panel.appendChild(slider);

  return { panel, slider };
}

function createContent(sectionElement, type) {
  const container = document.createElement('div');
  container.className = `split-content split-content--${type}`;

  const clone = sectionElement.cloneNode(true);
  clone.removeAttribute('id');
  clone.querySelectorAll('[id]').forEach((element) => element.removeAttribute('id'));
  clone.classList.add('split-source', `split-source--${type}`);
  container.appendChild(clone);

  return container;
}

function createSplitTimeline(wrapper, sliderA, sliderB, axis) {
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: wrapper,
      start: 'top top',
      end: '+=125%',
      pin: true,
      pinSpacing: true,
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  timeline.to({}, { duration: 0.1 });

  if (axis === 'x') {
    timeline
      .fromTo(sliderA, { xPercent: 0 }, { xPercent: -50, ease: 'none', duration: 1.2 })
      .fromTo(sliderB, { xPercent: -50 }, { xPercent: 0, ease: 'none', duration: 1.2 }, '<');
  } else {
    timeline
      .fromTo(sliderA, { yPercent: 0 }, { yPercent: -50, ease: 'none', duration: 1.2 })
      .fromTo(sliderB, { yPercent: -50 }, { yPercent: 0, ease: 'none', duration: 1.2 }, '<');
  }

  return timeline;
}

function setupScrollTrigger(wrapper, sliderA, sliderB) {
  const media = gsap.matchMedia();

  media.add('(max-width: 768px)', () => createSplitTimeline(wrapper, sliderA, sliderB, 'x'));
  media.add('(min-width: 769px)', () => createSplitTimeline(wrapper, sliderA, sliderB, 'y'));
}
