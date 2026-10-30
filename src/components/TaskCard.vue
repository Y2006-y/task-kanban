<script setup lang="ts">
import { computed } from 'vue'
import { formatRelativeTime } from '../utils/timeFormat'
import type { Task } from '../composables/useKanban'

const props = defineProps<{ task: Task }>()

const emit = defineEmits<{
  toggle: [id: string, flag: 'starred' | 'urgent']
  remove: [id: string]
  dragstart: [id: string]
}>()

const timeText = computed(() => formatRelativeTime(props.task.createdAt))

function onDragStart(e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', props.task.id)
  }
  emit('dragstart', props.task.id)
}
</script>

<template>
  <div
    class="task-card"
    :class="{ starred: task.starred, urgent: task.urgent }"
    draggable="true"
    @dragstart="onDragStart"
  >
    <div class="card-header">
      <span v-if="task.category" class="card-category">{{ task.category }}</span>
      <div class="card-actions">
        <button
          class="icon-btn star-btn"
          :class="{ active: task.starred }"
          @click="emit('toggle', task.id, 'starred')"
          :title="task.starred ? '取消星标' : '加星标'"
        >
          {{ task.starred ? '⭐' : '☆' }}
        </button>
        <button
          class="icon-btn urgent-btn"
          :class="{ active: task.urgent }"
          @click="emit('toggle', task.id, 'urgent')"
          :title="task.urgent ? '取消紧急' : '标记紧急'"
        >
          {{ task.urgent ? '🚨' : '🚩' }}
        </button>
        <button class="icon-btn delete-btn" @click="emit('remove', task.id)" title="删除">
          🗑️
        </button>
      </div>
    </div>
    <div class="card-title">{{ task.title }}</div>
    <div v-if="task.description" class="card-desc">{{ task.description }}</div>
    <div class="card-footer">
      <span class="card-time">🕒 {{ timeText }}</span>
    </div>
  </div>
</template>

<style scoped>
.task-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  box-shadow: var(--shadow-sm);
  cursor: grab;
  transition: all var(--transition-fast);
  border-left: 3px solid transparent;
}
.task-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
.task-card:active {
  cursor: grabbing;
}
.task-card.starred {
  border-left-color: var(--color-star);
  background: linear-gradient(90deg, rgba(251, 191, 36, 0.08), var(--color-surface) 30%);
}
.task-card.urgent {
  border-color: var(--color-danger);
  border-left: 3px solid var(--color-danger);
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}
.card-category {
  font-size: 11px;
  padding: 2px var(--space-2);
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  font-weight: 500;
}
.card-actions {
  display: flex;
  gap: 2px;
}
.icon-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-sm);
  font-size: 13px;
  opacity: 0.55;
  transition: all var(--transition-fast);
}
.icon-btn:hover {
  opacity: 1;
  background: var(--color-surface-hover);
}
.icon-btn.active {
  opacity: 1;
}
.star-btn.active {
  color: var(--color-star);
}
.urgent-btn.active {
  color: var(--color-danger);
}
.delete-btn:hover {
  color: var(--color-danger);
}
.card-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.4;
  margin-bottom: var(--space-1);
}
.card-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.5;
  margin-bottom: var(--space-2);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-footer {
  display: flex;
  justify-content: flex-end;
  font-size: 11px;
  color: var(--color-text-muted);
}
</style>