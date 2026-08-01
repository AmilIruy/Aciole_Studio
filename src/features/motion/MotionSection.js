import './motion.css';
import { initMotion } from './motionAnimations.js';

// Video asset importado para que o Vite resolva o caminho corretamente
import motionVideo from '../../assets/oziart43_-Zenitsu-Ori.webm?url';

export function MotionSection() {
  return `
    <div id="motion-experience">

      <!-- ─── 1. BLOCO TÍTULO ─────────────────────────────────────────────── -->
      <section id="motion-title-block" aria-label="Motion Design">
        <!-- Texto gigante -->
        <p class="motion-section-label">01 — MOTION DESIGN</p>

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
            <video
              class="motion-card__video"
              src="${motionVideo}"
              muted
              playsinline
              loop
              preload="metadata"
            ></video>
            <div class="motion-card__video-overlay"></div>
          </div>
          <div class="motion-card__desc motion-card__desc--right">
            <span class="motion-card__tag">Logo Animado</span>
            <h3 class="motion-card__title">
              <span class="motion-card__line">IDENTIDADE</span>
              <span class="motion-card__line">QUE <em>VIVE</em></span>
              <span class="motion-card__line">E RESPIRA.</span>
            </h3>
            <p class="motion-card__body">
              <span class="motion-card__line">Logos que transcendem o estático.</span>
              <span class="motion-card__line">Cada quadro carrega a essência</span>
              <span class="motion-card__line">da sua marca em movimento.</span>
            </p>
            <a href="#projects-section" class="btn-primary motion-card__button">
              Ver Mais Projetos <span class="arrow">→</span>
            </a>
          </div>
        </div>

        <!-- Card 2 — Animação Comercial — vertical (Reels), texto esq / vídeo dir -->
        <div class="motion-card motion-card--vertical" id="motion-card-2">
          <div class="motion-card__desc motion-card__desc--left">
            <span class="motion-card__tag">Animação Comercial</span>
            <h3 class="motion-card__title">
              <span class="motion-card__line">Conteúdo</span>
              <span class="motion-card__line">que para</span>
              <span class="motion-card__line">o <em>scroll.</em></span>
            </h3>
            <p class="motion-card__body">
              <span class="motion-card__line">Reels e vídeos verticais</span>
              <span class="motion-card__line">construídos para engajar</span>
              <span class="motion-card__line">desde o primeiro frame.</span>
            </p>
            <a href="#projects-section" class="btn-primary motion-card__button">
              Ver Mais Projetos <span class="arrow">→</span>
            </a>
          </div>
          <div class="motion-card__video-wrap">
            <video
              class="motion-card__video"
              src="${motionVideo}"
              muted
              playsinline
              loop
              preload="metadata"
            ></video>
            <div class="motion-card__video-overlay"></div>
          </div>
        </div>

        <!-- Card 3 — Tutorial Animado — horizontal grande (YouTube), vídeo esq / texto dir -->
        <div class="motion-card motion-card--horizontal-lg" id="motion-card-3">
          <div class="motion-card__video-wrap">
            <video
              class="motion-card__video"
              src="${motionVideo}"
              muted
              playsinline
              loop
              preload="metadata"
            ></video>
            <div class="motion-card__video-overlay"></div>
          </div>
          <div class="motion-card__desc motion-card__desc--right">
            <span class="motion-card__tag">Tutorial Animado</span>
            <h3 class="motion-card__title">
              <span class="motion-card__line">Conhecimento</span>
              <span class="motion-card__line">entregue com</span>
              <span class="motion-card__line"><em>clareza.</em></span>
            </h3>
            <p class="motion-card__body">
              <span class="motion-card__line">Tutoriais e walkthroughs com</span>
              <span class="motion-card__line">motion graphics que simplificam</span>
              <span class="motion-card__line">o complexo e retêm a atenção.</span>
            </p>
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

export { initMotion };
