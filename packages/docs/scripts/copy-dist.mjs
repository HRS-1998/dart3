import { cpSync, mkdirSync, rmSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const src = resolve(__dirname, '../.vitepress/dist')
const dest = resolve(__dirname, '../../../dist/1505-stable')

if (existsSync(src)) {
  rmSync(dest, { recursive: true, force: true })
  mkdirSync(dest, { recursive: true })
  cpSync(src, dest, { recursive: true })
  console.log('copied docs dist → dist/1505-stable')
} else {
  console.warn('skipped: .vitepress/dist not found')
}
