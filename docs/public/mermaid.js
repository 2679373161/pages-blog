// Mermaid 初始化脚本 - 从 VitePress 渲染的代码块中提取并重新渲染
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

      // 找到所有被 VitePress 渲染的 mermaid 代码块
      const mermaidBlocks = document.querySelectorAll('.language-mermaid')

      mermaidBlocks.forEach(async (block, index) => {
        try {
          // 从语法高亮的 HTML 中提取纯文本
          const codeElement = block.querySelector('code')
          if (!codeElement) return

          let text = codeElement.textContent || codeElement.innerText
          text = text.trim()

          // 生成唯一 ID
          const uniqueId = `mermaid-graph-${index}`

          // 使用 mermaid.render API 渲染成 SVG
          const { svg } = await mermaid.render(uniqueId, text)

          // 创建新容器
          const container = document.createElement('div')
          container.className = 'mermaid-container'
          container.style.textAlign = 'center'
          container.style.padding = '20px 0'
          container.innerHTML = svg

          // 替换原来的代码块
          block.replaceWith(container)
        } catch (err) {
          console.error('Mermaid rendering failed:', err)
          block.innerHTML = `<p style="color: red;">Mermaid 渲染失败</p>${block.innerHTML}`
        }
      })
    }
  }, 100)

  setTimeout(() => clearInterval(checkMermaid), 5000)
})
