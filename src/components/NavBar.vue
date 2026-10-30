<script setup lang="ts">
import ThemeSelector from './ThemeSelector.vue'

defineProps<{
  totalCount: number
  starredCount: number
  urgentCount: number
  doneCount: number
}>()

const emit = defineEmits<{
  add: []
  reset: []
}>()
</script>

<template>
  <header class="navbar">
    <div class="brand">
      <span class="brand-icon">📋</span>
      <span class="brand-name">任务看板</span>
    </div>
    <div class="stats">
      <div class="stat">
        <span class="stat-num">{{ totalCount }}</span>
        <span class="stat-label">全部</span>
      </div>
      <div class="stat">
        <span class="stat-num star">{{ starredCount }}</span>
        <span class="stat-label">星标</span>
      </div>
      <div class="stat">
        <span class="stat-num urgent">{{ urgentCount }}</span>
        <span class="stat-label">紧急</span>
      </div>
      <div class="stat">
        <span class="stat-num done">{{ doneCount }}</span>
        <span class="stat-label">已完成</span>
      </div>
    </div>
    <div class="actions">
      <button class="btn-add" @click="emit('add')">➕ 新增任务</button>
      <button class="btn-reset" @click="emit('reset')">🔄 重置</button>
      <ThemeSelector />
    </div>
  </header>
</template>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-4) var(--space-6);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 10;
  gap: var(--space-4);
  flex-wrap: wrap;
}
.brand {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.brand-icon {
  font-size: 26px;
}
.brand-name {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-text);
  background: linear-gradient(90deg, var(--color-primary), var(--color-primary-hover));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.stats {
  display: flex;
  gap: var(--space-5);
}
.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 56px;
}
.stat-num {
  font-size: 22px;
  font-weight: 700;
  color: var(--color-text);
}
.stat-num.star {
  color: var(--color-star);
}
.stat-num.urgent {
  color: var(--color-danger);
}
.stat-num.done {
  color: var(--color-success);
}
.stat-label {
  font-size: 12px;
  color: var(--color-text-muted);
}
.actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
.btn-add,
.btn-reset {
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
}
.btn-add {
  background: var(--color-primary);
  color: #fff;
}
.btn-add:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}
.btn-reset {
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
}
.btn-reset:hover {
  background: var(--color-border);
}
@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: stretch;
  }
  .stats {
    justify-content: space-around;
  }
}
</style>