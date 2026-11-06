
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

// ---------------------------------------------------------------------------
// safePlay / safePause — only used by card videos, NOT by the scrub video.
// The scrub bg-video must NEVER be played via play(); its currentTime is
// driven exclusively by applySeek() so the browser never fights over frames.
// ---------------------------------------------------------------------------
function safePlay(video) {
  if (!video || video.paused === false) return;
  video.play().catch(() => { });
}

function safePause(video) {
  if (!video || video.paused) return;
  video.pause();
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

  // -------------------------------------------------------------------------
  // FIX 1 — Keep the scrub video permanently paused.
  // Calling play() while scrub drives currentTime causes the browser to run
  // two independent decode pipelines (playback + seek), which produces the
  // visible flickering. We set currentTime directly; no play() is needed.
  // -------------------------------------------------------------------------
  bgVideo.pause();
  const pauseScrubVideo = () => bgVideo.pause();
  bgVideo.addEventListener('play', pauseScrubVideo);

  let videoDuration = 0;
  let seekRafId = null;
  let seekTimeoutId = null;
  let pendingSeekTime = null;
  let seekInProgress = false;
  let recoveringSeek = false;
  let disposed = false;
  const seekTolerance = 0.016;
  const seekTimeout = 2000;
  const performanceMetrics = {
    intervalStartedAt: performance.now(),
    interval: {},
    totals: {
      scrollUpdates: 0,
      seekRequests: 0,
      seeksStarted: 0,
      seekedEvents: 0,
      seeksCompleted: 0,
      requestsDuringSeek: 0,
      timestampsReplaced: 0,
      seekAttemptsReplaced: 0,
      timeoutCallbacks: 0,
      timeoutRecoveries: 0,
      timeoutFoundIdle: 0,
      recoveryAttempts: 0,
      recoveryFailures: 0,
      seekErrors: 0,
      frameCallbacks: 0,
      framesBetweenObservedCallbacks: 0,
      longScrollGaps: 0,
    },
    seekDurations: [],
    lastScrollUpdateAt: null,
    lastScrollProgress: null,
    lastPresentedFrames: null,
  };
  let performanceReportId = null;
  let activeSeekStartedAt = null;
  let videoFrameCallbackId = null;
  const longScrollGapThreshold = 100;
  const maxSeekDurationSamples = 500;

  const createPerformanceInterval = () => ({
    scrollUpdates: 0,
    progressMin: Infinity,
    progressMax: -Infinity,
    progressVariation: 0,
    maxProgressDelta: 0,
    longScrollGaps: 0,
    maxScrollGapMs: 0,
    seekRequests: 0,
    seeksStarted: 0,
    seekedEvents: 0,
    seeksCompleted: 0,
    requestsDuringSeek: 0,
    timestampsReplaced: 0,
    seekAttemptsReplaced: 0,
    timeoutCallbacks: 0,
    timeoutRecoveries: 0,
    timeoutFoundIdle: 0,
    recoveryAttempts: 0,
    recoveryFailures: 0,
    seekErrors: 0,
    frameCallbacks: 0,
    framesBetweenObservedCallbacks: 0,
    maxPresentationLagMs: 0,
    decoderProcessingDurationsMs: [],
  });
  performanceMetrics.interval = createPerformanceInterval();

  const recordMetric = (name, amount = 1) => {
    performanceMetrics.interval[name] += amount;
    performanceMetrics.totals[name] += amount;
    schedulePerformanceReport();
  };

  const summarizeSamples = (samples) => {
    if (!samples.length) return null;
    const sorted = [...samples].sort((a, b) => a - b);
    const sum = sorted.reduce((total, sample) => total + sample, 0);
    return {
      count: sorted.length,
      average: sum / sorted.length,
      min: sorted[0],
      max: sorted[sorted.length - 1],
      p95: sorted[Math.ceil(sorted.length * 0.95) - 1],
    };
  };

  const emitPerformanceReport = (final = false) => {
    const now = performance.now();
    const intervalSeconds = Math.max((now - performanceMetrics.intervalStartedAt) / 1000, 0.001);
    const interval = performanceMetrics.interval;
    const progressRange = Number.isFinite(interval.progressMin)
      ? [interval.progressMin, interval.progressMax]
      : null;
    const report = {
      final,
      intervalSeconds,
      scrollTrigger: {
        updates: interval.scrollUpdates,
        updatesPerSecond: interval.scrollUpdates / intervalSeconds,
        progressRange,
        totalProgressVariation: interval.progressVariation,
        maxProgressDelta: interval.maxProgressDelta,
        gapsOver100ms: interval.longScrollGaps,
        maxGapMs: interval.maxScrollGapMs,
      },
      seeks: {
        requests: interval.seekRequests,
        started: interval.seeksStarted,
        startedPerSecond: interval.seeksStarted / intervalSeconds,
        seekedEvents: interval.seekedEvents,
        completed: interval.seeksCompleted,
        completedPerSecond: interval.seeksCompleted / intervalSeconds,
        requestsDuringSeek: interval.requestsDuringSeek,
        timestampsReplaced: interval.timestampsReplaced,
        attemptsReplacedByRecovery: interval.seekAttemptsReplaced,
        completionLatencyMsRecent500: summarizeSamples(performanceMetrics.seekDurations),
      },
      recovery: {
        timeoutCallbacks: interval.timeoutCallbacks,
        timeoutRecoveries: interval.timeoutRecoveries,
        timeoutsFoundIdle: interval.timeoutFoundIdle,
        recoveryAttempts: interval.recoveryAttempts,
        recoveryFailures: interval.recoveryFailures,
        seekErrors: interval.seekErrors,
      },
      presentation: {
        requestVideoFrameCallbackAvailable: typeof bgVideo.requestVideoFrameCallback === 'function',
        frameCallbacks: interval.frameCallbacks,
        frameCallbacksPerSecond: interval.frameCallbacks / intervalSeconds,
        framesBetweenObservedCallbacks: interval.framesBetweenObservedCallbacks,
        maxLagFromRequestedTimestampMs: interval.maxPresentationLagMs,
        decoderProcessingDurationMs: summarizeSamples(interval.decoderProcessingDurationsMs),
      },
      totals: { ...performanceMetrics.totals },
    };
    console.info('[Motion performance]', report);
    performanceMetrics.interval = createPerformanceInterval();
    performanceMetrics.intervalStartedAt = now;
  };

  function schedulePerformanceReport() {
    if (disposed || performanceReportId !== null) return;
    performanceReportId = setTimeout(() => {
      performanceReportId = null;
      emitPerformanceReport();
    }, 1000);
  }

  const onScrollUpdate = (progress) => {
    const now = performance.now();
    const interval = performanceMetrics.interval;
    recordMetric('scrollUpdates');
    interval.progressMin = Math.min(interval.progressMin, progress);
    interval.progressMax = Math.max(interval.progressMax, progress);
    if (performanceMetrics.lastScrollUpdateAt !== null) {
      const gap = now - performanceMetrics.lastScrollUpdateAt;
      interval.maxScrollGapMs = Math.max(interval.maxScrollGapMs, gap);
      if (gap > longScrollGapThreshold) {
        recordMetric('longScrollGaps');
      }
    }
    if (performanceMetrics.lastScrollProgress !== null) {
      const delta = Math.abs(progress - performanceMetrics.lastScrollProgress);
      interval.progressVariation += delta;
      interval.maxProgressDelta = Math.max(interval.maxProgressDelta, delta);
    }
    performanceMetrics.lastScrollUpdateAt = now;
    performanceMetrics.lastScrollProgress = progress;
  };

  const recordSeekStart = () => {
    if (activeSeekStartedAt !== null) recordMetric('seekAttemptsReplaced');
    activeSeekStartedAt = performance.now();
    recordMetric('seeksStarted');
  };

  const onVideoFrame = (_now, metadata) => {
    videoFrameCallbackId = null;
    if (disposed) return;
    recordMetric('frameCallbacks');
    const interval = performanceMetrics.interval;
    if (performanceMetrics.lastPresentedFrames !== null
      && metadata.presentedFrames > performanceMetrics.lastPresentedFrames + 1) {
      const missedCallbacks = metadata.presentedFrames - performanceMetrics.lastPresentedFrames - 1;
      recordMetric('framesBetweenObservedCallbacks', missedCallbacks);
    }
    performanceMetrics.lastPresentedFrames = metadata.presentedFrames;
    const desiredTime = pendingSeekTime ?? bgVideo.currentTime;
    interval.maxPresentationLagMs = Math.max(
      interval.maxPresentationLagMs,
      Math.abs(metadata.mediaTime - desiredTime) * 1000,
    );
    if (typeof metadata.processingDuration === 'number') {
      interval.decoderProcessingDurationsMs.push(metadata.processingDuration * 1000);
    }
    videoFrameCallbackId = bgVideo.requestVideoFrameCallback(onVideoFrame);
  };

  const clearSeekTimeout = () => {
    if (seekTimeoutId !== null) {
      clearTimeout(seekTimeoutId);
      seekTimeoutId = null;
    }
  };

  const disposeSeek = () => {
    if (disposed) return;
    disposed = true;
    if (seekRafId !== null) cancelAnimationFrame(seekRafId);
    seekRafId = null;
    if (performanceReportId !== null) clearTimeout(performanceReportId);
    performanceReportId = null;
    if (videoFrameCallbackId !== null && typeof bgVideo.cancelVideoFrameCallback === 'function') {
      bgVideo.cancelVideoFrameCallback(videoFrameCallbackId);
    }
    videoFrameCallbackId = null;
    clearSeekTimeout();
    pendingSeekTime = null;
    seekInProgress = false;
    bgVideo.removeEventListener('play', pauseScrubVideo);
    bgVideo.removeEventListener('loadedmetadata', initVideoScrub);
    bgVideo.removeEventListener('seeked', onSeeked);
    bgVideo.removeEventListener('error', onSeekError);
    emitPerformanceReport(true);
  };

  const scheduleSeek = (replaceStalledSeek = false) => {
    if (disposed || seekInProgress || pendingSeekTime === null || seekRafId !== null) return;
    seekRafId = requestAnimationFrame(() => {
      seekRafId = null;
      if (disposed || seekInProgress || pendingSeekTime === null) return;

      if (bgVideo.seeking && !replaceStalledSeek) {
        seekInProgress = true;
        if (activeSeekStartedAt === null) recordSeekStart();
        startSeekTimeout();
        return;
      }

      const targetTime = pendingSeekTime;
      if (!bgVideo.seeking && Math.abs(bgVideo.currentTime - targetTime) < seekTolerance) {
        pendingSeekTime = null;
        recoveringSeek = false;
        return;
      }

      seekInProgress = true;
      try {
        recordSeekStart();
        bgVideo.currentTime = targetTime;
      } catch (error) {
        seekInProgress = false;
        activeSeekStartedAt = null;
        pendingSeekTime = null;
        recoveringSeek = false;
        recordMetric('seekErrors');
        console.error('Falha ao buscar quadro do vídeo Motion:', error);
        return;
      }
      startSeekTimeout();
    });
  };

  const finishSeek = () => {
    clearSeekTimeout();
    seekInProgress = false;
    if (disposed || pendingSeekTime === null) return;

    if (Math.abs(bgVideo.currentTime - pendingSeekTime) < seekTolerance) {
      pendingSeekTime = null;
      recoveringSeek = false;
      return;
    }
    scheduleSeek();
  };

  function startSeekTimeout() {
    clearSeekTimeout();
    seekTimeoutId = setTimeout(() => {
      seekTimeoutId = null;
      if (disposed || !seekInProgress) return;
      recordMetric('timeoutCallbacks');

      if (!bgVideo.seeking) {
        recordMetric('timeoutFoundIdle');
        finishSeek();
        return;
      }

      if (recoveringSeek) {
        recordMetric('recoveryFailures');
        console.error('A busca do vídeo Motion não foi concluída após a tentativa de recuperação.');
        seekInProgress = false;
        activeSeekStartedAt = null;
        pendingSeekTime = null;
        recoveringSeek = false;
        return;
      }

      recordMetric('timeoutRecoveries');
      recordMetric('recoveryAttempts');
      console.warn('A busca do vídeo Motion excedeu o tempo limite; priorizando a posição mais recente.');
      seekInProgress = false;
      recoveringSeek = true;
      scheduleSeek(true);
    }, seekTimeout);
  }

  function onSeeked() {
    if (bgVideo.seeking) return;
    recordMetric('seekedEvents');
    if (activeSeekStartedAt !== null) {
      const duration = performance.now() - activeSeekStartedAt;
      performanceMetrics.seekDurations.push(duration);
      if (performanceMetrics.seekDurations.length > maxSeekDurationSamples) {
        performanceMetrics.seekDurations.shift();
      }
      activeSeekStartedAt = null;
      recordMetric('seeksCompleted');
    }
    finishSeek();
  }

  function onSeekError() {
    clearSeekTimeout();
    seekInProgress = false;
    activeSeekStartedAt = null;
    pendingSeekTime = null;
    recoveringSeek = false;
    recordMetric('seekErrors');
    if (bgVideo.error) {
      console.error('Erro ao buscar quadro do vídeo Motion:', bgVideo.error);
    }
  }

  function applySeek(progress) {
    if (disposed || !videoDuration) return;
    const normalizedProgress = Math.min(Math.max(progress, 0), 1);
    const requestedTime = normalizedProgress * videoDuration;
    const previousPendingSeekTime = pendingSeekTime;
    recordMetric('seekRequests');
    if (seekInProgress || bgVideo.seeking) {
      recordMetric('requestsDuringSeek');
    }
    if (previousPendingSeekTime !== null && previousPendingSeekTime !== requestedTime) {
      recordMetric('timestampsReplaced');
    }
    pendingSeekTime = requestedTime;
    if (!seekInProgress && !bgVideo.seeking
      && Math.abs(bgVideo.currentTime - pendingSeekTime) < seekTolerance) {
      pendingSeekTime = null;
      return;
    }
    scheduleSeek();
  }

  function initVideoScrub() {
    videoDuration = bgVideo.duration || 0;
  }

  bgVideo.addEventListener('seeked', onSeeked);
  bgVideo.addEventListener('error', onSeekError);
  if (typeof bgVideo.requestVideoFrameCallback === 'function') {
    videoFrameCallbackId = bgVideo.requestVideoFrameCallback(onVideoFrame);
  }

  if (bgVideo.readyState >= 1) {
    initVideoScrub();
  } else {
    bgVideo.addEventListener('loadedmetadata', initVideoScrub, { once: true });
  }

  const isMobile = window.innerWidth <= 768;

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
      onKill: disposeSeek,
      onUpdate(self) {
        onScrollUpdate(self.progress);
        applySeek(self.progress);
      },
    },
    onInterrupt: disposeSeek,
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
      { opacity: 0},
      { opacity: 0.8, duration: 0.5, ease: 'power2.out' },
      0.1
    )
    .to(overlay, { opacity: 0.15, duration: 0.5 }, 0.1)
    .to(bgVideo, { opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.7)
    .to(overlay, { opacity: 0.72, duration: 0.3 }, 0.7);

  // FIX 1 — setupVideoPlaybackTrigger() call removed.
  // Playing the scrub video via play() while scrub controls currentTime
  // causes the browser to maintain two concurrent decode pipelines,
  // producing the frame-skip / flicker artifact described in the bug report.
}

function animateMotionCards() {
  const cards = document.querySelectorAll('.motion-card');
  const isMobile = window.innerWidth <= 768;
  const cardStart = isMobile ? 'top 92%' : 'top 82%';

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

  const isMobile = window.innerWidth <= 768;

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
