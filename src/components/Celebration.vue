<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    visible: boolean
    effect?: 'confetti' | 'stars' | 'hearts'
    duration?: number
  }>(),
  { effect: 'confetti', duration: 2500 }
)

const emit = defineEmits<{
  complete: []
}>()

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let raf = 0
let startTime = 0

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  shape: string
  rotation: number
  vr: number
  life: number
}

const colors = ['#f43f5e', '#f59e0b', '#10b981', '#0ea5e9', '#8b5cf6', '#ec4899']
const shapes: Record<string, string[]> = {
  confetti: ['rect', 'rect', 'circle'],
  stars: ['star'],
  hearts: ['heart']
}

function createParticle(width: number, height: number): Particle {
  const shapeList = shapes[props.effect] || shapes.confetti
  return {
    x: width / 2 + (Math.random() - 0.5) * 200,
    y: height / 2,
    vx: (Math.random() - 0.5) * 12,
    vy: -Math.random() * 14 - 6,
    size: Math.random() * 8 + 6,
    color: colors[Math.floor(Math.random() * colors.length)],
    shape: shapeList[Math.floor(Math.random() * shapeList.length)],
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 0.3,
    life: 1
  }
}

function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath()
  for (let i = 0; i < 5; i++) {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2
    const r = i % 2 === 0 ? size : size / 2
    const px = x + Math.cos(angle) * r
    const py = y + Math.sin(angle) * r
    if (i === 0) ctx.moveTo(px, py)
    else ctx.lineTo(px, py)
  }
  ctx.closePath()
  ctx.fill()
}

function drawHeart(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
  ctx.beginPath()
  ctx.moveTo(x, y + size / 4)
  ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4)
  ctx.bezierCurveTo(x - size / 2, y + size / 2, x, y + size, x, y + size)
  ctx.bezierCurveTo(x, y + size, x + size / 2, y + size / 2, x + size / 2, y + size / 4)
  ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4)
  ctx.fill()
}

function animate() {
  if (!ctx || !canvas.value) return
  const w = canvas.value.width
  const h = canvas.value.height
  ctx.clearRect(0, 0, w, h)

  particles.forEach((p) => {
    p.vy += 0.4
    p.x += p.vx
    p.y += p.vy
    p.rotation += p.vr
    p.life -= 0.008

    if (p.life <= 0) return
    ctx.save()
    ctx.globalAlpha = Math.max(0, p.life)
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.fillStyle = p.color
    if (p.shape === 'rect') {
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
    } else if (p.shape === 'circle') {
      ctx.beginPath()
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
      ctx.fill()
    } else if (p.shape === 'star') {
      drawStar(ctx, 0, 0, p.size)
    } else if (p.shape === 'heart') {
      drawHeart(ctx, 0, 0, p.size)
    }
    ctx.restore()
  })

  particles = particles.filter((p) => p.life > 0 && p.y < h + 50)

  if (particles.length > 0 && Date.now() - startTime < props.duration + 1000) {
    raf = requestAnimationFrame(animate)
  } else {
    cancelAnimationFrame(raf)
    emit('complete')
  }
}

function start() {
  if (!canvas.value) return
  const dpr = window.devicePixelRatio || 1
  canvas.value.width = window.innerWidth * dpr
  canvas.value.height = window.innerHeight * dpr
  canvas.value.style.width = window.innerWidth + 'px'
  canvas.value.style.height = window.innerHeight + 'px'
  ctx = canvas.value.getContext('2d')
  if (ctx) ctx.scale(dpr, dpr)

  const count = props.effect === 'hearts' ? 40 : 120
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(window.innerWidth, window.innerHeight))
  }
  startTime = Date.now()
  raf = requestAnimationFrame(animate)
}

watch(
  () => props.visible,
  (val) => {
    if (val) {
      setTimeout(start, 50)
    }
  }
)

onMounted(() => {
  if (props.visible) start()
})
onUnmounted(() => cancelAnimationFrame(raf))
</script>

<template>
  <canvas v-if="visible" ref="canvas" class="celebration-canvas"></canvas>
</template>

<style scoped>
.celebration-canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--z-celebration);
  pointer-events: none;
}
</style>