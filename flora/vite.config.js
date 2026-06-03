import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path matches the GitHub repo name so asset URLs resolve on Pages
const base = process.env.GITHUB_PAGES ? '/Flora-WM-AI-Enablement/' : '/'

export default defineConfig({
  plugins: [react()],
  base,
})
