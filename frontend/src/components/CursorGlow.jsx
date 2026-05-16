import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    const g = glowRef.current
    if (!g) return
    const move = (e) => { g.style.left = e.clientX + 'px'; g.style.top = e.clientY + 'px' }
    document.addEventListener('mousemove', move)
    return () => document.removeEventListener('mousemove', move)
  }, [])

  return (
    <div
      ref={glowRef}
      style={{
        position: 'fixed',
        width: '280px',
        height: '280px',
        borderRadius: '50%',
        background: 'radial-gradient(circle,rgba(0,255,156,0.04) 0%,transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
        transform: 'translate(-50%,-50%)',
        transition: 'left .1s,top .1s',
        left: '-9999px',
        top: '-9999px',
      }}
    />
  )
}
