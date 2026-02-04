import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: "浮灵的博客",
  description: "技术思考与学习笔记",
  lang: 'zh-CN',
  base: '/pages-blog/',
  head: [
    ['link', { rel: 'icon', href: '/pages-blog/favicon.ico' }],
    ['script', { src: 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js' }],
    ['script', {}, `
      window.addEventListener('DOMContentLoaded', function() {
        const checkMermaid = setInterval(() => {
          if (typeof mermaid !== 'undefined') {
            clearInterval(checkMermaid)
            mermaid.initialize({
              startOnLoad: false,
              theme: 'default',
              securityLevel: 'loose',
              logLevel: 'error'
            })
            const mermaidBlocks = document.querySelectorAll('.language-mermaid')
            mermaidBlocks.forEach(async (block, index) => {
              try {
                const codeElement = block.querySelector('code')
                if (!codeElement) return
                let text = codeElement.textContent || codeElement.innerText
                text = text.trim()
                const uniqueId = \`mermaid-graph-\${index}\`
                const { svg } = await mermaid.render(uniqueId, text)
                const wrapper = document.createElement('div')
                wrapper.className = 'mermaid-wrapper'
                wrapper.style.margin = '20px 0'
                const toggleBtn = document.createElement('button')
                toggleBtn.textContent = '查看源码'
                toggleBtn.className = 'mermaid-toggle-btn'
                toggleBtn.style.cssText = \`
                  padding: 6px 12px;
                  background: var(--vp-c-bg-soft);
                  border: 1px solid var(--vp-c-border);
                  border-radius: 6px;
                  cursor: pointer;
                  font-size: 14px;
                  color: var(--vp-c-text-1);
                  margin-bottom: 10px;
                  transition: all 0.2s;
                \`
                toggleBtn.onmouseenter = () => { toggleBtn.style.background = 'var(--vp-c-bg-mute)' }
                toggleBtn.onmouseleave = () => { toggleBtn.style.background = 'var(--vp-c-bg-soft)' }
                const diagramContainer = document.createElement('div')
                diagramContainer.className = 'mermaid-diagram'
                diagramContainer.style.cssText = \`text-align: center; padding: 20px 0;\`
                diagramContainer.innerHTML = svg
                const sourceContainer = document.createElement('div')
                sourceContainer.className = 'mermaid-source'
                sourceContainer.style.display = 'none'
                sourceContainer.innerHTML = \`<pre style="background: var(--vp-c-bg-soft); padding: 16px; border-radius: 8px; overflow-x: auto;"><code>\${text}</code></pre>\`
                let showingDiagram = true
                toggleBtn.onclick = () => {
                  showingDiagram = !showingDiagram
                  if (showingDiagram) {
                    toggleBtn.textContent = '查看源码'
                    diagramContainer.style.display = 'block'
                    sourceContainer.style.display = 'none'
                  } else {
                    toggleBtn.textContent = '查看图表'
                    diagramContainer.style.display = 'none'
                    sourceContainer.style.display = 'block'
                  }
                }
                wrapper.appendChild(toggleBtn)
                wrapper.appendChild(diagramContainer)
                wrapper.appendChild(sourceContainer)
                block.replaceWith(wrapper)
              } catch (err) {
                console.error('Mermaid rendering failed:', err)
              }
            })
          }
        }, 100)
        setTimeout(() => clearInterval(checkMermaid), 5000)
      })
    `]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '📚 博客', link: '/posts/' },
      { text: '关于', link: '/about.md' }
    ],

    sidebar: {
      '/posts/': [
        {
          text: '文章',
          items: [
            { text: '文章列表', link: '/posts/' },
            { text: '从零搭建 VitePress 博客', link: '/posts/build-vitepress-blog.md' },
            { text: 'LLM 流式输出的增量解析实战', link: '/posts/llm-streaming-parsing.md' }
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
