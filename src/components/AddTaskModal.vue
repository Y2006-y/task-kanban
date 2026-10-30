<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps<{
  visible: boolean
  columns: { id: string; title: string }[]
  existingCategories: string[]
  defaultColumnId?: string
}>()

const emit = defineEmits<{
  submit: [task: { title: string; description: string; category: string; columnId: string }]
  close: []
}>()

const title = ref('')
const description = ref('')
const category = ref('')
const columnId = ref(props.defaultColumnId || 'todo')
const titleRef = ref<HTMLInputElement | null>(null)
const error = ref('')

const suggestions = computed(() => {
  if (!category.value) return []
  return props.existingCategories.filter((c) => c.includes(category.value) && c !== category.value).slice(0, 5)
})

watch(
  () => props.visible,
  (val) => {
    if (val) {
      title.value = ''
      description.value = ''
      category.value = ''
      columnId.value = props.defaultColumnId || 'todo'
      error.value = ''
      nextTick(() => titleRef.value?.focus())
    }
  }
)

function submit() {
  if (!title.value.trim()) {
    error.value = '请输入任务标题'
    titleRef.value?.focus()
    return
  }
  emit('submit', {
    title: title.value.trim(),
    description: description.value.trim(),
    category: category.value.trim(),
    columnId: columnId.value
  })
}

function pickSuggestion(s: string) {
  category.value = s
}
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="modal-mask" @click.self="emit('close')">
      <Transition name="modal" appear>
        <div v-if="visible" class="modal-box">
          <header class="modal-header">
            <h3>新增任务</h3>
            <button class="modal-close" @click="emit('close')">✕</button>
          </header>
          <div class="modal-body">
            <div class="field">
              <label :class="{ float: title }">任务标题 *</label>
              <input ref="titleRef" v-model="title" type="text" @keyup.enter="submit" />
            </div>
            <div v-if="error" class="field-error">{{ error }}</div>
            <div class="field">
              <label :class="{ float: description }">描述（可选）</label>
              <textarea v-model="description" rows="3"></textarea>
            </div>
            <div class="field">
              <label :class="{ float: category }">分类</label>
              <input v-model="category" type="text" list="cat-list" />
              <datalist id="cat-list">
                <option v-for="c in existingCategories" :key="c" :value="c" />
              </datalist>
              <div v-if="suggestions.length" class="suggestions">
                <span v-for="s in suggestions" :key="s" class="suggestion" @click="pickSuggestion(s)">{{ s }}</span>
              </div>
            </div>
            <div class="field">
              <label class="float">所在列</label>
              <select v-model="columnId">
                <option v-for="c in columns" :key="c.id" :value="c.id">{{ c.title }}</option>
              </select>
            </div>
          </div>
          <footer class="modal-footer">
            <button class="btn-cancel" @click="emit('close')">取消</button>
            <button class="btn-submit" @click="submit">添加任务</button>
          </footer>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--z-modal);
  backdrop-filter: blur(2px);
}
.modal-box {
  width: 460px;
  max-width: 92vw;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  overflow: hidden;
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border);
}
.modal-header h3 {
  font-size: 18px;
  font-weight: 600;
}
.modal-close {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  font-size: 16px;
  color: var(--color-text-muted);
}
.modal-close:hover {
  background: var(--color-surface-hover);
  color: var(--color-text);
}
.modal-body {
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}
.field {
  position: relative;
}
.field label {
  position: absolute;
  top: 10px;
  left: 12px;
  color: var(--color-text-muted);
  font-size: 14px;
  pointer-events: none;
  transition: all var(--transition-fast);
  background: var(--color-surface);
  padding: 0 4px;
}
.field label.float {
  top: -8px;
  font-size: 12px;
  color: var(--color-primary);
}
.field input,
.field textarea,
.field select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-surface);
  color: var(--color-text);
  transition: border-color var(--transition-fast);
}
.field input:focus,
.field textarea:focus,
.field select:focus {
  outline: none;
  border-color: var(--color-primary);
}
.field-error {
  color: var(--color-danger);
  font-size: 12px;
  margin-top: -8px;
}
.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}
.suggestion {
  font-size: 12px;
  padding: 2px 8px;
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-radius: var(--radius-full);
  cursor: pointer;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border);
}
.btn-cancel,
.btn-submit {
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-md);
  font-size: 14px;
  font-weight: 500;
  transition: all var(--transition-fast);
}
.btn-cancel {
  background: var(--color-surface-hover);
  color: var(--color-text-secondary);
}
.btn-cancel:hover {
  background: var(--color-border);
}
.btn-submit {
  background: var(--color-primary);
  color: #fff;
}
.btn-submit:hover {
  background: var(--color-primary-hover);
}
</style>