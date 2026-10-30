<script setup lang="ts">
defineProps<{
  icon?: string
  title?: string
  hint?: string
  actionText?: string
  actionIcon?: string
}>()

const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="empty-state">
    <div class="empty-icon">{{ icon || '📭' }}</div>
    <div class="empty-title">{{ title || '暂无任务' }}</div>
    <div class="empty-hint">{{ hint || '拖拽任务到此列' }}</div>
    <button v-if="actionText" class="empty-action" @click="emit('action')">
      <span v-if="actionIcon">{{ actionIcon }}</span>
      {{ actionText }}
    </button>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-8) var(--space-4);
  color: var(--color-text-muted);
  text-align: center;
  gap: var(--space-2);
}
.empty-icon {
  font-size: 48px;
  opacity: 0.6;
  animation: pulse 2.5s ease-in-out infinite;
}
.empty-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text-secondary);
}
.empty-hint {
  font-size: 13px;
}
.empty-action {
  margin-top: var(--space-3);
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary);
  color: #fff;
  border-radius: var(--radius-md);
  font-size: 13px;
  font-weight: 500;
  transition: background var(--transition-fast);
}
.empty-action:hover {
  background: var(--color-primary-hover);
}
</style>