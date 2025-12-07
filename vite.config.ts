
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Set the project root to the current directory
  root: '.',
  // Use relative paths for assets for GitHub Pages compatibility
  // If deploying to a subpath like 'your-username.github.io/your-repo-name/',
  // change this to '/your-repo-name/' or ensure your GitHub Pages configuration
  // correctly handles the base path. For direct root deployment, './' is fine.
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html', // Point to the index.html for building
      },
    },
  },
});
    