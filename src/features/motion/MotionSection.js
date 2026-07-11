import './motion.css';
import motionThumb from '../../assets/motion_thumb.png';

export function MotionSection() {
  return `
    <section class="motion-section animate-in" id="motion-section">
      <div class="container">
        <div style="flex: 1">
          <div class="motion-video-card" id="motion-video">
            <img src="${motionThumb}" alt="Motion Design Showreel" />
            <div class="motion-video-overlay">
              <div class="play-btn">
                <svg viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span class="motion-video-label">Motion Design</span>
            </div>
          </div>
        </div>

        <div class="motion-content">
          <span class="section-label">01 — Motion Design</span>
          <h2>
            MOVIMENTO QUE<br />
            PRENDE A <span class="highlight">ATENÇÃO.</span>
          </h2>
          <p>
            Criamos animações, reels, vídeos, institucionais e conteúdos visuais desenvolvidos para fortalecer marcas e aumentar engajamento.
          </p>
          <div class="motion-features">
            <div class="motion-feature">
              <span class="dot"></span>
              Reels & Shorts
            </div>
            <div class="motion-feature">
              <span class="dot"></span>
              Animações 2D/3D
            </div>
            <div class="motion-feature">
              <span class="dot"></span>
              Motion Graphics
            </div>
            <div class="motion-feature">
              <span class="dot"></span>
              Vídeos Promocionais
            </div>
          </div>
          <a href="#projects-section" class="btn-outline-dark" id="motion-cta">
            Ver Mais Projetos de Motion <span class="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
