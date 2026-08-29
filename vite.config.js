import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    sourcemap: true,
    rollupOptions: {
      treeshake: {
        // Trata módulos sem side-effects como tree-shakeable (essencial para three.js)
        moduleSideEffects: false,
        preset: 'recommended',
      },
      output: {
        manualChunks(id) {
          // Three.js em chunk separado — carregado só quando HeroScene é importado
          if (id.includes('node_modules/three')) {
            return 'three';
          }
        },
      },
    },
  },
})
