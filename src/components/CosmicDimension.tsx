import { useEffect, useRef, useState } from 'react'

interface Star {
  x: number
  y: number
  z: number
  size: number
  hue: number
}

interface Shard {
  angle: number
  radius: number
  size: number
  depth: number
  tilt: number
}

interface Mote {
  x: number
  y: number
  drift: number
  size: number
  alpha: number
  phase: number
}

interface CollapseParticle {
  angle: number
  radius: number
  speed: number
  hue: number
  size: number
}

const TAU = Math.PI * 2
const DURATION = 28

function clamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = clamp((value - edge0) / (edge1 - edge0))
  return x * x * (3 - 2 * x)
}

function seedRandom(seed: number) {
  let value = seed
  return () => {
    value = Math.sin(value * 12.9898 + 78.233) * 43758.5453
    return value - Math.floor(value)
  }
}

function buildStars(count: number) {
  const random = seedRandom(73.91)
  return Array.from({ length: count }, (): Star => ({
    x: (random() - 0.5) * 3,
    y: (random() - 0.5) * 2,
    z: random(),
    size: random() * 1.8 + 0.25,
    hue: random() > 0.72 ? 275 : random() > 0.45 ? 170 : 195,
  }))
}

function buildShards(count: number) {
  const random = seedRandom(19.84)
  return Array.from({ length: count }, (): Shard => ({
    angle: random() * TAU,
    radius: random() * 0.75 + 0.2,
    size: random() * 20 + 5,
    depth: random(),
    tilt: (random() - 0.5) * 1.4,
  }))
}

function buildMotes(count: number) {
  const random = seedRandom(41.37)
  return Array.from({ length: count }, (): Mote => ({
    x: random(),
    y: random(),
    drift: random() * 0.012 + 0.003,
    size: random() * 1.6 + 0.4,
    alpha: random() * 0.28 + 0.05,
    phase: random() * TAU,
  }))
}

function buildCollapseParticles(count: number) {
  const random = seedRandom(7.77)
  return Array.from({ length: count }, (): CollapseParticle => ({
    angle: random() * TAU,
    radius: 0.25 + random() * 0.85,
    speed: 0.6 + random() * 1.6,
    hue: random() > 0.62 ? 275 : random() > 0.3 ? 160 : 190,
    size: random() * 1.4 + 0.4,
  }))
}

function polygon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotation: number,
) {
  ctx.beginPath()
  for (let i = 0; i < sides; i += 1) {
    const angle = rotation + (i / sides) * TAU
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
}

function drawNebula(ctx: CanvasRenderingContext2D, width: number, height: number, t: number) {
  const cx = width * (0.5 + Math.sin(t * TAU) * 0.08)
  const cy = height * (0.43 + Math.cos(t * TAU * 0.7) * 0.06)
  const scale = Math.max(width, height)
  const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, scale * 0.72)
  glow.addColorStop(0, 'rgba(226,255,255,0.16)')
  glow.addColorStop(0.08, 'rgba(44,255,190,0.1)')
  glow.addColorStop(0.3, 'rgba(20,84,105,0.055)')
  glow.addColorStop(0.52, 'rgba(99,24,154,0.08)')
  glow.addColorStop(0.78, 'rgba(23,5,46,0.08)')
  glow.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, width, height)

  const violet = ctx.createRadialGradient(
    width * 0.22,
    height * 0.72,
    0,
    width * 0.22,
    height * 0.72,
    scale * 0.45,
  )
  violet.addColorStop(0, 'rgba(140,36,255,0.16)')
  violet.addColorStop(0.4, 'rgba(57,16,115,0.07)')
  violet.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = violet
  ctx.fillRect(0, 0, width, height)
}

