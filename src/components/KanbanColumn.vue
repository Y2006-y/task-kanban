<script setup lang="ts">
import { ref, computed } from 'vue'
import TaskCard from './TaskCard.vue'
import EmptyState from './EmptyState.vue'
import type { Column, Task } from '../composables/useKanban'

const props = defineProps<{
  column: Column
  taskList: Task[]
}>()

const emit = defineEmits<{
  move: [taskId: string, columnId: string, index?: number]
  toggle: [id: string, flag: 'starred' | 'urgent']
  remove: [id: string]
  add: [columnId: string]
}>()

const dragOver = ref(false)
const dragOverIndex = ref(-1)

function onDragOver(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) e.dataTransfer.dropEffect = 'move'
  dragOver.value = true
}

function onDragLeave() {
  dragOver.value = false
  dragOverIndex.value = -1
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  const taskId = e.dataTransfer?.getData('text/plain')
  if (taskId) {
    emit('move', taskId, props.column.id, dragOverIndex.value > -1 ? dragOverIndex.value : undefined)
  }
  dragOver.value = false
  dragOverIndex.value = -1
}

const columnBg = computed(() => {
  const map: Record<string, string> = {
    todo: 'var(--color-todo-bg)',
    doing: 'var(--color-doing-bg)',
    done: 'var(--color-done-bg)'
  }
  return map[props.column.id] || 'var(--color-surface)'
})
</script>

<template>
  <section
    class="kanban-column"
    :class="{ 'drag-over': dragOver }"
    :style="{ background: columnBg }"
    @dragover="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <header class="column-header">
      <div class="column-title">
        <span class="column-dot" :style="{ background: column.color }"></span>
        <span>{{ column.title }}</span>
        <span class="column-count">{{ taskList.length }}</span>
      </div>
      <button class="column-add" @click="emit('add', column.id)" title="在此列新增">+</button>
    </header>
    <div class="column-body">
      <TaskCard
        v-for="(task, idx) in taskList"
        :key="task.id"
        :task="task"
        @toggle="(id, flag) => emit('toggle', id, flag)"
        @remove="(id) => emit('remove', id)"
      />
      <EmptyState
        v-if="taskList.length === 0"
        :icon="column.id === 'todo' ? '📝' : column.id === 'doing' ? '⏳' : '✅'"
        :title="`暂无${column.title}任务`"
        hint="拖拽任务到此列"
        :action-text="`新增${column.title}任务`"
        action-icon="➕"
        @action="emit('add', column.id)"
      />
    </div>
  </section>
</template>

<style scoped>
.kanban-column {
  display: flex;
  flex-direction: column;
  min-width: 280px;
  width: 320px;
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  border: 2px dashed transparent;
  transition: border-color var(--transition-fast);
  max-height: calc(100vh - 140px);
}
.kanban-column.drag-over {
  border-color: var(--color-primary);
}
.column-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-2);
  margin-bottom: var(--space-2);
}
.column-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
}
.column-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.column-count {
  background: var(--color-surface);
  color: var(--color-text-secondary);
  font-size: 12px;
  padding: 1px 8px;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-border);
}
.column-add {
  width: 28px;
  height: 28px;
  border-radius: var(--radius-sm);
  font-size: 18px;
  color: var(--color-text-secondary);
  transition: all var(--transition-fast);
}
.column-add:hover {
  background: var(--color-primary);
  color: #fff;
}
.column-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  overflow-y: auto;
  padding: var(--space-1);
}
</style>