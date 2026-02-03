<template>
  <div class="tag-cloud">
    <h3 v-if="title" class="tag-cloud-title">{{ title }}</h3>
    <div class="tag-cloud-content">
      <a
        v-for="(count, tag) in tags"
        :key="tag"
        :href="`/posts/?tag=${tag}`"
        class="tag-cloud-item"
        :style="{ fontSize: getFontSize(count) }"
      >
        {{ tag }}
        <span class="tag-count">({{ count }})</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

const props = defineProps<{
  title?: string
}>()

const tags = ref<Record<string, number>>({})
const maxCount = computed(() => Math.max(...Object.values(tags.value), 1))

onMounted(async () => {
  const { getTags } = await import('../posts')
  tags.value = getTags()
})

function getFontSize(count: number): string {
  const ratio = count / maxCount.value
  const baseSize = 0.875
  const maxSize = 1.5
  const size = baseSize + (maxSize - baseSize) * ratio
  return `${size}rem`
}
</script>

<style scoped>
.tag-cloud {
  padding: 1.5rem;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  margin-bottom: 2rem;
}

.tag-cloud-title {
  margin: 0 0 1rem 0;
  font-size: 1.125rem;
  color: var(--vp-c-text-1);
}

.tag-cloud-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.tag-cloud-item {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;
}

.tag-cloud-item:hover {
  background: var(--vp-c-brand);
  color: white;
  transform: scale(1.05);
}

.tag-count {
  margin-left: 0.25rem;
  opacity: 0.7;
  font-size: 0.875em;
}
</style>