function drawStars(
  ctx: CanvasRenderingContext2D,
  stars: Star[],
  width: number,
  height: number,
  t: number,
  collapse: number,
) {
  const speed = 0.11 + smoothstep(0.14, 0.55, t) * 0.8
  const focal = Math.min(width, height) * 0.8
  const cx = width / 2
  const cy = height / 2

  for (const star of stars) {
    const z = ((star.z - t * speed) % 1 + 1) % 1
    const depth = 0.12 + z
    const perspective = focal / (depth * focal)
    const normalX = cx + star.x * width * 0.3 * perspective
    const normalY = cy + star.y * height * 0.32 * perspective
    const x = normalX + (cx - normalX) * collapse
    const y = normalY + (cy - normalY) * collapse
    if (x < -30 || x > width + 30 || y < -30 || y > height + 30) continue

    const alpha = clamp((1 - z) * 1.2) * (1 - collapse * 0.45)
    const length = (1 - z) * speed * 38 * (1 - collapse)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + (x - cx) * length * 0.008, y + (y - cy) * length * 0.008)
    ctx.strokeStyle = `hsla(${star.hue}, 100%, 78%, ${alpha})`
    ctx.lineWidth = star.size * (1.15 - z * 0.65)
    ctx.stroke()
  }
}

function drawOcean(ctx: CanvasRenderingContext2D, width: number, height: number, t: number, alpha: number) {
  if (alpha <= 0) return
  const horizon = height * 0.62
  ctx.save()
  ctx.globalAlpha = alpha
  const ocean = ctx.createLinearGradient(0, horizon, 0, height)
  ocean.addColorStop(0, 'rgba(103,255,222,0.28)')
  ocean.addColorStop(0.08, 'rgba(5,32,41,0.78)')
  ocean.addColorStop(1, 'rgba(0,2,8,0.98)')
  ctx.fillStyle = ocean
  ctx.fillRect(0, horizon, width, height - horizon)

  for (let row = 0; row < 18; row += 1) {
    const depth = row / 17
    const y = horizon + depth * depth * (height - horizon)
    ctx.beginPath()
    for (let x = -20; x <= width + 20; x += 18) {
      const wave = Math.sin(x * 0.014 + t * 16 + row * 0.7) * (2 + depth * 6)
      if (x === -20) ctx.moveTo(x, y + wave)
      else ctx.lineTo(x, y + wave)
    }
    ctx.strokeStyle = `rgba(82,255,218,${0.16 * (1 - depth) + 0.035})`
    ctx.lineWidth = 0.6 + depth
    ctx.stroke()
  }
  ctx.restore()
}

function drawArchitecture(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  alpha: number,
) {
  if (alpha <= 0) return
  ctx.save()
  ctx.globalAlpha = alpha
  const horizon = height * 0.62
  const drift = Math.sin(t * TAU) * width * 0.03

  for (let side = -1; side <= 1; side += 2) {
    ctx.save()
    ctx.translate(width / 2 + side * width * 0.33 + drift, horizon - height * 0.04)
    ctx.scale(side, 1)
    const towerWidth = width * 0.11
    const towerHeight = height * 0.52
    const gradient = ctx.createLinearGradient(0, -towerHeight, towerWidth, 0)
    gradient.addColorStop(0, 'rgba(222,255,255,0.72)')
    gradient.addColorStop(0.12, 'rgba(24,96,88,0.52)')
    gradient.addColorStop(0.65, 'rgba(3,10,21,0.96)')
    gradient.addColorStop(1, 'rgba(116,20,168,0.56)')
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(towerWidth * 0.12, -towerHeight * 0.78)
    ctx.lineTo(towerWidth * 0.5, -towerHeight)
    ctx.lineTo(towerWidth, -towerHeight * 0.2)
    ctx.lineTo(towerWidth * 0.78, 0)
    ctx.closePath()
    ctx.fill()
    ctx.strokeStyle = 'rgba(142,255,225,0.64)'
    ctx.lineWidth = 1
    ctx.stroke()

    for (let level = 1; level < 9; level += 1) {
      const y = -towerHeight * (level / 10)
      ctx.beginPath()
      ctx.moveTo(towerWidth * 0.14, y)
      ctx.lineTo(towerWidth * (0.86 - level * 0.025), y - level * 2)
      ctx.strokeStyle = `rgba(125,255,223,${0.11 + level * 0.018})`
      ctx.stroke()
    }
    ctx.restore()
  }

  const bridgeY = horizon - height * 0.16
  ctx.beginPath()
  ctx.ellipse(width / 2, bridgeY, width * 0.31, height * 0.035, -0.04, 0, TAU)
  ctx.strokeStyle = 'rgba(117,255,218,0.42)'
  ctx.lineWidth = 2
  ctx.shadowColor = '#55ffd4'
  ctx.shadowBlur = 14
  ctx.stroke()

  for (let beam = -2; beam <= 2; beam += 1) {
    const x = width / 2 + beam * width * 0.13
    const light = ctx.createLinearGradient(x, horizon, x, 0)
    light.addColorStop(0, 'rgba(91,255,216,0.2)')
    light.addColorStop(0.45, 'rgba(91,255,216,0.025)')
    light.addColorStop(1, 'rgba(91,255,216,0)')
    ctx.fillStyle = light
    ctx.beginPath()
    ctx.moveTo(x - width * 0.008, horizon)
    ctx.lineTo(x + width * 0.008, horizon)
    ctx.lineTo(x + width * 0.07, 0)
    ctx.lineTo(x - width * 0.07, 0)
    ctx.closePath()
    ctx.fill()
  }
  ctx.restore()
}

