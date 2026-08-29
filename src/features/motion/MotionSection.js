import './motion.css';


import motionVideo from '../../assets/aviao.mp4?url';
import motionThumb from '../../assets/motion_thumb.webp';

export function MotionSection() {
  return `
    <div id="motion-experience">

      <section id="motion-title-block" aria-label="Motion Design">
        <p class="motion-section-label">01 — AUDIOVISUAL</p>

        <div class="motion-title-video-bg" id="motion-zoom-mask" aria-hidden="true">
          <div class="motion-white-overlay" id="motion-white-overlay"></div>
          <video
            id="motion-bg-video"
            src="${motionVideo}"
            muted
            playsinline
            loop
            preload="metadata"
          ></video>
          <div class="motion-title-video-overlay"></div>
        </div>

        <div class="motion-zoom-flash" id="motion-zoom-flash"></div>
      </section>

      <section id="motion-cards" aria-label="Projetos de Motion Design">

        <div class="motion-card motion-card--horizontal-md" id="motion-card-1">
          <div class="motion-card__video-wrap">
            <img class="motion-card__thumbnail" src="${motionThumb}" alt="Thumbnail do Projeto" loading="lazy" />
            <button class="motion-play-btn" aria-label="Reproduzir vídeo">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
            <video
              class="motion-card__video"
              data-video="${motionVideo}"
              muted
              playsinline
              loop
              preload="none"
            ></video>
            <div class="motion-card__video-overlay"></div>
          </div>
          <div class="motion-card__desc motion-card__desc--right">
            <span class="motion-card__tag">Animação &amp; VFX</span>
            <h2 class="motion-card__title">
              <span class="motion-card__line">IDEIAS QUE</span>
              <span class="motion-card__line">GANHAM</span>
              <span class="motion-card__line"><em>MOVIMENTO.</em></span>
            </h2>
            <div class="motion-card__body">
              <span class="motion-card__line">Animações, motion graphics e efeitos</span>
              <span class="motion-card__line">visuais que transformam conceitos,</span>
              <span class="motion-card__line">produtos e identidades em experiências</span>
              <span class="motion-card__line">que chamam atenção.</span>
              <div class="motion-card__line motion-card__includes">
                <ul class="motion-includes-list">
                  <li>Motion Graphics</li>
                  <li>Animação Comercial</li>
                  <li>VFX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="motion-card motion-card--vertical" id="motion-card-2">
          <div class="motion-card__desc motion-card__desc--left">
            <span class="motion-card__tag">Conteúdo para Redes</span>
            <h2 class="motion-card__title">
              <span class="motion-card__line">CONTEÚDO</span>
              <span class="motion-card__line">QUE PARA</span>
              <span class="motion-card__line">O <em>SCROLL.</em></span>
            </h2>
            <div class="motion-card__body">
              <span class="motion-card__line">Vídeos e animações pensados para</span>
              <span class="motion-card__line">redes sociais, combinando edição,</span>
              <span class="motion-card__line">ritmo, motion e efeitos visuais para</span>
              <span class="motion-card__line">prender a atenção desde o primeiro frame.</span>
              <div class="motion-card__line motion-card__includes">
                <ul class="motion-includes-list">
                  <li>Reels</li>
                  <li>Vídeos Comerciais</li>
                  <li>Edição de Vídeos Para Instagram</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="motion-card__video-wrap">
            <img class="motion-card__thumbnail" src="${motionThumb}" alt="Thumbnail do Projeto" loading="lazy" />
            <button class="motion-play-btn" aria-label="Reproduzir vídeo">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
            <video
              class="motion-card__video"
              data-video="${motionVideo}"
              muted
              playsinline
              loop
              preload="none"
            ></video>
            <div class="motion-card__video-overlay"></div>
          </div>
        </div>

        <div class="motion-card motion-card--horizontal-lg" id="motion-card-3">
          <div class="motion-card__video-wrap">
            <img class="motion-card__thumbnail" src="${motionThumb}" alt="Thumbnail do Projeto" loading="lazy" />
            <button class="motion-play-btn" aria-label="Reproduzir vídeo">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </button>
            <video
              class="motion-card__video"
              data-video="${motionVideo}"
              muted
              playsinline
              loop
              preload="none"
            ></video>
            <div class="motion-card__video-overlay"></div>
          </div>
          <div class="motion-card__desc motion-card__desc--right">
            <span class="motion-card__tag">CONTEÚDO PARA YOUTUBE</span>
            <h2 class="motion-card__title">
              <span class="motion-card__line">Vídeos que</span>
              <span class="motion-card__line">Prendem do</span>
              <span class="motion-card__line"><em>Inicio ao fim.</em></span>
            </h2>
            <div class="motion-card__body">
              <span class="motion-card__line">Da edição ao acabamento final,</span>
              <span class="motion-card__line">transformamos gravações em vídeos</span>
              <span class="motion-card__line">envolventes e profissionais para YouTube.</span>
              <span class="motion-card__line">Utilizamos edição dinâmica, motion graphics,</span>
                            <span class="motion-card__line">efeitos visuais, sound design e storytelling.</span>
              <div class="motion-card__line motion-card__includes">
                <ul class="motion-includes-list">
                  <li>Storytelling</li>
                  <li>Vídeos longos</li>
                  <li>Shorts</li>
                  <li>Edição de Vídeo Para o Youtube</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </section>

    </div>
  `;
}
