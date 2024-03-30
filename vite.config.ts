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
          src: './pwaIcons/android-chrome-192x192.png',
          sizes:'192x192',
          type:'image/png',
          purpose:'favicon'
        },
        {
          src:'./pwaIcons/android-chrome-512x512.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'any'
        },
        {
          src: './pwaIcons/apple-touch-icon.png',
          sizes:'180x180',
          type:'image/png',
          purpose:'apple touch icon',
        },
        {
          src: './pwaIcons/maskable_icon.png',
          sizes:'512x512',
          type:'image/png',
          purpose:'maskable',
        },
      ],
      theme_color: '#ffffff',
    },
  }),]
})