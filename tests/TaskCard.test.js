import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TaskCard from '../src/components/TaskCard.vue'

const baseTask = {
  id: 't1',
  title: '测试任务',
  description: '描述',
  category: '开发',
  columnId: 'todo',
  starred: false,
  urgent: false,
  createdAt: Date.now()
}

describe('TaskCard', () => {
  it('渲染标题与分类', () => {
    const wrapper = mount(TaskCard, { props: { task: baseTask } })
    expect(wrapper.text()).toContain('测试任务')
    expect(wrapper.text()).toContain('开发')
  })

  it('点击星标触发 toggle 事件', async () => {
    const wrapper = mount(TaskCard, { props: { task: baseTask } })
    await wrapper.find('.star-btn').trigger('click')
    expect(wrapper.emitted('toggle')).toBeTruthy()
    expect(wrapper.emitted('toggle')[0]).toEqual(['t1', 'starred'])
  })

  it('点击紧急触发 toggle urgent', async () => {
    const wrapper = mount(TaskCard, { props: { task: baseTask } })
    await wrapper.find('.urgent-btn').trigger('click')
    expect(wrapper.emitted('toggle')[0]).toEqual(['t1', 'urgent'])
  })

  it('点击删除触发 remove', async () => {
    const wrapper = mount(TaskCard, { props: { task: baseTask } })
    await wrapper.find('.delete-btn').trigger('click')
    expect(wrapper.emitted('remove')).toBeTruthy()
    expect(wrapper.emitted('remove')[0]).toEqual(['t1'])
  })

  it('draggable 属性为 true', () => {
    const wrapper = mount(TaskCard, { props: { task: baseTask } })
    expect(wrapper.find('.task-card').attributes('draggable')).toBe('true')
  })
})