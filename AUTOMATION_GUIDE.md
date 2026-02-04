# 博客自动化脚本使用指南

## 快速开始

### 创建新文章

1. 复制模板：
```bash
cp .template.md docs/posts/my-new-post.md
```

2. 编辑文章内容，修改 frontmatter

3. 生成配置并预览：
```bash
npm run generate
npm run dev
```

### 自动化脚本

| 命令 | 功能 |
|------|------|
| `npm run generate` | 生成所有配置（侧边栏 + 文章列表） |
| `npm run gen:sidebar` | 仅生成侧边栏配置 |
| `npm run gen:index` | 仅生成文章列表 |
| `npm run build` | 构建生产版本（自动生成配置） |

### 发布流程

```bash
# 1. 创建新文章
cp .template.md docs/posts/my-post.md
vim docs/posts/my-post.md

# 2. 生成配置
npm run generate

# 3. 本地预览（可选）
npm run dev

# 4. 提交并推送
git add .
git commit -m "新增文章：xxx"
git push
```

## 文章 Frontmatter

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | ✅ | 文章标题 |
| `date` | ✅ | 发布日期（格式：YYYY-MM-DD） |
| `tags` | ✅ | 标签数组 |
| `category` | ✅ | 分类（工程实践/教程/未分类） |
| `order` | ❌ | 排序权重（数字越小越靠前，默认 999） |

## 分类说明

目前支持 3 个分类：

- **工程实践**：实战经验、踩坑记录
- **教程**：技术教程、学习笔记
- **未分类**：其他内容（可自定义添加）

## 侧边栏组织规则

1. 按分类分组显示
2. 同分类内按 `order` 字段排序
3. 相同 `order` 按日期倒序
4. 分类顺序在 `scripts/generate-sidebar.js` 中配置

## 目录结构

```
blog/
├── docs/
│   ├── posts/          # 博客文章目录
│   │   ├── index.md    # 文章列表（自动生成）
│   │   └── *.md        # 文章文件
│   └── .vitepress/
│       ├── config.ts           # 主配置
│       └── sidebar-auto.json   # 侧边栏配置（自动生成）
├── scripts/              # 自动化脚本
│   ├── generate.js       # 主脚本
│   ├── generate-sidebar.js  # 生成侧边栏
│   └── generate-index.js    # 生成文章列表
└── .template.md          # 文章模板
```
