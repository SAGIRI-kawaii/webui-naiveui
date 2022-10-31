import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { resolve } from 'path'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

// https://cn.vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    splitVendorChunkPlugin(),
    AutoImport({
      imports: [
        'vue',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'],
        },
      ],
      dts: 'src/typings/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/typings/components.d.ts',
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  optimizeDeps: {
    include: [
      'qs',
      'axios',
      'vue',
      'vue-router',
      'vite',
      '@vueuse/core',
      '@vicons/material',
      '@vicons/antd',
      'naive-ui',
      'chart.js',
    ],
  },
  build: {
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/.pnpm/')[1].split('/')[0].toString()
          }
          if (id.includes('src/views')) {
            return id.toString().split('src/views/')[1]
          }
        },
      },
    },
  },
})
