export type ToastType =
  | 'add'
  | 'remove'
  | 'move'
  | 'star'
  | 'unstar'
  | 'urgent'
  | 'unurgent'
  | 'reset'
  | 'complete'

const messages: Record<ToastType, string[]> = {
  add: [
    '新任务已就位，加油干！💪',
    '又多了一个目标，冲鸭！🚀',
    '任务已添加，记得按时完成哦~',
    '清单+1，成就感+1 ✨'
  ],
  remove: [
    '任务已移除，轻装上阵！',
    '拜拜了您嘞~ 👋',
    '删掉一个，清爽一分',
    '已删除，专注剩下的吧'
  ],
  move: [
    '状态已更新，节奏不错！',
    '流转起来啦~ 🔄',
    '换个列，换种心情',
    '进度推进中...'
  ],
  star: [
    '已标星，重点关照！⭐',
    '重要任务锁定！',
    '星星给你，加油哦~',
    '星标已点亮 ✨'
  ],
  unstar: ['取消星标，回归平凡', '星星收回~', '不再重点啦'],
  urgent: ['紧急任务！红色警报 🚨', '加急处理，别拖延！', '紧急模式开启！'],
  unurgent: ['解除紧急，松口气~', '不再紧急啦', '警报解除 ✅'],
  reset: ['看板已重置，重新出发！', '清空完毕，从零开始 🌱', '一切归零，蓄势待发'],
  complete: ['太棒了！任务完成 🎉', '又搞定一个，厉害！', '完成+1，成就感满满', '恭喜！撒花庆祝 🌸']
}

export function getRandomMessage(type: ToastType): string {
  const list = messages[type] || ['操作完成']
  return list[Math.floor(Math.random() * list.length)]
}