function drawRings(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  intensity: number,
) {
  const cx = width / 2
  const cy = height * 0.46
  const base = Math.min(width, height) * (0.17 + intensity * 0.04)
  ctx.save()
  ctx.translate(cx, cy)
  ctx.globalCompositeOperation = 'lighter'
  for (let ring = 0; ring < 5; ring += 1) {
    ctx.save()
    ctx.rotate(t * (0.8 + ring * 0.24) * (ring % 2 ? -1 : 1))
    ctx.scale(1, 0.28 + ring * 0.055)
    ctx.beginPath()
    ctx.arc(0, 0, base * (1 + ring * 0.18), ring * 0.44, TAU - ring * 0.33)
    ctx.strokeStyle =
      ring % 2
        ? `rgba(164,62,255,${0.2 + intensity * 0.4})`
        : `rgba(85,255,211,${0.2 + intensity * 0.45})`
    ctx.lineWidth = 1 + intensity * 2.2
    ctx.shadowColor = ring % 2 ? '#9b35ff' : '#45ffd1'
    ctx.shadowBlur = 12 + intensity * 22
    ctx.stroke()
    ctx.restore()
  }
  ctx.restore()
}

function drawShards(
  ctx: CanvasRenderingContext2D,
  shards: Shard[],
  width: number,
  height: number,
  t: number,
  collapse: number,
) {
  const cx = width / 2
  const cy = height * 0.46
  const scale = Math.min(width, height)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (const shard of shards) {
    const orbit = shard.angle + t * (0.35 + shard.depth * 0.7)
    const spread = shard.radius * scale * (0.7 - collapse * 0.67)
    const x = cx + Math.cos(orbit) * spread
    const y = cy + Math.sin(orbit) * spread * 0.5
    const size = shard.size * (0.55 + shard.depth) * (1 - collapse * 0.45)
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(orbit + shard.tilt)
    const crystal = ctx.createLinearGradient(-size, -size, size, size)
    crystal.addColorStop(0, 'rgba(255,255,255,0.75)')
    crystal.addColorStop(0.24, 'rgba(75,255,211,0.2)')
    crystal.addColorStop(0.58, 'rgba(17,25,48,0.15)')
    crystal.addColorStop(1, 'rgba(163,45,255,0.55)')
    ctx.fillStyle = crystal
    ctx.beginPath()
    ctx.moveTo(0, -size * 1.8)
    ctx.lineTo(size * 0.42, -size * 0.15)
    ctx.lineTo(size * 0.18, size * 1.4)
    ctx.lineTo(-size * 0.36, size * 0.25)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
  ctx.restore()
}

function drawPortal(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  progress: number,
) {
  if (progress <= 0) return
  const cx = width / 2
  const cy = height * 0.46
  // Portal rushes toward the viewer: grows from a distant point to beyond the frame.
  const approach = progress * progress
  const radius = Math.min(width, height) * (0.02 + approach * 1.35)
  const alpha = Math.sin(progress * Math.PI)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'

  for (let layer = 0; layer < 3; layer += 1) {
    const r = radius * (1 - layer * 0.13)
    ctx.beginPath()
    ctx.ellipse(cx, cy, r, r * 0.94, Math.sin(t * 0.4) * 0.1, 0, TAU)
    ctx.strokeStyle =
      layer === 1
        ? `rgba(168,72,255,${alpha * 0.6})`
        : `rgba(72,255,208,${alpha * (0.7 - layer * 0.18)})`
    ctx.lineWidth = 2.5 - layer * 0.6
    ctx.shadowColor = layer === 1 ? '#a63bff' : '#3fffce'
    ctx.shadowBlur = 26 * alpha
    ctx.stroke()
  }

  const iris = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius)
  iris.addColorStop(0, `rgba(240,255,252,${alpha * 0.1})`)
  iris.addColorStop(0.72, `rgba(60,240,200,${alpha * 0.05})`)
  iris.addColorStop(0.94, `rgba(150,60,255,${alpha * 0.16})`)
  iris.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = iris
  ctx.beginPath()
  ctx.ellipse(cx, cy, radius, radius * 0.94, 0, 0, TAU)
  ctx.fill()
  ctx.restore()
}

