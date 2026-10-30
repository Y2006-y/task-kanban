const STORAGE_KEY = 'task-kanban-state'

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    if (!Array.isArray(parsed.tasks)) return null
    return parsed
  } catch (e) {
    return null
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    return true
  } catch (e) {
    return false
  }
}

export function clearState() {
  try {
    localStorage.removeItem(STORAGE_KEY)
    return true
  } catch (e) {
    return false
  }
}

export function generateId() {
  return 'task_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 8)
}