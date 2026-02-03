# VitePress 博客

基于 VitePress 和 GitHub Pages 构建的个人博客。

## 技术栈

- **VitePress**：静态站点生成器
- **GitHub Pages**：免费托管
- **GitHub Actions**：CI/CD 自动部署

## 快速开始

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 项目结构

```
docs/
├── posts/              # 博客文章
├── .vitepress/         # VitePress 配置
│   └── config.ts       # 站点配置
├── about.md            # 关于页面
└── index.md            # 首页
```

## 添加新文章

1. 在 `docs/posts/` 目录创建 Markdown 文件
2. 添加 frontmatter 元数据：

```yaml
---
title: 文章标题
date: 2026-02-03
tags:
  - 标签1
  - 标签2
category: 教程
---
```

3. 更新 `docs/.vitepress/config.ts` 中的侧边栏配置
4. 提交并推送，GitHub Actions 自动部署

## 自动部署

每次向 `main` 分支推送代码时，GitHub Actions 会自动：
1. 构建站点
2. 部署到 GitHub Pages

## 在线访问

- 博客地址：https://2679373161.github.io/pages-blog/
- GitHub 仓库：https://github.com/2679373161/pages-blog

## License

MIT
