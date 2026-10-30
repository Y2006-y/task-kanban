<script setup lang="ts">
import { useToast } from '../composables/useToast'

const { toasts, remove } = useToast()
</script>

<template>
  <div class="toast-container">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="toast-item"
        :class="`toast-${t.type}`"
        @mouseenter="() => {}"
        @click="remove(t.id)"
      >
        <span class="toast-message">{{ t.message }}</span>
        <div class="toast-progress"></div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: var(--space-6);
  right: var(--space-6);
  z-index: var(--z-toast);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  pointer-events: none;
}
.toast-item {
  pointer-events: auto;
  min-width: 220px;
  max-width: 360px;
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  color: var(--color-text);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
  border-left: 4px solid var(--color-primary);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  font-size: 14px;
}
.toast-success {
  border-left-color: var(--color-success);
}
.toast-error {
  border-left-color: var(--color-danger);
}
.toast-message {
  display: block;
}
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: linear-gradient(90deg, var(--color-primary), transparent);
  animation: shrink 3s linear forwards;
}
@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
</style>