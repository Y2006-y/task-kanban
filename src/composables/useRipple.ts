export function useRipple() {
  function createRipple(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement
    if (!target) return
    const rect = target.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const ripple = document.createElement('span')
    ripple.style.position = 'absolute'
    ripple.style.width = `${size}px`
    ripple.style.height = `${size}px`
    ripple.style.left = `${x}px`
    ripple.style.top = `${y}px`
    ripple.style.borderRadius = '50%'
    ripple.style.background = 'rgba(255,255,255,0.4)'
    ripple.style.transform = 'scale(0)'
    ripple.style.animation = 'ripple 0.6s linear'
    ripple.style.pointerEvents = 'none'

    const prev = target.style.position
    if (prev === 'static' || !prev) target.style.position = 'relative'
    target.appendChild(ripple)

    setTimeout(() => ripple.remove(), 600)
  }

  return { createRipple }
}