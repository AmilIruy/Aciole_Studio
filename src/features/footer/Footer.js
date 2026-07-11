import './footer.css';

export function Footer() {
  return `
    <section class="footer-cta animate-in" id="footer-cta">
      <div class="container">
        <h2>
          VAMOS CRIAR ALGO<br />
          INCRÍVEL JUNTOS?
        </h2>
        <div class="footer-cta-right">
          <p>
            Quer criar uma experiência digital incrível e garantir resultados? Fale com a gente.
          </p>
          <button class="footer-cta-btn" id="footer-cta-btn">
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </section>

    <footer class="footer animate-in" id="footer">
      <div class="container">
        <p>© 2025 Aciole Studio. Todos os direitos reservados.</p>
        <div class="footer-links">
          <a href="#">Termos</a>
          <a href="#">Privacidade</a>
          <a href="#">Contato</a>
        </div>
      </div>
    </footer>
  `;
}
