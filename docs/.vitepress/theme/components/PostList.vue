<template>
  <div class="post-list">
    <div v-if="posts.length === 0" class="empty-state">
      <p>暂无文章</p>
    </div>

    <div v-for="post in posts" :key="post.url" class="post-card">
      <div class="post-meta">
        <span class="post-date">{{ formatDate(post.date) }}</span>
        <span v-if="post.frontmatter.category" class="post-category">
          {{ post.frontmatter.category }}
        </span>
      </div>

      <h3 class="post-title">
        <a :href="post.url">{{ post.title }}</a>
      </h3>

      <p v-if="post.excerpt" class="post-excerpt">
        {{ post.excerpt }}
      </p>

      <div v-if="post.frontmatter.tags && post.frontmatter.tags.length" class="post-tags">
        <span v-for="tag in post.frontmatter.tags" :key="tag" class="tag">
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Post {
  url: string
  title: string
  date: string
  excerpt: string
  frontmatter: {
    category?: string
    tags?: string[]
  }
}

const posts = ref<Post[]>([])

onMounted(async () => {
  // 动态导入工具函数
  const { getPosts } = await import('../posts')
  posts.value = getPosts()
})

function formatDate(date: string): string {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.post-list {
  margin-top: 2rem;
}

.post-card {
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.post-date {
  color: var(--vp-c-text-2);
}

.post-category {
  color: var(--vp-c-brand);
  font-weight: 500;
}

.post-title {
  margin: 0.5rem 0;
  font-size: 1.5rem;
}

.post-title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.post-title a:hover {
  color: var(--vp-c-brand);
}

.post-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: var(--vp-c-bg-mute);
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}

.tag:hover {
  background: var(--vp-c-brand);
  color: white;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  color: var(--vp-c-text-2);
}
</style>
