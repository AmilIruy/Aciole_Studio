import './motion.css';

// Assets importados para que o Vite resolva os caminhos corretamente
import motionVideo from '../../assets/aviao.mp4?url';
import motionThumb from '../../assets/motion_thumb.webp';

export function MotionSection() {
  return `
    <div id="motion-experience">

      <!-- ─── 1. BLOCO TÍTULO ─────────────────────────────────────────────── -->
      <section id="motion-title-block" aria-label="Motion Design">
        <!-- Texto gigante -->
        <p class="motion-section-label">01 — AUDIOVISUAL</p>

        <!-- Container do Vídeo e da Máscara (branco por cima que vai sumindo) -->
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

      <!-- ─── 2. CARDS DE PROJETOS ──────────────────────────────────────────── -->
      <section id="motion-cards" aria-label="Projetos de Motion Design">

        <!-- Card 1 — Logo Animado — horizontal médio, vídeo esq / texto dir -->
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
                  <li>Logo Animation</li>
                  <li>VFX</li>
                  <li>Composição</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Card 2 — Animação Comercial — vertical (Reels), texto esq / vídeo dir -->
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
                  <li>VFX</li>
                  <li>Motion</li>
                  <li>Edição</li>
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

        <!-- Card 3 — Tutorial Animado — horizontal grande (YouTube), vídeo esq / texto dir -->
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
            <span class="motion-card__tag">Conteúdo Educativo</span>
            <h2 class="motion-card__title">
              <span class="motion-card__line">Conhecimento</span>
              <span class="motion-card__line">entregue com</span>
              <span class="motion-card__line"><em>clareza.</em></span>
            </h2>
            <div class="motion-card__body">
              <span class="motion-card__line">Vídeos educativos, histórias e conteúdos</span>
              <span class="motion-card__line">de curiosidades que transformam</span>
              <span class="motion-card__line">informação em narrativas visuais</span>
              <span class="motion-card__line">fáceis de entender e interessantes de assistir.</span>
              <div class="motion-card__line motion-card__includes">
                <ul class="motion-includes-list">
                  <li>História</li>
                  <li>Curiosidades</li>
                  <li>Videoaulas</li>
                  <li>Motion</li>
                </ul>
              </div>
            </div>
            <a href="#projects-section" class="btn-primary motion-card__button">
              Ver Mais Projetos <span class="arrow">→</span>
            </a>
          </div>
        </div>

      </section>
      <!-- / motion-cards -->

    </div>
    <!-- / motion-experience -->
  `;
}
