#!/usr/bin/env node

/**
 * 主脚本：生成所有配置
 */

import { execSync } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🚀 开始生成博客配置...\n')

// 生成侧边栏
try {
  console.log('📋 生成侧边栏...')
  execSync('node scripts/generate-sidebar.js', { cwd: path.join(__dirname, '..') })
} catch (err) {
  console.error('❌ 侧边栏生成失败')
  process.exit(1)
}

// 生成文章列表
try {
  console.log('📝 生成文章列表...')
  execSync('node scripts/generate-index.js', { cwd: path.join(__dirname, '..') })
} catch (err) {
  console.error('❌ 文章列表生成失败')
  process.exit(1)
}

console.log('\n✅ 所有配置生成完成！')
console.log('\n下一步：')
console.log('  git add .')
console.log('  git commit -m "更新文章"')
console.log('  git push')
