import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const cv = canvasRef.current
    if (!cv) return
    const cx = cv.getContext('2d')
    let W, H, pts = [], animId

    class P {
      constructor() { this.reset() }
      reset() {
        this.x = Math.random() * W
        this.y = Math.random() * H
        this.vx = (Math.random() - 0.5) * 0.25
        this.vy = (Math.random() - 0.5) * 0.25
        this.r = Math.random() * 1.4 + 0.4
        this.a = Math.random() * 0.35 + 0.05
        const c = ['0,255,156', '56,189,248', '167,139,250']
        this.c = c[Math.floor(Math.random() * 3)]
      }
      step() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
      }
      draw() {
        cx.beginPath()
        cx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        cx.fillStyle = `rgba(${this.c},${this.a})`
        cx.fill()
      }
    }

    function resize() { W = cv.width = innerWidth; H = cv.height = innerHeight }
    function init() { pts = []; for (let i = 0; i < 70; i++) pts.push(new P()) }
    function lines() {
      const D = 110
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < D) {
            cx.beginPath(); cx.moveTo(pts[i].x, pts[i].y); cx.lineTo(pts[j].x, pts[j].y)
            cx.strokeStyle = `rgba(0,255,156,${0.05 * (1 - d / D)})`
            cx.lineWidth = 0.5; cx.stroke()
          }
        }
    }
    function loop() {
      cx.clearRect(0, 0, W, H)
      pts.forEach(p => { p.step(); p.draw() })
      lines()
      animId = requestAnimationFrame(loop)
    }

    const onResize = () => { resize(); init() }
    window.addEventListener('resize', onResize)
    resize(); init(); loop()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <canvas id="particleCanvas" ref={canvasRef} />
}
