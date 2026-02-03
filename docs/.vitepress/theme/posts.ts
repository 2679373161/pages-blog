import fs from 'fs'
import path from 'path'

export interface Post {
  url: string
  title: string
  date: string
  excerpt: string
  frontmatter: any
}

const POSTS_DIR = path.resolve(__dirname, '../../posts')

// 简单的 frontmatter 解析器
function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)

  if (!match) {
    return { data: {}, content, excerpt: '' }
  }

  const fm = match[1]
  const body = match[2]

  // 解析 YAML 格式的 frontmatter
  const data: any = {}
  fm.split('\n').forEach(line => {
    const match = /^(\w+):\s*(.+)$/.exec(line)
    if (match) {
      const [, key, value] = match
      if (key === 'tags') {
        // 解析数组
        data[key] = value
          .replace(/^\[|\]$/g, '')
          .split(',')
          .map((t: string) => t.trim().replace(/^['"]|['"]$/g, ''))
      } else {
        data[key] = value
      }
    }
  })

  // 提取摘要（第一段）
  const excerpt = body.split('\n\n')[0].replace(/^#\s+.+\n/, '').trim()

  return { data, content: body, excerpt }
}

// 递归读取所有 markdown 文件
function readPosts(dir: string, basePath = ''): Post[] {
  const files = fs.readdirSync(dir)
  const posts: Post[] = []

  files.forEach(file => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      // 递归处理子目录
      posts.push(...readPosts(fullPath, path.join(basePath, file)))
    } else if (file.endsWith('.md') && file !== 'index.md') {
      // 读取 markdown 文件
      const content = fs.readFileSync(fullPath, 'utf-8')
      const { data, excerpt } = parseFrontmatter(content)

      posts.push({
        url: `/posts/${basePath ? basePath + '/' : ''}${file.replace(/\.md$/, '.html')}`,
        title: data.title || file.replace(/\.md$/, ''),
        date: data.date || '',
        excerpt: excerpt || '',
        frontmatter: data
      })
    }
  })

  return posts
}

// 获取所有文章
export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return []
  }

  const posts = readPosts(POSTS_DIR)

  // 按日期倒序排列
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })
}

// 获取所有分类
export function getCategories(): string[] {
  const posts = getPosts()
  const categories = new Set<string>()

  posts.forEach(post => {
    const category = post.frontmatter.category || '未分类'
    categories.add(category)
  })

  return Array.from(categories).sort()
}

// 获取所有标签
export function getTags(): Record<string, number> {
  const posts = getPosts()
  const tags: Record<string, number> = {}

  posts.forEach(post => {
    const postTags = post.frontmatter.tags || []
    postTags.forEach((tag: string) => {
      tags[tag] = (tags[tag] || 0) + 1
    })
  })

  return tags
}

// 按分类获取文章
export function getPostsByCategory(category: string): Post[] {
  const posts = getPosts()
  return posts.filter(post => {
    const postCategory = post.frontmatter.category || '未分类'
    return postCategory === category
  })
}

// 按标签获取文章
export function getPostsByTag(tag: string): Post[] {
  const posts = getPosts()
  return posts.filter(post => {
    const postTags = post.frontmatter.tags || []
    return postTags.includes(tag)
  })
}
