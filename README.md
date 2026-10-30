---
title: 任务看板
---

# 任务看板

Vue3 + Vite + localStorage 纯前端任务管理看板应用。

## 功能特性

- 三列看板：待办 / 进行中 / 已完成，支持拖拽移动
- 任务增删改：优先级标签、截止日期、自定义标签
- 主题切换：多种配色方案，浅色背景青绿色卡片风格
- 数据持久化：localStorage 本地存储，刷新不丢失
- 动画反馈：涟漪效果、趣味提示、完成庆祝动画

## 技术栈

- Vue 3（Composition API）
- Vite 构建工具
- TypeScript 类型支持
- Vitest 单元测试（19 个用例全通过）

## 快速开始

```bash
npm install
npm run dev
```

## 项目结构

```
src/
  components/    9 个 Vue 组件
  composables/   状态管理与逻辑复用
  config/        主题与提示文案配置
  utils/         存储与时间格式化工具
  styles/        CSS 变量定义
tests/           单元测试
```