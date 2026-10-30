<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'

const { themes, currentId, setTheme, preview, cancelPreview } = useTheme()
const open = ref(false)

function toggle() {
  open.value = !open.value
}

function select(id: string) {
  setTheme(id)
  open.value = false
}

function onPreview(id: string) {
  preview(id)
}

function onLeave() {
  cancelPreview()
}

function onDocClick(e: MouseEvent) {
  const el = e.target as HTMLElement
  if (!el.closest('.theme-selector')) open.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div class="theme-selector">
    <button class="theme-trigger" @click="toggle" title="切换主题">
      <span class="theme-icon">{{ themes.find((t) => t.id === currentId)?.icon }}</span>
    </button>
    <Transition name="slide-up">
      <ul v-if="open" class="theme-menu">
        <li
          v-for="t in themes"
          :key="t.id"
          :class="{ active: t.id === currentId }"
          @click="select(t.id)"
          @mouseenter="onPreview(t.id)"
          @mouseleave="onLeave"
        >
          <span class="theme-menu-icon">{{ t.icon }}</span>
          <span class="theme-menu-name">{{ t.name }}</span>
          <span v-if="t.id === currentId" class="theme-check">✓</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.theme-selector {
  position: relative;
}
.theme-trigger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  font-size: 18px;
  transition: all var(--transition-fast);
}
.theme-trigger:hover {
  background: var(--color-surface-hover);
  transform: translateY(-1px);
}
.theme-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  min-width: 160px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  padding: var(--space-1);
  z-index: var(--z-dropdown);
}
.theme-menu li {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-sm);
  cursor: pointer;
  font-size: 14px;
  transition: background var(--transition-fast);
}
.theme-menu li:hover {
  background: var(--color-surface-hover);
}
.theme-menu li.active {
  color: var(--color-primary);
  font-weight: 600;
}
.theme-menu-icon {
  font-size: 16px;
}
.theme-check {
  margin-left: auto;
  color: var(--color-primary);
}
</style>