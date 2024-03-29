import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),  VitePWA({
    injectRegister: 'auto',
    manifest: {
      name: 'Nomad',
      short_name: 'Nomad',
      start_url: '/',
      display: 'standalone',
      background_color: '#026CDF',
      lang: 'en',
      scope: '/',
      icons: [
        {
          src: '/vite.svg',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable',
        },
        {
          src: '/vite.svg',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
      theme_color: '#ffffff',
    },
  }),]
})