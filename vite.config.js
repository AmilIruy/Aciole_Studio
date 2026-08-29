import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [],
  build: {
    sourcemap: true,
    // Divide o CSS por chunk — elimina o único bundle CSS render-blocking
    cssCodeSplit: true,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        preset: 'recommended',
      },
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/three')) {
            return 'three';
          }
        },
      },
    },
  },
})
