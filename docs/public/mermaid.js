// Mermaid 初始化脚本
window.addEventListener('load', function() {
  if (typeof mermaid !== 'undefined') {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose'
    })
    
    // 等待 DOM 完全加载后再渲染
    setTimeout(() => {
      mermaid.run({
        querySelector: '.language-mermaid'
      }).catch(err => {
        console.error('Mermaid rendering failed:', err)
      })
    }, 100)
  }
})
