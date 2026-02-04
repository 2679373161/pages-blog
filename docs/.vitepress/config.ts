import { defineConfig } from 'vitepress'

// 导入自动生成的侧边栏配置
// 如果文件不存在（首次运行），使用默认配置
let sidebarConfig
try {
  sidebarConfig = require('./sidebar-auto.json')
} catch (e) {
  // 默认配置
  sidebarConfig = {
    '/posts/': [
      {
        text: '文章',
        items: [
          { text: '文章列表', link: '/posts/' }
        ]
      }
    ]
  }
}

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "浮灵的博客",
  description: "技术思考与学习笔记",
  lang: 'zh-CN',
  base: '/pages-blog/',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><text y=\".9em\" font-size=\"90\">📖</text></svg>' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js' }],
    ['script', { src: '/pages-blog/mermaid.js' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '📚 博客', link: '/posts/' },
      { text: '关于', link: '/about.md' }
    ],

    sidebar: sidebarConfig,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/2679373161' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024-present 浮灵'
    }
  }
})
