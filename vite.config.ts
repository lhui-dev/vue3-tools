import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// element的自动导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
  // 插件处理
  plugins: [
    vue(),
    VueDevTools(),
    AutoImport({
      imports: ['vue'],
      resolvers: [ElementPlusResolver()],
      exclude: ['./src/components', 'src/base-ui']
    }),
    Components({
      resolvers: [
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      exclude: ['./src/components', 'src/base-ui']
    })
  ],
  base: './',
  // 启动服务
  server: {
    host: '0.0.0.0',
    port: 3100,
    open: true // 自动打开浏览器
  },
  // 打包处理
  build: {
    rollupOptions:{
      // 打包后文件进行分包
      output:{
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          // 对于依赖包进行切割打包
          if (id.includes('node_modules')) {
            return id.toString().split('.pnpm/')[1].split('@')[0].toString();
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