function drawPlanet(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  t: number,
  alpha: number,
) {
  if (alpha <= 0) return
  const cx = width * 0.78
  const cy = height * 0.26
  const radius = Math.min(width, height) * 0.11
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(cx, cy)
  ctx.rotate(-0.32)

  const body = ctx.createRadialGradient(-radius * 0.4, -radius * 0.45, 0, 0, 0, radius * 1.25)
  body.addColorStop(0, 'rgba(190,255,244,0.55)')
  body.addColorStop(0.32, 'rgba(38,110,118,0.5)')
  body.addColorStop(0.75, 'rgba(28,10,58,0.85)')
  body.addColorStop(1, 'rgba(6,2,16,0.95)')

  // Fractured hemispheres drifting apart along fault lines.
  const split = radius * (0.05 + Math.sin(t * 0.6) * 0.012 + 0.05)
  for (let piece = 0; piece < 3; piece += 1) {
    const start = -Math.PI / 2 + piece * (TAU / 3) + 0.14
    const end = start + TAU / 3 - 0.28
    const mid = (start + end) / 2
    const offset = split * (1 + piece * 0.35)
    ctx.save()
    ctx.translate(Math.cos(mid) * offset, Math.sin(mid) * offset)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.arc(0, 0, radius, start, end)
    ctx.closePath()
    ctx.fillStyle = body
    ctx.fill()
    ctx.strokeStyle = 'rgba(120,255,226,0.4)'
    ctx.lineWidth = 0.8
    ctx.stroke()
    ctx.restore()
  }

  // Molten core glowing between the fragments.
  const core = ctx.createRadialGradient(0, 0, 0, 0, 0, radius * 0.55)
  core.addColorStop(0, 'rgba(210,255,248,0.8)')
  core.addColorStop(0.5, 'rgba(90,255,214,0.35)')
  core.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.globalCompositeOperation = 'lighter'
  ctx.fillStyle = core
  ctx.beginPath()
  ctx.arc(0, 0, radius * 0.55, 0, TAU)
  ctx.fill()

  ctx.beginPath()
  ctx.ellipse(0, 0, radius * 1.55, radius * 0.34, 0.22, 0, TAU)
  ctx.strokeStyle = 'rgba(158,88,255,0.4)'
  ctx.lineWidth = 1.4
  ctx.shadowColor = '#9b4dff'
  ctx.shadowBlur = 12
  ctx.stroke()
  ctx.restore()
}

function drawDust(
  ctx: CanvasRenderingContext2D,
  motes: Mote[],
  width: number,
  height: number,
  t: number,
  alpha: number,
) {
  if (alpha <= 0) return
  ctx.save()
  for (const mote of motes) {
    const x = ((mote.x + t * mote.drift * 4) % 1) * width
    const y = (mote.y + Math.sin(t * TAU * 0.5 + mote.phase) * 0.012) * height
    const twinkle = 0.6 + Math.sin(t * TAU * 2 + mote.phase * 3) * 0.4
    ctx.beginPath()
    ctx.arc(x, y, mote.size, 0, TAU)
    ctx.fillStyle = `rgba(214,244,255,${mote.alpha * twinkle * alpha})`
    ctx.fill()
  }
  ctx.restore()
}

