// Mermaid 初始化脚本 - 支持图表/源码切换
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

          // 创建包装容器
          const wrapper = document.createElement('div')
          wrapper.className = 'mermaid-wrapper'
          wrapper.style.margin = '20px 0'

          // 创建切换按钮
          const toggleBtn = document.createElement('button')
          toggleBtn.textContent = '查看源码'
          toggleBtn.className = 'mermaid-toggle-btn'
          toggleBtn.style.cssText = `
            padding: 6px 12px;
            background: var(--vp-c-bg-soft);
            border: 1px solid var(--vp-c-border);
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            color: var(--vp-c-text-1);
            margin-bottom: 10px;
            transition: all 0.2s;
          `
          toggleBtn.onmouseenter = () => {
            toggleBtn.style.background = 'var(--vp-c-bg-mute)'
          }
          toggleBtn.onmouseleave = () => {
            toggleBtn.style.background = 'var(--vp-c-bg-soft)'
          }

          // 创建图表容器
          const diagramContainer = document.createElement('div')
          diagramContainer.className = 'mermaid-diagram'
          diagramContainer.style.cssText = `
            text-align: center;
            padding: 20px 0;
          `
          diagramContainer.innerHTML = svg

          // 创建源码容器
          const sourceContainer = document.createElement('div')
          sourceContainer.className = 'mermaid-source'
          sourceContainer.style.display = 'none'
          sourceContainer.innerHTML = `<pre style="background: var(--vp-c-bg-soft); padding: 16px; border-radius: 8px; overflow-x: auto;"><code>${text}</code></pre>`

          // 切换逻辑
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

          // 组装
          wrapper.appendChild(toggleBtn)
          wrapper.appendChild(diagramContainer)
          wrapper.appendChild(sourceContainer)

          // 替换原来的代码块
          block.replaceWith(wrapper)
        } catch (err) {
          console.error('Mermaid rendering failed:', err)
          block.innerHTML = `<p style="color: red;">Mermaid 渲染失败</p>${block.innerHTML}`
        }
      })
    }
  }, 100)

  setTimeout(() => clearInterval(checkMermaid), 5000)
})
