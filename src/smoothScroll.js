const ease = 0.08;
let currentScroll = window.scrollY;
let targetScroll = currentScroll;
let isAnimating = false;

const clamp = (value) => Math.max(0, Math.min(value, document.documentElement.scrollHeight - window.innerHeight));

const animateScroll = () => {
  currentScroll += (targetScroll - currentScroll) * ease;

  if (Math.abs(targetScroll - currentScroll) < 0.5) {
    currentScroll = targetScroll;
  }

  window.scrollTo(0, currentScroll);

  if (Math.abs(targetScroll - currentScroll) > 0.5) {
    requestAnimationFrame(animateScroll);
  } else {
    isAnimating = false;
  }
};

const scrollToTarget = (value) => {
  targetScroll = clamp(value);

  if (!isAnimating) {
    isAnimating = true;
    requestAnimationFrame(animateScroll);
  }
};

const getAnchorTarget = (href) => {
  const id = href.split('#')[1];
  return id ? document.getElementById(id) : null;
};

export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  document.documentElement.style.scrollBehavior = 'auto';

  window.addEventListener(
    'wheel',
    (event) => {
      if (Math.abs(event.deltaY) < 0.5) {
        return;
      }

      event.preventDefault();
      scrollToTarget(targetScroll + event.deltaY);
    },
    { passive: false }
  );

  window.addEventListener('scroll', () => {
    if (!isAnimating) {
      currentScroll = targetScroll = window.scrollY;
    }
  });

  window.addEventListener('resize', () => {
    targetScroll = clamp(targetScroll);
    currentScroll = clamp(currentScroll);
  });

  document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) {
      return;
    }

    const target = getAnchorTarget(anchor.getAttribute('href'));
    if (!target) {
      return;
    }

    event.preventDefault();
    scrollToTarget(window.scrollY + target.getBoundingClientRect().top);
    history.pushState(null, '', anchor.getAttribute('href'));
  });
}
