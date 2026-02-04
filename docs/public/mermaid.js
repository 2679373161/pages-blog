// Mermaid 初始化脚本 - 支持图表/源码切换
// 修复 SPA 路由跳转问题

(function() {
  let initialized = false

  function initMermaid() {
    if (initialized) return // 防止重复初始化

    const checkMermaid = setInterval(() => {
      if (typeof mermaid !== 'undefined') {
        clearInterval(checkMermaid)
        initialized = true

        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
          logLevel: 'error'
        })

        renderMermaidBlocks()
      }
    }, 100)

    setTimeout(() => clearInterval(checkMermaid), 5000)
  }

  function renderMermaidBlocks() {
    // 找到所有未被渲染的 mermaid 代码块
    const mermaidBlocks = document.querySelectorAll('.language-mermaid:not(.mermaid-rendered)')

    if (mermaidBlocks.length === 0) return

    mermaidBlocks.forEach(async (block, index) => {
      // 标记为已处理，防止重复渲染
      block.classList.add('mermaid-rendered')

      try {
        const codeElement = block.querySelector('code')
        if (!codeElement) return

        let text = codeElement.textContent || codeElement.innerText
        text = text.trim()

        const uniqueId = `mermaid-graph-${Date.now()}-${index}`
        const { svg } = await mermaid.render(uniqueId, text)

        const wrapper = document.createElement('div')
        wrapper.className = 'mermaid-wrapper'
        wrapper.style.margin = '20px 0'

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

        const diagramContainer = document.createElement('div')
        diagramContainer.className = 'mermaid-diagram'
        diagramContainer.style.cssText = `text-align: center; padding: 20px 0;`
        diagramContainer.innerHTML = svg

        const sourceContainer = document.createElement('div')
        sourceContainer.className = 'mermaid-source'
        sourceContainer.style.display = 'none'
        sourceContainer.innerHTML = `<pre style="background: var(--vp-c-bg-soft); padding: 16px; border-radius: 8px; overflow-x: auto;"><code>${text}</code></pre>`

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

  // 初始化 Mermaid 库
  initMermaid()

  // 监听页面导航（VitePress 路由变化）
  const observePageChanges = () => {
    // 使用 MutationObserver 监听 DOM 变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length > 0) {
          // 检查是否有新的 mermaid 代码块
          const hasNewMermaid = Array.from(mutation.addedNodes).some(node => {
            if (node.nodeType === 1) {
              return node.classList?.contains('language-mermaid') ||
                     node.querySelector?.('.language-mermaid')
            }
            return false
          })

          if (hasNewMermaid) {
            // 延迟一点，等待内容完全加载
            setTimeout(() => renderMermaidBlocks(), 100)
          }
        }
      })
    })

    // 开始观察
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // 同时监听 URL 变化（VitePress 路由跳转）
    let lastUrl = location.href
    new MutationObserver(() => {
      const currentUrl = location.href
      if (currentUrl !== lastUrl) {
        lastUrl = currentUrl
        // 页面跳转后，延迟渲染
        setTimeout(() => renderMermaidBlocks(), 200)
      }
    }).observe(document, { subtree: true, childList: true })

    // 监听 popstate 事件（浏览器前进/后退）
    window.addEventListener('popstate', () => {
      setTimeout(() => renderMermaidBlocks(), 200)
    })
  }

  // DOMContentLoaded 时启动监听
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observePageChanges)
  } else {
    observePageChanges()
  }

  // 首次渲染
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => renderMermaidBlocks(), 300)
    })
  } else {
    setTimeout(() => renderMermaidBlocks(), 300)
  }
})()
