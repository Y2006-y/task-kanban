import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AddTaskModal from '../src/components/AddTaskModal.vue'

const columns = [
  { id: 'todo', title: '待办' },
  { id: 'doing', title: '进行中' },
  { id: 'done', title: '已完成' }
]

describe('AddTaskModal', () => {
  it('visible 时渲染弹窗', () => {
    const wrapper = mount(AddTaskModal, {
      props: { visible: true, columns, existingCategories: [] }
    })
    expect(wrapper.text()).toContain('新增任务')
  })

  it('空标题提交不触发 submit', async () => {
    const wrapper = mount(AddTaskModal, {
      props: { visible: true, columns, existingCategories: [] }
    })
    await wrapper.find('.btn-submit').trigger('click')
    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('填写标题后提交触发 submit 事件', async () => {
    const wrapper = mount(AddTaskModal, {
      props: { visible: true, columns, existingCategories: [] }
    })
    const inputs = wrapper.findAll('input')
    await inputs[0].setValue('我的任务')
    await wrapper.find('.btn-submit').trigger('click')
    expect(wrapper.emitted('submit')).toBeTruthy()
    const payload = wrapper.emitted('submit')[0][0]
    expect(payload.title).toBe('我的任务')
    expect(payload.columnId).toBe('todo')
  })

  it('取消按钮触发 close', async () => {
    const wrapper = mount(AddTaskModal, {
      props: { visible: true, columns, existingCategories: [] }
    })
    await wrapper.find('.btn-cancel').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })

  it('已有分类通过 datalist 提供', () => {
    const wrapper = mount(AddTaskModal, {
      props: { visible: true, columns, existingCategories: ['开发', '测试'] }
    })
    const options = wrapper.find('datalist').findAll('option')
    expect(options.length).toBe(2)
    expect(options[0].attributes('value')).toBe('开发')
  })
})