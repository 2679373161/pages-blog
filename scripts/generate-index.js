#!/usr/bin/env node

/**
 * 自动生成文章列表页面
 * 从 frontmatter 提取元数据，生成文章卡片
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postsDir = path.join(__dirname, '../docs/posts')
const indexFile = path.join(__dirname, '../docs/posts/index.md')

// 读取所有文章
const files = fs.readdirSync(postsDir)
  .filter(f => f.endsWith('.md') && f !== 'index.md')

// 解析文章
const posts = files.map(file => {
  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8')
  const { data, content: body } = matter(content)

  // 提取摘要（取前 150 字）
  let excerpt = body
    .replace(/^#+\s.*$/gm, '') // 移除标题
    .replace(/\*\*/g, '') // 移除加粗
    .replace(/`/g, '') // 移除代码标记
    .trim()
    .slice(0, 150)
    .replace(/\n/g, ' ')
  if (excerpt.length === 150) excerpt += '...'

  return {
    file,
    title: data.title || file.replace('.md', ''),
    date: data.date,
    tags: data.tags || [],
    category: data.category || '未分类',
    excerpt
  }
}).sort((a, b) => new Date(b.date) - new Date(a.date))

// 统计标签
const tagCounts = posts.reduce((acc, post) => {
  post.tags.forEach(tag => {
    acc[tag] = (acc[tag] || 0) + 1
  })
  return acc
}, {})

// 生成标签云 HTML
const tagCloudHTML = Object.entries(tagCounts)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([tag, count]) => `  <a href="#${tag.toLowerCase()}" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    ${tag} <span style="opacity: 0.7; font-size: 0.875em;">(${count})</span>
  </a>`)
  .join('\n')

// 生成文章卡片 HTML
const postsHTML = posts.map(post => {
  const tagsHTML = post.tags.map(tag =>
    `<span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">${tag}</span>`
  ).join('\n  ')

  return `### [${post.title}](./${post.file})
<div style="color: var(--vp-c-text-2); font-size: 0.875rem; margin: 0.5rem 0;">
  发布于 ${post.date} • ${post.category}
</div>

${post.excerpt}

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
  ${tagsHTML}
</div>

[阅读全文 →](./${post.file})

---`
}).join('\n\n')

// 生成完整页面
const indexContent = `---
title: 博客文章
---

# 📚 所有文章

欢迎来到我的博客！这里记录了我在技术学习和实践中的思考与总结。

## 🏷️ 标签云

<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 2rem 0;">
${tagCloudHTML}
</div>

## 📝 最新文章

${postsHTML}

## 💡 写作指南

只需在 \`docs/posts/\` 目录下创建 Markdown 文件即可，文章会自动出现在列表中！

### 文章模板

创建新文章时，使用以下 frontmatter 格式：

\`\`\`markdown
---
title: 文章标题
date: 2026-02-03
tags:
  - 标签1
  - 标签2
category: 分类
order: 1
---

# 文章内容

这里是你的文章正文...
\`\`\`

### 文章属性说明

- **title**：文章标题
- **date**：发布日期
- **tags**：文章标签（数组）
- **category**：文章分类（工程实践/教程/未分类）
- **order**：排序权重（数字越小越靠前，默认 999）

## 订阅更新

通过 [GitHub](https://github.com/2679373161) 关注我的最新动态。
`

// 写入文件
fs.writeFileSync(indexFile, indexContent, 'utf-8')

console.log('✅ 文章列表已生成:', indexFile)
console.log(`📊 共 ${posts.length} 篇文章，${Object.keys(tagCounts).length} 个标签`)
