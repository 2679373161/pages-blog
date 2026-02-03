import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import PostList from './components/PostList.vue'
import TagCloud from './components/TagCloud.vue'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册全局组件
    app.component('PostList', PostList)
    app.component('TagCloud', TagCloud)
  }
}

export default theme
