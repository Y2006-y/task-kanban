import { ref } from 'vue'
import { themes, defaultThemeId } from '../config/themes'
import { applyTheme } from '../utils/cssVariables'

const STORAGE_KEY = 'task-kanban-theme'
const currentId = ref(localStorage.getItem(STORAGE_KEY) || defaultThemeId)

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, currentId.value)
  } catch (e) {
    // ignore
  }
}

export function useTheme() {
  function getTheme(id: string) {
    return themes.find((t) => t.id === id) || themes[0]
  }

  function setTheme(id: string) {
    currentId.value = id
    const theme = getTheme(id)
    applyTheme(theme.vars)
    persist()
  }

  function preview(id: string) {
    const theme = getTheme(id)
    applyTheme(theme.vars)
  }

  function cancelPreview() {
    const theme = getTheme(currentId.value)
    applyTheme(theme.vars)
  }

  function cycle() {
    const idx = themes.findIndex((t) => t.id === currentId.value)
    const next = themes[(idx + 1) % themes.length]
    setTheme(next.id)
  }

  const current = () => getTheme(currentId.value)

  // 初始化应用当前主题
  setTheme(currentId.value)

  return {
    themes,
    currentId,
    current,
    setTheme,
    preview,
    cancelPreview,
    cycle
  }
}