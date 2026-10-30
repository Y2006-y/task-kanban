import { ref, computed, watch } from 'vue'
import { loadState, saveState, clearState, generateId } from '../utils/storage'

export interface Task {
  id: string
  title: string
  description?: string
  category?: string
  columnId: 'todo' | 'doing' | 'done'
  starred: boolean
  urgent: boolean
  createdAt: number
}

export interface Column {
  id: string
  title: string
  color: string
}

const defaultColumns: Column[] = [
  { id: 'todo', title: '待办', color: 'var(--color-todo)' },
  { id: 'doing', title: '进行中', color: 'var(--color-doing)' },
  { id: 'done', title: '已完成', color: 'var(--color-done)' }
]

const defaultTasks: Task[] = [
  {
    id: 'demo_1',
    title: '欢迎使用任务看板',
    description: '拖拽卡片可在列之间流转，点击星标或紧急按钮可标记任务',
    category: '示例',
    columnId: 'todo',
    starred: true,
    urgent: false,
    createdAt: Date.now() - 3600000
  },
  {
    id: 'demo_2',
    title: '体验主题切换',
    description: '右上角可切换亮色/暗色/多彩主题',
    category: '示例',
    columnId: 'doing',
    starred: false,
    urgent: false,
    createdAt: Date.now() - 7200000
  },
  {
    id: 'demo_3',
    title: '完成第一个任务',
    description: '把这张卡片拖到"已完成"列试试庆祝动画',
    category: '示例',
    columnId: 'done',
    starred: false,
    urgent: false,
    createdAt: Date.now() - 10800000
  }
]

export function useKanban() {
  const persisted = loadState()
  const tasks = ref<Task[]>(persisted?.tasks ?? defaultTasks)
  const columns = ref<Column[]>(defaultColumns)

  const tasksByColumn = computed(() => {
    const map: Record<string, Task[]> = {}
    for (const col of columns.value) {
      map[col.id] = tasks.value.filter((t) => t.columnId === col.id)
    }
    return map
  })

  const totalCount = computed(() => tasks.value.length)
  const starredCount = computed(() => tasks.value.filter((t) => t.starred).length)
  const urgentCount = computed(() => tasks.value.filter((t) => t.urgent).length)
  const doneCount = computed(() => tasks.value.filter((t) => t.columnId === 'done').length)

  const existingCategories = computed(() => {
    const set = new Set<string>()
    tasks.value.forEach((t) => {
      if (t.category) set.add(t.category)
    })
    return Array.from(set)
  })

  function addTask(data: Partial<Task>) {
    const task: Task = {
      id: generateId(),
      title: data.title || '',
      description: data.description || '',
      category: data.category || '',
      columnId: (data.columnId as Task['columnId']) || 'todo',
      starred: false,
      urgent: false,
      createdAt: Date.now()
    }
    tasks.value.push(task)
    return task
  }

  function removeTask(id: string) {
    const idx = tasks.value.findIndex((t) => t.id === id)
    if (idx !== -1) tasks.value.splice(idx, 1)
  }

  function moveTask(taskId: string, columnId: string, index?: number) {
    const task = tasks.value.find((t) => t.id === taskId)
    if (!task) return
    const oldColumnId = task.columnId
    task.columnId = columnId as Task['columnId']
    if (index !== undefined) {
      const list = tasks.value.filter((t) => t.id !== taskId && t.columnId === columnId)
      list.splice(index, 0, task)
      const others = tasks.value.filter((t) => t.id !== taskId && t.columnId !== columnId)
      tasks.value = [...others, ...list]
    }
    return oldColumnId
  }

  function toggleStar(id: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.starred = !task.starred
  }

  function toggleUrgent(id: string) {
    const task = tasks.value.find((t) => t.id === id)
    if (task) task.urgent = !task.urgent
  }

  function reset() {
    tasks.value = []
    clearState()
  }

  watch(
    tasks,
    (val) => {
      saveState({ tasks: val })
    },
    { deep: true }
  )

  return {
    columns,
    tasks,
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
  }
}