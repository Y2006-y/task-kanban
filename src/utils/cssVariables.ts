export function applyTheme(vars: Record<string, string>) {
  const root = document.documentElement
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

export function clearTheme() {
  const root = document.documentElement
  const knownVars = [
    '--color-bg',
    '--color-bg-elevated',
    '--color-surface',
    '--color-surface-hover',
    '--color-border',
    '--color-text',
    '--color-text-secondary',
    '--color-text-muted',
    '--color-primary',
    '--color-primary-hover',
    '--color-primary-light',
    '--color-todo-bg',
    '--color-doing-bg',
    '--color-done-bg'
  ]
  knownVars.forEach((v) => root.style.removeProperty(v))
}

export function getCssVariable(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim()
}