function drawCollapse(
  ctx: CanvasRenderingContext2D,
  particles: CollapseParticle[],
  width: number,
  height: number,
  t: number,
  progress: number,
) {
  if (progress <= 0) return
  const cx = width / 2
  const cy = height * 0.46
  const scale = Math.min(width, height)
  ctx.save()
  ctx.globalCompositeOperation = 'lighter'
  for (const particle of particles) {
    // Each particle spirals inward at its own rate; fastest arrive first.
    const fall = clamp(progress * particle.speed)
    const eased = fall * fall * (3 - 2 * fall)
    const radius = particle.radius * scale * (1 - eased)
    if (radius < 2) continue
    const angle = particle.angle + eased * 2.6 + t * 0.15
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius * 0.62
    const alpha = (0.25 + eased * 0.75) * (1 - eased * 0.25) * Math.sin(Math.min(progress, 1) * Math.PI * 0.5 + 0.35)
    const tail = 3 + eased * 14
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(x + Math.cos(angle + Math.PI * 0.42) * tail, y + Math.sin(angle + Math.PI * 0.42) * tail * 0.62)
    ctx.strokeStyle = `hsla(${particle.hue}, 100%, 76%, ${clamp(alpha)})`
    ctx.lineWidth = particle.size
    ctx.stroke()
  }
  ctx.restore()
}

function drawSymbol(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  reveal: number,
  t: number,
) {
  if (reveal <= 0) return
  const cx = width / 2
  const cy = height * 0.46
  const radius = Math.min(width, height) * 0.075 * reveal
  ctx.save()
  ctx.translate(cx, cy)
  ctx.globalCompositeOperation = 'lighter'
  ctx.shadowColor = '#dcfff7'
  ctx.shadowBlur = 35 * reveal
  ctx.strokeStyle = `rgba(235,255,250,${reveal})`
  ctx.lineWidth = Math.max(1.5, radius * 0.045)

  polygon(ctx, 0, 0, radius, 6, Math.PI / 6 + t * 0.12)
  ctx.stroke()
  polygon(ctx, 0, 0, radius * 0.61, 3, -Math.PI / 2 - t * 0.18)
  ctx.stroke()

  ctx.rotate(Math.PI)
  polygon(ctx, 0, 0, radius * 0.61, 3, -Math.PI / 2 - t * 0.18)
  ctx.stroke()
  ctx.beginPath()
  ctx.arc(0, 0, radius * 0.18, 0, TAU)
  ctx.fillStyle = `rgba(236,255,251,${reveal})`
  ctx.fill()
  ctx.restore()
}

