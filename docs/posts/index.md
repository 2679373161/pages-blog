---
title: 博客文章
---

# 📚 所有文章

欢迎来到我的博客！这里记录了我在技术学习和实践中的思考与总结。

## 🏷️ 标签云

<div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin: 2rem 0;">
  <a href="#ci/cd" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    CI/CD <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#github pages" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    GitHub Pages <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#llm" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    LLM <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#streaming" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    Streaming <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#vitepress" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    VitePress <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
  <a href="#前端工程" style="padding: 0.5rem 1rem; border-radius: 999px; background: var(--vp-c-bg-soft); text-decoration: none; color: var(--vp-c-text-1); transition: all 0.3s;">
    前端工程 <span style="opacity: 0.7; font-size: 0.875em;">(1)</span>
  </a>
</div>

## 📝 最新文章

### [从零搭建 VitePress + GitHub Pages 博客](./build-vitepress-blog.md)
<div style="color: var(--vp-c-text-2); font-size: 0.875rem; margin: 0.5rem 0;">
  发布于 Tue Feb 03 2026 08:00:00 GMT+0800 (GMT+08:00) • 教程
</div>

最近想搭建一个个人博客，经过一番调研，最终选择了 VitePress + GitHub Pages 的方案。这篇文章记录了整个搭建过程以及遇到的各种坑。    在选型时，我对比了几个主流方案：  | 方案 | 优点 | 缺点 | |------|------|------| | Hexo | 插件丰...

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">VitePress</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">GitHub Pages</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">CI/CD</span>
</div>

[阅读全文 →](./build-vitepress-blog.md)

---

### [LLM 流式输出的增量解析实战](./llm-streaming-parsing.md)
<div style="color: var(--vp-c-text-2); font-size: 0.875rem; margin: 0.5rem 0;">
  发布于 Tue Feb 03 2026 08:00:00 GMT+0800 (GMT+08:00) • 工程实践
</div>

最近在做 LLM 应用时，遇到一个挺有意思的问题：流式输出的实时解析。  你知道的，LLM 吐字是慢慢来的，一个 chunk 接一个 chunk。但问题是，有些数据（比如工具调用的 JSON 参数）必须等完整了才能用。怎么在数据没来全之前，尽可能实时地展示给用户？这就是这篇博客要聊的。  ---  ...

<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 1rem 0;">
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">LLM</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">Streaming</span>
  <span style="padding: 0.25rem 0.75rem; border-radius: 999px; background: var(--vp-c-bg-mute); font-size: 0.875rem; color: var(--vp-c-text-2);">前端工程</span>
</div>

[阅读全文 →](./llm-streaming-parsing.md)

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
category: 分类
order: 1
---

# 文章内容

这里是你的文章正文...
```

### 文章属性说明

- **title**：文章标题
- **date**：发布日期
- **tags**：文章标签（数组）
- **category**：文章分类（工程实践/教程/未分类）
- **order**：排序权重（数字越小越靠前，默认 999）

## 订阅更新

通过 [GitHub](https://github.com/2679373161) 关注我的最新动态。
