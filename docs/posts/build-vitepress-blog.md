---
title: 从零搭建 VitePress + GitHub Pages 博客
date: 2026-02-03
tags:
  - VitePress
  - GitHub Pages
  - CI/CD
category: 教程
---

# 从零搭建 VitePress + GitHub Pages 博客

最近想搭建一个个人博客，经过一番调研，最终选择了 **VitePress + GitHub Pages** 的方案。这篇文章记录了整个搭建过程以及遇到的各种坑。

## 为什么选择 VitePress？

在选型时，我对比了几个主流方案：

| 方案 | 优点 | 缺点 |
|------|------|------|
| **Hexo** | 插件丰富，社区成熟 | 构建速度慢，配置复杂 |
| **Hugo** | 极快的构建速度 | 学习曲线陡峭 |
| **VitePress** | 基于 Vite，开发体验好，Vue 生态 | 相对较新 |
| **Next.js** | 全栈能力强大 | 对于纯博客来说有点重 |

最终选择 **VitePress** 的原因：
- ✅ 开发体验极佳（基于 Vite，HMR 秒级响应）
- ✅ Vue 生态，熟悉的技术栈
- ✅ 默认主题就很美观
- ✅ Markdown 扩展支持良好
- ✅ GitHub Pages 免费托管

## 搭建步骤

### 1. 创建 VitePress 项目

使用官方脚手架创建项目：

```bash
npm create vitepress@latest blog -- --template blog
cd blog
npm install
```

这里我选择了 `blog` 模板，它自带了博客的基本结构。

### 2. 项目结构

```
blog/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts       # 配置文件
│   ├── index.md            # 首页
│   └── about.md            # 关于页面
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 配置
└── package.json
```

### 3. 配置 VitePress

修改 `docs/.vitepress/config.ts`：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "浮灵的博客",
  description: "技术思考与学习笔记",
  lang: 'zh-CN',
  base: '/pages-blog/',  // 重要！GitHub Pages 路径配置
  head: [
    ['link', { rel: 'icon', href: '/pages-blog/favicon.ico' }]
  ],

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about.md' }
    ],

    sidebar: [
      {
        text: '文章',
        items: [
          { text: '首页', link: '/' },
          { text: '关于我', link: '/about.md' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/2679373161' }
    ]
  }
})
```

### 4. 创建 GitHub 仓库

```bash
cd blog
git init
git branch -m main
git add .
git commit -m "Initial commit: VitePress blog"

# 使用 GitHub CLI 创建仓库并推送
gh repo create pages-blog --public --source=. --remote=origin --push
```

### 5. 配置 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          cache-dependency-path: package-lock.json

      - name: Install dependencies
        run: npm ci

      - name: Build with VitePress
        run: npm run build  # 注意：不是 docs:build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 6. 启用 GitHub Pages

1. 进入仓库设置：**Settings** → **Pages**
2. **Build and deployment** → **Source** 选择 **GitHub Actions**
3. 保存后，每次推送代码会自动触发部署

## 遇到的坑与解决方案

### 坑 1：构建脚本名称错误

**问题**：
GitHub Actions 报错：
```
npm error Missing script: "docs:build"
```

**原因**：
VitePress 官方文档使用的是 `docs:build`，但 `blog` 模板的 `package.json` 中脚本名是 `build`。

**解决方案**：
检查 `package.json` 中的实际脚本名，修改 workflow 文件：
```yaml
- name: Build with VitePress
  run: npm run build  # 使用实际的脚本名
```

### 坑 2：静态资源 404 错误

**问题**：
页面可以访问，但所有 CSS、JS 文件都是 404：
```
GET https://2679373161.github.io/assets/style.xxx.css net::ERR_ABORTED 404
```

**原因**：
GitHub Pages 的仓库名是 `pages-blog`，不是默认的 `username.github.io`，所以需要配置 `base` 路径。

**解决方案**：
在 `config.ts` 中设置：
```typescript
export default defineConfig({
  base: '/pages-blog/',  // 必须与仓库名一致
  // ...
})
```

同时 favicon 路径也要修改：
```typescript
head: [
  ['link', { rel: 'icon', href: '/pages-blog/favicon.ico' }]
]
```

### 坑 3：GitHub Token 权限不足

**问题**：
推送 workflow 文件时被拒绝：
```
refusing to allow a Personal Access Token to create or update workflow without `workflow` scope
```

**解决方案**：
刷新 GitHub Token 并添加 workflow 权限：
```bash
gh auth refresh -h github.com -s workflow
```

按提示在浏览器中完成授权即可。

### 坑 4：分支名称不一致

**问题**：
推送时提示：
```
! [rejected] main -> main (fetch first)
```

**原因**：
远程仓库默认分支可能是 `master`，而本地是 `main`。

**解决方案**：
```bash
git pull --rebase origin main
git push
```

## 本地开发

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run serve
```

## 写新文章

在 `docs/` 目录下创建 Markdown 文件：

```bash
# 创建文章
echo "# 我的第一篇文章" > docs/my-first-post.md

# 推送到 GitHub
git add .
git commit -m "添加新文章"
git push
```

推送后会自动触发部署，几分钟后就能在 GitHub Pages 看到更新。

## 总结

整个搭建过程不算复杂，但确实踩了不少坑。关键点：

1. ✅ **`base` 路径配置**：非默认仓库名必须配置
2. ✅ **脚本名称**：根据实际 `package.json` 调整 workflow
3. ✅ **GitHub Token 权限**：需要 `workflow` scope
4. ✅ **GitHub Pages Source**：选择 "GitHub Actions" 而非 "Deploy from a branch"

现在的博客系统已经可以正常运行了，接下来可以：
- 添加更多个性化配置
- 集成评论系统（Giscus）
- 添加搜索功能
- 优化 SEO

希望这篇文章能帮到想要搭建博客的你！

## 相关链接

- [VitePress 官方文档](https://vitepress.dev/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [项目源码](https://github.com/2679373161/pages-blog)
