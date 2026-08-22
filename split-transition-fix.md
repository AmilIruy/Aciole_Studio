# Correção da transição Processos → Sobre

## Goal

Manter Lenis e ScrollTrigger sincronizados por uma única ponte e tornar a transição contínua em desktop e mobile.

## Tasks

- [x] Centralizar o ticker Lenis–GSAP em `scroll/lenis.js` → verificar uma única inscrição no ticker.
- [x] Remover captura manual de roda e saltos de scroll da Split → verificar progresso apenas por `scrub`.
- [x] Ajustar o canvas mobile e seu clipping → verificar que o divisor não corta cards.
- [x] Executar lint e build → verificar ausência de erros de compilação; teste tátil visual pendente em dispositivo real.

## Done When

- [ ] Processos → Sobre percorre uma única vez, proporcionalmente ao scroll, sem bloquear touch.
- [ ] As demais animações ScrollTrigger continuam sincronizadas com Lenis.
