import { defineConfig } from 'vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig({
  // config options
  base: './', // Ensures relative paths for GitHub Pages / Subfolders
  plugins: [
    ViteImageOptimizer({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 75,
      },
      webp: {
        quality: 80,
        lossless: false,
      },
    }),
  ],
})
