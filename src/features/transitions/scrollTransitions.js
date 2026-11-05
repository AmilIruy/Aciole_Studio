import './scrollTransitions.css';

export function ScrollTransition(id, videoSrc) {
	return `
		<div class="st-transition" id="${id}" data-video-src="${videoSrc}" aria-hidden="true">
			<video class="st-transition__video" id="${id}-video" muted playsinline preload="none"></video>
			<div class="st-transition__scrim"></div>
		</div>
	`;
}

export function initScrollVideoTransition({
	id,
	videoSrc,
	gsap,
	startTriggerSelector,
	endTriggerSelector,
	mobileStartTriggerSelector,
	mobileEndTriggerSelector,
	prevBgLayerSelector,
	nextBgLayerSelector,
	startPos = 'top 75%',
	endPos = 'top 65%',
	strictVisibility = false,
	prevFadeStart = 0,
	prevFadeDuration = 0.28,
	nextFadeStart = 0.72,
	nextFadeDuration = 0.28,
}) {
	const container = document.getElementById(id);
	const video = document.getElementById(`${id}-video`);
	const isMobile = window.matchMedia('(max-width: 768px)').matches;
	const resolvedStartSelector = isMobile && mobileStartTriggerSelector
		? mobileStartTriggerSelector
		: startTriggerSelector;
	const resolvedEndSelector = isMobile && mobileEndTriggerSelector
		? mobileEndTriggerSelector
		: endTriggerSelector;
	const startElements = document.querySelectorAll(resolvedStartSelector);
	const startEl = startElements[startElements.length - 1];
	const endEl = document.querySelector(resolvedEndSelector);

	if (!container || !video || !startEl || !endEl) return;

	let resolvedEnd = endEl;
	if (resolvedEnd.offsetHeight === 0 && resolvedEndSelector.includes('about-media-label')) {
		resolvedEnd = document.querySelector('.about-image-frame, .about-media') || resolvedEnd;
	}

	const prevBg = document.querySelector(prevBgLayerSelector);
	const nextBg = document.querySelector(nextBgLayerSelector);
	let videoDuration = 0;
	let seekPending = false;
	let pendingProgress = null;
	let videoLoaded = false;
	let scrollTrigger = null;

	const loadVideo = () => {
		if (videoLoaded) return;
		videoLoaded = true;
		video.src = videoSrc;
		video.load();
	};

	const applySeek = (progress) => {
		if (!videoDuration) return;
		const targetTime = Math.min(Math.max(progress * videoDuration, 0), videoDuration);
		if (Math.abs(video.currentTime - targetTime) < 0.016) return;
		if (seekPending) {
			pendingProgress = progress;
			return;
		}
		seekPending = true;
		video.currentTime = targetTime;
	};

	video.addEventListener('seeked', () => {
		seekPending = false;
		if (pendingProgress !== null) {
			const progress = pendingProgress;
			pendingProgress = null;
			applySeek(progress);
		}
	});

	const onMetadata = () => {
		videoDuration = video.duration || 0;
		if (scrollTrigger?.progress > 0) applySeek(scrollTrigger.progress);
	};

	if (video.readyState >= 1) {
		onMetadata();
	} else {
		video.addEventListener('loadedmetadata', onMetadata, { once: true });
	}

	const loadObserver = new IntersectionObserver((entries) => {
		if (entries[0].isIntersecting) {
			loadVideo();
			loadObserver.disconnect();
		}
	}, { rootMargin: '600px' });
	loadObserver.observe(startEl);

	if (strictVisibility) {
		container.classList.add('st-transition--strict');
		gsap.set(container, { autoAlpha: 0 });
	}

	if (prevBg) gsap.set(prevBg, { opacity: 1 });
	if (nextBg) gsap.set(nextBg, { opacity: 0 });

	const timeline = gsap.timeline({
		scrollTrigger: {
			trigger: startEl,
			start: startPos,
			endTrigger: resolvedEnd,
			end: endPos,
			scrub: true,
			invalidateOnRefresh: true,
			onToggle: (self) => {
				if (self.isActive) {
					loadVideo();
					if (strictVisibility) {
						gsap.set(container, { autoAlpha: 1 });
					} else {
						container.classList.add('active');
					}
				} else {
					if (strictVisibility) {
						gsap.set(container, { autoAlpha: 0 });
					} else {
						container.classList.remove('active');
					}
				}
			},
			onUpdate: (self) => applySeek(self.progress),
		},
	});

	scrollTrigger = timeline.scrollTrigger;

	if (prevBg) {
		timeline.to(prevBg, { opacity: 0, ease: 'power1.inOut', duration: prevFadeDuration }, prevFadeStart);
	}

	if (nextBg) {
		timeline.to(nextBg, { opacity: 1, ease: 'power1.inOut', duration: nextFadeDuration }, nextFadeStart);
	}

	return timeline;
}
