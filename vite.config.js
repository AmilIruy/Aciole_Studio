import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    // Gera arquivos .map para depuração e para que o Lighthouse possa acessá-los.
    // Alternativas: 'inline' (incluir no bundle) ou 'hidden' (gera mapas mas não adiciona sourceMappingURL).
    sourcemap: true,
  },
})
