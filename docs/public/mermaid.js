// Mermaid 初始化脚本
window.addEventListener('DOMContentLoaded', function() {
  // 等待 mermaid 加载完成
  const checkMermaid = setInterval(() => {
    if (typeof mermaid !== 'undefined') {
      clearInterval(checkMermaid)

      mermaid.initialize({
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        logLevel: 'error'
      })

      // 找到所有 mermaid 代码块并渲染
      const mermaidBlocks = document.querySelectorAll('.language-mermaid')
      if (mermaidBlocks.length > 0) {
        mermaid.run({
          querySelector: '.language-mermaid'
        }).catch(err => {
          console.error('Mermaid rendering failed:', err)
        })
      }
    }
  }, 100)

  // 5秒后停止检查
  setTimeout(() => clearInterval(checkMermaid), 5000)
})
