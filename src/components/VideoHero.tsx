"use client"

import { useEffect, useRef, useState } from 'react'

export default function VideoHero({ poster = '/hero-poster.svg' }: { poster?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playError, setPlayError] = useState(false)
  const [sources, setSources] = useState<{ src: string; type: string }[]>([])

  useEffect(() => {
    // runtime: check for local files first to avoid 404s, otherwise fall back to public samples
    let mounted = true

    const localCandidates = [
      { src: '/videos/hero.webm', type: 'video/webm' },
      { src: '/videos/hero.mp4', type: 'video/mp4' },
    ]

    const fallback = [
      { src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4', type: 'video/mp4' },
      { src: 'https://www.w3schools.com/html/mov_bbb.mp4', type: 'video/mp4' },
    ]

    async function probe() {
      try {
        for (const cand of localCandidates) {
          try {
            const r = await fetch(cand.src, { method: 'HEAD' })
            if (r.ok) {
              if (!mounted) return
              setSources(localCandidates)
              return
            }
          } catch (_) {
            // ignore and try next
          }
        }
      } finally {
        if (mounted && sources.length === 0) setSources(fallback)
      }
    }

    probe()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const v = ref.current
    if (!v) return

    const tryPlay = async () => {
      try {
        v.muted = true
        v.playsInline = true
        await v.play()
      } catch (err) {
        setPlayError(true)
      }
    }

    tryPlay()
  }, [sources])

  return (
    <div className="relative overflow-hidden rounded-[2rem] aspect-video min-h-[260px] sm:min-h-[360px] bg-slate-950 text-white shadow-2xl">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="metadata"
      >
        {sources.map((s) => (
          // eslint-disable-next-line react/no-array-index-key
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>

      <div className="absolute inset-0 bg-slate-950/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.35),_transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.25),_transparent_35%)]" />

      {playError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={poster} alt="hero poster" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  )
}
