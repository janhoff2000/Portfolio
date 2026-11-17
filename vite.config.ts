import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // Turns .tsx/JSX into plain JavaScript and enables instant refresh while editing
    react(),
    // Scans your files for Tailwind class names and generates only the CSS you use
    tailwindcss(),
    // Runs the dev server inside Cloudflare's real Workers runtime and
    // prepares the build output for `wrangler deploy`
    cloudflare(),
  ],
})
