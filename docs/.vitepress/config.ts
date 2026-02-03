import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "浮灵的博客",
  description: "技术思考与学习笔记",
  lang: 'zh-CN',
  base: '/pages-blog/',
  head: [
    ['link', { rel: 'icon', href: '/pages-blog/favicon.ico' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '博客', link: '/posts/', },
      { text: '关于', link: '/about.md' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '所有文章',
          items: [
            { text: '文章列表', link: '/posts/' },
            { text: '从零搭建 VitePress 博客', link: '/posts/build-vitepress-blog.md' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/2679373161' }
    ],

    footer: {
      message: '基于 VitePress 构建',
      copyright: 'Copyright © 2024-present 浮灵'
    }
  }
})
