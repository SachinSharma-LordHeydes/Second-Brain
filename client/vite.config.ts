import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist', // Ensures the build output goes to the 'dist' directory
  },
  server: {
    host: true, // Allow the server to be accessed externally
  },
})
