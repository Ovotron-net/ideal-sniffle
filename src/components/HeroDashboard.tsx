import { useEffect, useRef } from 'react'
import { dataStreamHex } from '../config/sections'
import { useGetThreatFeed } from '../api/generated/endpoints'

export function HeroDashboard() {
  const panelRef = useRef<HTMLDivElement>(null)
  const { data: threatFeed } = useGetThreatFeed({
    query: { select: (response) => response.data },
  })

  useEffect(() => {
    function onMouseMove(e: MouseEvent) {
      const panel = panelRef.current
      if (!panel || window.innerWidth <= 1024) return

      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      panel.style.transform = `rotateY(${-8 + x * 0.3}deg) rotateX(${4 + y * 0.3}deg)`
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <div className="dashboard-panel" ref={panelRef}>
      <div className="dashboard-header">
        <div className="dashboard-dots">
          <span />
          <span />
          <span />
        </div>
        <span className="dashboard-title">SOC Live Monitor</span>
        <span className="dashboard-status">
          <span className="pulse-dot" /> Secure
        </span>
      </div>

      <div className="dashboard-body">
        <div className="shield-core">
          <svg className="shield-svg" viewBox="0 0 120 140" fill="none">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="50%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path
              className="shield-path"
              d="M60 8L108 28v36c0 32-20 62-48 72C32 126 12 96 12 64V28L60 8z"
              stroke="url(#shieldGrad)"
              strokeWidth="2"
              fill="rgba(0,212,255,0.05)"
            />
            <path
              className="shield-inner"
              d="M60 32L88 44v22c0 20-13 38-28 44C45 104 32 86 32 66V44L60 32z"
              stroke="rgba(0,212,255,0.4)"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          <div className="shield-pulse" />
        </div>

        <div className="network-nodes">
          <div className="node node-1"><span /></div>
          <div className="node node-2"><span /></div>
          <div className="node node-3"><span /></div>
          <div className="node node-4"><span /></div>
          <div className="node node-5"><span /></div>
          <svg className="node-lines" viewBox="0 0 300 200">
            <line className="line-anim" x1="50" y1="40" x2="150" y2="100" />
            <line className="line-anim" x1="250" y1="30" x2="150" y2="100" />
            <line className="line-anim" x1="30" y1="160" x2="150" y2="100" />
            <line className="line-anim" x1="270" y1="170" x2="150" y2="100" />
            <line className="line-anim" x1="150" y1="100" x2="150" y2="60" />
          </svg>
        </div>

        <div className="threat-feed" aria-label="Live threat signals">
          {threatFeed?.map((item) => (
            <div
              key={`${item.tag}-${item.message}`}
              className={`feed-item feed-${item.severity}`}
            >
              <span className="feed-tag">{item.tag}</span> {item.message}
            </div>
          ))}
        </div>

        <div className="code-fragment">
          <code>
            <span className="code-keyword">encrypt</span>(payload,{' '}
            <span className="code-string">AES-256-GCM</span>)
          </code>
          <code>
            <span className="code-comment">// threat_score: 0.02 — nominal</span>
          </code>
        </div>
      </div>

      <div className="data-stream" aria-hidden="true">
        <div className="data-stream-track">
          <span>{dataStreamHex}</span>
          <span>{dataStreamHex}</span>
        </div>
      </div>
    </div>
  )
}