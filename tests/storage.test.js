import { describe, it, expect, beforeEach } from 'vitest'
import { loadState, saveState, clearState, generateId } from '../src/utils/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('loadState 返回 null 当无数据', () => {
    expect(loadState()).toBeNull()
  })

  it('saveState/loadState 正常读写', () => {
    const state = { tasks: [{ id: '1', title: 'test', columnId: 'todo', starred: false, urgent: false, createdAt: 0 }] }
    saveState(state)
    expect(loadState()).toEqual(state)
  })

  it('loadState 对格式错误数据降级返回 null', () => {
    localStorage.setItem('task-kanban-state', 'not-json')
    expect(loadState()).toBeNull()
    localStorage.setItem('task-kanban-state', JSON.stringify({ noTasks: true }))
    expect(loadState()).toBeNull()
  })

  it('clearState 清除数据', () => {
    saveState({ tasks: [] })
    clearState()
    expect(loadState()).toBeNull()
  })

  it('generateId 生成唯一 id', () => {
    const ids = new Set()
    for (let i = 0; i < 100; i++) ids.add(generateId())
    expect(ids.size).toBe(100)
  })
})