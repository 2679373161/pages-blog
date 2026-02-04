---
title: 博客文章
---

# 📚 所有文章

欢迎来到我的博客！这里记录了我在技术学习和实践中的思考与总结。

## 🏷️ 标签云

<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 2rem 0;">
  <a href="#llm" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    LLM <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#streaming" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    Streaming <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#frontend" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    前端工程 <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#vitepress" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    VitePress <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#github-pages" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    GitHub Pages <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#cicd" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    CI/CD <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
</div>

## 📝 最新文章

### [LLM 流式输出的增量解析实战](./llm-streaming-parsing.md)
<div style="color: var(--vp-c-text-2); font-size: 0.875rem; margin: 0.5rem 0;">
  发布于 2026年2月3日 • 工程实践
</div>

深入探讨 LLM 流式输出的实时解析方案，涵盖结构化数据（JSON）、非结构化文本和思维链三种场景的处理策略，以及工程落地时的 Buffer 爆炸、嵌套字符串、Markdown 干扰等常见坑的解决方案。

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">LLM</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">Streaming</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">前端工程</span>
</div>

[阅读全文 →](./llm-streaming-parsing.md)

---

### [从零搭建 VitePress + GitHub Pages 博客](./build-vitepress-blog.md)
<div style="color: var(--vp-c-text-2); font-size: 0.875rem; margin: 0.5rem 0;">
  发布于 2026年2月3日 • 教程
</div>

详细记录了从零开始搭建 VitePress 博客的完整过程，包括项目初始化、GitHub Actions 自动部署配置，以及搭建过程中遇到的 4 个关键问题和解决方案。

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">VitePress</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">GitHub Pages</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">CI/CD</span>
</div>

[阅读全文 →](./build-vitepress-blog.md)

---

## 💡 写作指南

只需在 `docs/posts/` 目录下创建 Markdown 文件即可，文章会自动出现在列表中！

### 文章模板

创建新文章时，使用以下 frontmatter 格式：

```markdown
---
title: 文章标题
date: 2026-02-03
tags:
  - 标签1
  - 标签2
category: 教程
---

# 文章内容

这里是你的文章正文...
```

### 文章属性说明

- **title**：文章标题
- **date**：发布日期
- **tags**：文章标签（数组）
- **category**：文章分类

## 订阅更新

通过 [GitHub](https://github.com/2679373161) 关注我的最新动态。
