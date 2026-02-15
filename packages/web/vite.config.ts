import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: '**/*.inline.svg',
    }),
    {
      name: 'yaml-loader',
      configureServer(server) {
        server.middlewares.use('/data', (req, res, next) => {
          if (req.url && req.url.endsWith('.yaml')) {
            res.setHeader('Content-Type', 'text/yaml')
          }
          next()
        })
      },
    },
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 8000,
    host: true,
    middlewareMode: false,
  },
  preview: {
    port: 9000,
  },
  assetsInclude: ['**/*.svg', '**/*.yaml'],
})