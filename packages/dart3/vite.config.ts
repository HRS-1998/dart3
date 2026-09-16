import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { cpSync, mkdirSync, rmSync, existsSync } from 'fs'

// 将 CSS 内联注入到 JS 中，用户无需手动引入 CSS 文件
function cssInjectedByJs(): Plugin {
  return {
    name: 'css-injected-by-js',
    enforce: 'post',
    generateBundle(_, bundle) {
      const cssChunks: string[] = []
      for (const [name, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'asset' && name.endsWith('.css')) {
          cssChunks.push(chunk.source as string)
          delete bundle[name]
        }
      }
      if (!cssChunks.length) return

      const css = cssChunks.join('\n')
      const injectCode = `;(function(){var d=document;var s=d.createElement('style');s.textContent=${JSON.stringify(css)};d.head.appendChild(s)})();`

      for (const chunk of Object.values(bundle)) {
        if (chunk.type === 'chunk' && chunk.isEntry) {
          chunk.code = injectCode + chunk.code
          break
        }
      }
    }
  }
}

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJs(),
    dts({
      insertTypesEntry: true,
      outDir: 'es',
      include: ['packages/**/*'],
      tsconfigPath: './tsconfig.dts.json'
    }),
    {
      name: 'move-output',
      closeBundle() {
        for (const dir of ['es', 'lib']) {
          const src = resolve(__dirname, 'dist', dir)
          const dest = resolve(__dirname, dir)
          if (existsSync(src)) {
            mkdirSync(dest, { recursive: true })
            cpSync(src, dest, { recursive: true })
          }
        }
        rmSync(resolve(__dirname, 'dist'), { recursive: true })
      }
    }
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'CtDart3',
      formats: ['es', 'umd'],
      fileName: (format) => format === 'es' ? 'es/index.js' : 'lib/index.umd.min.js'
    },
    rollupOptions: {
      external: [
        'vue',
        'axios',
        'element-plus',
        'dayjs',
        'lodash-es',
        'qs',
        '@element-plus/icons-vue'
      ],
      output: {
        globals: {
          vue: 'Vue',
          axios: 'axios',
          'element-plus': 'ElementPlus',
          dayjs: 'dayjs',
          'lodash-es': 'lodashEs',
          qs: 'qs',
          '@element-plus/icons-vue': 'ElementPlusIconsVue'
        }
      }
    },
    cssCodeSplit: false,
    minify: 'terser'
  }
})
