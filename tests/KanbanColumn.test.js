import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import KanbanColumn from '../src/components/KanbanColumn.vue'

const column = { id: 'todo', title: '待办', color: 'var(--color-todo)' }
const tasks = [
  { id: '1', title: 'A', columnId: 'todo', starred: false, urgent: false, createdAt: 0 },
  { id: '2', title: 'B', columnId: 'todo', starred: false, urgent: false, createdAt: 0 }
]

describe('KanbanColumn', () => {
  it('渲染列标题与计数', () => {
    const wrapper = mount(KanbanColumn, { props: { column, taskList: tasks } })
    expect(wrapper.text()).toContain('待办')
    expect(wrapper.text()).toContain('2')
  })

  it('空列显示空状态', () => {
    const wrapper = mount(KanbanColumn, { props: { column, taskList: [] } })
    expect(wrapper.text()).toContain('暂无待办任务')
  })

  it('点击新增按钮触发 add 事件', async () => {
    const wrapper = mount(KanbanColumn, { props: { column, taskList: [] } })
    await wrapper.find('.column-add').trigger('click')
    expect(wrapper.emitted('add')).toBeTruthy()
    expect(wrapper.emitted('add')[0]).toEqual(['todo'])
  })

  it('drop 事件携带任务 id', async () => {
    const wrapper = mount(KanbanColumn, { props: { column, taskList: [] } })
    const dropEvent = new Event('drop', { bubbles: true })
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: { getData: () => 'taskX', setData: () => {} }
    })
    await wrapper.find('.kanban-column').element.dispatchEvent(dropEvent)
    expect(wrapper.emitted('move')).toBeTruthy()
    expect(wrapper.emitted('move')[0][0]).toBe('taskX')
  })
})