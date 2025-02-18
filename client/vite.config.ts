// import { defineConfig } from 'vite'
// export default defineConfig({
  //   plugins: [
    //     tailwindcss(),
    //   ],
    // })
    
    
    
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  server: {
    port: 4000
  }
})