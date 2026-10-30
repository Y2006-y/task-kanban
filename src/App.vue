<script setup lang="ts">
import { ref } from 'vue'
import NavBar from './components/NavBar.vue'
import KanbanColumn from './components/KanbanColumn.vue'
import AddTaskModal from './components/AddTaskModal.vue'
import FunToast from './components/FunToast.vue'
import Celebration from './components/Celebration.vue'
import { useKanban } from './composables/useKanban'
import { useToast } from './composables/useToast'
import { getRandomMessage } from './config/toastMessages'

const {
  columns,
  tasksByColumn,
  totalCount,
  starredCount,
  urgentCount,
  doneCount,
  existingCategories,
  addTask,
  removeTask,
  moveTask,
  toggleStar,
  toggleUrgent,
  reset
} = useKanban()

const { show } = useToast()

const modalVisible = ref(false)
const defaultColumnId = ref('todo')
const celebrationVisible = ref(false)
const celebrationEffect = ref<'confetti' | 'stars' | 'hearts'>('confetti')

function openModal(columnId?: string) {
  defaultColumnId.value = columnId || 'todo'
  modalVisible.value = true
}

function onSubmit(task: { title: string; description: string; category: string; columnId: string }) {
  addTask(task)
  modalVisible.value = false
  show(getRandomMessage('add'), 'success')
}

function onMove(taskId: string, columnId: string, index?: number) {
  const task = tasksByColumn.value[columnId]?.find((t) => t.id === taskId)
  const wasDone = tasksByColumn.value['done']?.some((t) => t.id === taskId)
  const oldCol = moveTask(taskId, columnId, index)
  if (columnId === 'done' && !wasDone) {
    const effects: Array<'confetti' | 'stars' | 'hearts'> = ['confetti', 'stars', 'hearts']
    celebrationEffect.value = effects[Math.floor(Math.random() * effects.length)]
    celebrationVisible.value = true
    show(getRandomMessage('complete'), 'success')
  } else if (oldCol && oldCol !== columnId) {
    show(getRandomMessage('move'), 'success')
  }
}

function onToggle(id: string, flag: 'starred' | 'urgent') {
  if (flag === 'starred') {
    const task = (Object.values(tasksByColumn.value).flat() as any[]).find((t) => t.id === id)
    toggleStar(id)
    show(getRandomMessage(task?.starred ? 'unstar' : 'star'), 'success')
  } else {
    const task = (Object.values(tasksByColumn.value).flat() as any[]).find((t) => t.id === id)
    toggleUrgent(id)
    show(getRandomMessage(task?.urgent ? 'unurgent' : 'urgent'), 'success')
  }
}

function onRemove(id: string) {
  removeTask(id)
  show(getRandomMessage('remove'), 'success')
}

function onReset() {
  if (confirm('确定要清空所有任务吗？此操作不可恢复。')) {
    reset()
    show(getRandomMessage('reset'), 'success')
  }
}
</script>

<template>
  <div class="app">
    <NavBar
      :total-count="totalCount"
      :starred-count="starredCount"
      :urgent-count="urgentCount"
      :done-count="doneCount"
      @add="openModal()"
      @reset="onReset"
    />
    <main class="board">
      <KanbanColumn
        v-for="col in columns"
        :key="col.id"
        :column="col"
        :task-list="tasksByColumn[col.id] || []"
        @move="onMove"
        @toggle="onToggle"
        @remove="onRemove"
        @add="(cid) => openModal(cid)"
      />
    </main>
    <AddTaskModal
      :visible="modalVisible"
      :columns="columns"
      :existing-categories="existingCategories"
      :default-column-id="defaultColumnId"
      @submit="onSubmit"
      @close="modalVisible = false"
    />
    <FunToast />
    <Celebration
      :visible="celebrationVisible"
      :effect="celebrationEffect"
      :duration="2500"
      @complete="celebrationVisible = false"
    />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.board {
  flex: 1;
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4) var(--space-6);
  overflow-x: auto;
  align-items: flex-start;
}
@media (max-width: 768px) {
  .board {
    flex-direction: column;
    align-items: stretch;
  }
  .board :deep(.kanban-column) {
    width: 100%;
    min-width: 0;
  }
}
</style>