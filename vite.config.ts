import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  optimizeDeps: {
    include: [
      '@mui/material',
      '@mui/material/styles',
      '@mui/icons-material/Menu',
      '@mui/icons-material/Pets',
      '@mui/icons-material/Search',
      '@mui/icons-material/KeyboardArrowDown',
      '@mui/icons-material/KeyboardArrowLeft',
      '@mui/icons-material/KeyboardArrowRight',
      '@mui/icons-material/ArrowForward',
      '@mui/icons-material/ArrowDownward',
      '@mui/icons-material/Telegram',
      '@mui/icons-material/GitHub',
      '@mui/icons-material/Email',
      '@emotion/react',
      '@emotion/styled',
    ],
  },
})