export function CosmicDimension() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef(0)
  const startRef = useRef<number | null>(null)
  const elapsedRef = useRef(0)
  const starsRef = useRef(buildStars(520))
  const shardsRef = useRef(buildShards(46))
  const motesRef = useRef(buildMotes(90))
  const collapseRef = useRef(buildCollapseParticles(2000))
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
      starsRef.current = buildStars(window.innerWidth < 700 ? 280 : 520)
      motesRef.current = buildMotes(window.innerWidth < 700 ? 45 : 90)
      collapseRef.current = buildCollapseParticles(window.innerWidth < 700 ? 900 : 2000)
      // Resizing clears the bitmap; repaint the frozen frame when the loop is not running.
      if (paused || reducedMotion) renderScene(elapsedRef.current)
    }

    const renderScene = (elapsed: number) => {
      const t = reducedMotion ? 0.78 : (elapsed % DURATION) / DURATION
      const width = window.innerWidth
      const height = window.innerHeight
      const ignition = smoothstep(0.035, 0.13, t)
      const world = smoothstep(0.1, 0.23, t) * (1 - smoothstep(0.9, 1, t))
      const collapse = smoothstep(0.7, 0.84, t)
      const symbol = smoothstep(0.76, 0.85, t) * (1 - smoothstep(0.94, 1, t))
      const shock = smoothstep(0.855, 0.875, t) * (1 - smoothstep(0.875, 0.925, t))
      const portal = smoothstep(0.22, 0.25, t) * (1 - smoothstep(0.25, 0.34, t))
      const swarm = smoothstep(0.66, 0.7, t) * (1 - smoothstep(0.85, 0.88, t))
      // Gentle camera roll and sway for a handheld-orbital feel.
      const roll = Math.sin(t * TAU) * 0.014 * world
      const sway = Math.sin(t * TAU * 1.7) * width * 0.004 * world

      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = '#010204'
      ctx.fillRect(0, 0, width, height)
      ctx.save()
      ctx.translate(width / 2 + sway, height * 0.46)
      ctx.rotate(roll)
      ctx.translate(-width / 2, -height * 0.46)
      ctx.save()
      ctx.globalAlpha = world
      drawNebula(ctx, width, height, t)
      drawStars(ctx, starsRef.current, width, height, t, collapse)
      drawDust(ctx, motesRef.current, width, height, t, 1 - collapse * 0.7)
      drawPlanet(ctx, width, height, t * TAU, smoothstep(0.3, 0.4, t) * (1 - smoothstep(0.6, 0.7, t)))
      drawOcean(ctx, width, height, t, smoothstep(0.34, 0.52, t) * (1 - collapse))
      drawArchitecture(ctx, width, height, t, smoothstep(0.27, 0.42, t) * (1 - collapse))
      drawShards(ctx, shardsRef.current, width, height, t * TAU, collapse)
      ctx.restore()

      drawPortal(ctx, width, height, t * TAU, portal)
      drawCollapse(ctx, collapseRef.current, width, height, t * TAU, swarm * 1.6)
      ctx.restore()

      const pulseRadius = Math.min(width, height) * (0.006 + ignition * 0.16)
      const pulse = ctx.createRadialGradient(width / 2, height * 0.46, 0, width / 2, height * 0.46, pulseRadius)
      pulse.addColorStop(0, `rgba(255,255,255,${ignition})`)
      pulse.addColorStop(0.12, `rgba(98,255,219,${ignition * 0.95})`)
      pulse.addColorStop(0.45, `rgba(119,39,255,${ignition * 0.34})`)
      pulse.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = pulse
      ctx.fillRect(0, 0, width, height)

      drawRings(ctx, width, height, t * TAU, Math.max(ignition * 0.45, collapse))
      drawSymbol(ctx, width, height, symbol, t * TAU)

      if (shock > 0) {
        const radius = shock * Math.max(width, height) * 0.78
        ctx.save()
        ctx.beginPath()
        ctx.arc(width / 2, height * 0.46, radius, 0, TAU)
        ctx.strokeStyle = `rgba(220,255,246,${1 - shock})`
        ctx.lineWidth = 2 + (1 - shock) * 8
        ctx.shadowColor = '#6fffd6'
        ctx.shadowBlur = 32
        ctx.stroke()
        ctx.restore()
        ctx.fillStyle = `rgba(220,255,249,${Math.sin(shock * Math.PI) * 0.18})`
        ctx.fillRect(0, 0, width, height)
      }

      if (t > 0.93) {
        ctx.fillStyle = `rgba(0,0,0,${smoothstep(0.93, 1, t)})`
        ctx.fillRect(0, 0, width, height)
      }
    }

    const draw = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp - elapsedRef.current * 1000
      const elapsed = (timestamp - startRef.current) / 1000
      elapsedRef.current = elapsed
      renderScene(elapsed)
      frameRef.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    if (paused || reducedMotion) renderScene(elapsedRef.current)
    else frameRef.current = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [paused])

  const togglePlayback = () => {
    startRef.current = null
    setPaused((value) => !value)
  }

  return (
    <div className="cosmic-experience">
      <canvas ref={canvasRef} className="cosmic-canvas" aria-hidden="true" />
      <div className="cosmic-vignette" aria-hidden="true" />
      <div className="cosmic-scrim" aria-hidden="true" />
      <div className="cosmic-grain" aria-hidden="true" />
      <div className="cosmic-lens" aria-hidden="true" />
      <button
        className="cosmic-control"
        type="button"
        onClick={togglePlayback}
        aria-label={paused ? 'Resume animation' : 'Pause animation'}
      >
        <span className={paused ? 'play-icon' : 'pause-icon'} aria-hidden="true" />
      </button>
    </div>
  )
}
