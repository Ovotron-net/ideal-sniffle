import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  opacity: number
}

export function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function createParticles() {
      const count = Math.min(80, Math.floor((canvas!.width * canvas!.height) / 15000))
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      }))
    }

    function resize() {
      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      createParticles()
    }

    function onMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function animate() {
      const particles = particlesRef.current
      const mouse = mouseRef.current

      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      const gridSize = 60
      ctx!.strokeStyle = 'rgba(0, 212, 255, 0.04)'
      ctx!.lineWidth = 1

      for (let x = 0; x < canvas!.width; x += gridSize) {
        ctx!.beginPath()
        ctx!.moveTo(x, 0)
        ctx!.lineTo(x, canvas!.height)
        ctx!.stroke()
      }
      for (let y = 0; y < canvas!.height; y += gridSize) {
        ctx!.beginPath()
        ctx!.moveTo(0, y)
        ctx!.lineTo(canvas!.width, y)
        ctx!.stroke()
      }

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas!.width
        if (p.x > canvas!.width) p.x = 0
        if (p.y < 0) p.y = canvas!.height
        if (p.y > canvas!.height) p.y = 0

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.x -= dx * 0.008
          p.y -= dy * 0.008
        }

        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(0, 212, 255, ${p.opacity})`
        ctx!.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const d = Math.hypot(p.x - p2.x, p.y - p2.y)
          if (d < 120) {
            ctx!.beginPath()
            ctx!.moveTo(p.x, p.y)
            ctx!.lineTo(p2.x, p2.y)
            ctx!.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - d / 120)})`
            ctx!.stroke()
          }
        }
      })

      frameRef.current = requestAnimationFrame(animate)
    }

    let resizeTimer: ReturnType<typeof setTimeout>
    function debouncedResize() {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 200)
    }

    resize()
    animate()
    window.addEventListener('resize', debouncedResize)
    document.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(frameRef.current)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', debouncedResize)
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} id="grid-canvas" aria-hidden="true" />
}