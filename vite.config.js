// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    // 关键配置开始
    chunkSizeWarningLimit: 1500, // 提高体积警告阈值到1.5MB
    rollupOptions: {
      output: {
        manualChunks: {
          // 将echarts拆分成独立文件
          echarts: ['echarts', 'echarts-for-react'],
          // 将react相关库合并
          react: ['react', 'react-dom']
        }
      }
    }
    // 关键配置结束
  }
})