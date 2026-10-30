import { ref } from 'vue'

export interface ToastItem {
  id: number
  message: string
  type: string
}

const toasts = ref<ToastItem[]>([])
let seed = 0

export function useToast() {
  function show(message: string, type = 'info') {
    const id = ++seed
    toasts.value.push({ id, message, type })
    setTimeout(() => remove(id), 3000)
    return id
  }

  function remove(id: number) {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  function clear() {
    toasts.value = []
  }

  function success(message: string) {
    return show(message, 'success')
  }

  function error(message: string) {
    return show(message, 'error')
  }

  return { toasts, show, remove, clear, success, error }
}