export interface Theme {
  id: string
  name: string
  icon: string
  vars: Record<string, string>
}

export const themes: Theme[] = [
  {
    id: 'light',
    name: '亮色',
    icon: '☀️',
    vars: {
      '--color-bg': '#f5f7fa',
      '--color-bg-elevated': '#ffffff',
      '--color-surface': '#ffffff',
      '--color-surface-hover': '#f0f4f8',
      '--color-border': '#e2e8f0',
      '--color-text': '#1e293b',
      '--color-text-secondary': '#64748b',
      '--color-text-muted': '#94a3b8',
      '--color-primary': '#0d9488',
      '--color-primary-hover': '#0f766e',
      '--color-primary-light': '#ccfbf1',
      '--color-todo-bg': '#f1f5f9',
      '--color-doing-bg': '#e0f2fe',
      '--color-done-bg': '#d1fae5'
    }
  },
  {
    id: 'dark',
    name: '暗色',
    icon: '🌙',
    vars: {
      '--color-bg': '#0f172a',
      '--color-bg-elevated': '#1e293b',
      '--color-surface': '#1e293b',
      '--color-surface-hover': '#334155',
      '--color-border': '#334155',
      '--color-text': '#f1f5f9',
      '--color-text-secondary': '#cbd5e1',
      '--color-text-muted': '#94a3b8',
      '--color-primary': '#14b8a6',
      '--color-primary-hover': '#2dd4bf',
      '--color-primary-light': '#134e4a',
      '--color-todo-bg': '#1e293b',
      '--color-doing-bg': '#0c4a6e',
      '--color-done-bg': '#064e3b'
    }
  },
  {
    id: 'colorful',
    name: '多彩',
    icon: '🎨',
    vars: {
      '--color-bg': '#fef3f2',
      '--color-bg-elevated': '#ffffff',
      '--color-surface': '#ffffff',
      '--color-surface-hover': '#fff1f2',
      '--color-border': '#fecdd3',
      '--color-text': '#4c051d',
      '--color-text-secondary': '#9f1239',
      '--color-text-muted': '#e11d48',
      '--color-primary': '#e11d48',
      '--color-primary-hover': '#be123c',
      '--color-primary-light': '#ffe4e6',
      '--color-todo-bg': '#fef3f2',
      '--color-doing-bg': '#ede9fe',
      '--color-done-bg': '#d1fae5'
    }
  }
]

export const defaultThemeId = 'light'