#!/usr/bin/env node

/**
 * 自动生成侧边栏配置
 * 扫描 posts 目录，按分类组织文章
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postsDir = path.join(__dirname, '../docs/posts')
const configFile = path.join(__dirname, '../docs/.vitepress/sidebar-auto.json')

// 读取所有文章
const files = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.md') && f !== 'index.md')

// 解析文章 frontmatter
const posts = files.map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
  const { data, excerpt } = matter(content)
  return {
    file,
    title: data.title || file.replace('.md', ''),
    date: data.date,
    tags: data.tags || [],
    category: data.category || '未分类',
    order: data.order || 999
  }
})

// 按分类分组
const categorized = posts.reduce((acc, post) => {
  const cat = post.category
  if (!acc[cat]) acc[cat] = []
  acc[cat].push(post)
  return acc
}, {})

// 按分类排序（定义分类顺序）
const categoryOrder = {
  '工程实践': 1,
  '教程': 2,
  '未分类': 999
}

// 构建侧边栏配置
const sidebarItems = [
  { text: '文章列表', link: '/posts/' }
]

// 按分类顺序添加
Object.keys(categorized)
  .sort((a, b) => {
    const orderA = categoryOrder[a] || 999
    const orderB = categoryOrder[b] || 999
    if (orderA !== orderB) return orderA - orderB
    return a.localeCompare(b)
  })
  .forEach(category => {
    const categoryPosts = categorized[category]
      .sort((a, b) => {
        // 先按 order 字段，再按日期
        if (a.order !== b.order) return a.order - b.order
        return new Date(b.date) - new Date(a.date)
      })
      .map(post => ({
        text: post.title,
        link: `/posts/${post.file}`
      }))

    sidebarItems.push({
      text: `${category} (${categoryPosts.length})`,
      items: categoryPosts
    })
  })

// 生成配置
const sidebarConfig = {
  '/posts/': [
    {
      text: '文章',
      items: sidebarItems
    }
  ]
}

// 写入文件
fs.writeFileSync(configFile, JSON.stringify(sidebarConfig, null, 2), 'utf-8')

console.log('✅ 侧边栏配置已生成:', configFile)
console.log(`📊 共 ${posts.length} 篇文章，${Object.keys(categorized).length} 个分类`)
console.log('')
Object.keys(categorized).forEach(cat => {
  console.log(`   ${cat}: ${categorized[cat].length} 篇`)
})
