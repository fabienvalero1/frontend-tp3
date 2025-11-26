// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    root: 'src', // Vite sert src/index.html comme entrée
    plugins: [react()],
    build: {
        outDir: '../dist',
    }
});
