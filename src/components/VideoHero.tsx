"use client"

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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
    <div className="relative overflow-hidden rounded-[2rem] aspect-video min-h-[260px] sm:min-h-[360px] bg-gradient-to-br from-[#0B3D91] via-[#1a5bb8] to-slate-950 text-white shadow-2xl group">
      <div className="absolute inset-0">
        <Image src={poster} alt="Hero poster" fill className="object-cover" />
      </div>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-90"
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

      <div className="absolute inset-0 bg-gradient-to-b from-[#0B3D91]/40 via-[#0B3D91]/50 to-slate-950/60" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,180,0,0.25),_transparent_50%),radial-gradient(circle_at_bottom_right,_rgba(34,197,94,0.15),_transparent_40%)]"/>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_center,_rgba(244,180,0,0.1),_transparent_60%)]"/>

      {playError && (
        <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
          <img src={poster} alt="hero poster" className="h-full w-full object-cover" />
        </div>
      )}
      
      <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-[#0B3D91]/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold text-[#F4B400] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        Featured Products
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="rounded-[2rem] border border-white/20 bg-white/10 px-4 py-3 text-center text-xs uppercase tracking-[0.35em] text-white/80 shadow-lg shadow-white/10 backdrop-blur-sm">
          Play the video to see featured product motion
        </div>
      </div>
      <div className="absolute top-6 right-6 hidden rounded-[1.75rem] border border-white/20 bg-white/10 px-4 py-3 text-white shadow-2xl shadow-white/10 backdrop-blur-sm md:block">
        <p className="text-[10px] uppercase tracking-[0.35em] text-slate-200">Featured</p>
        <p className="mt-2 text-sm font-semibold text-white">Samsung Galaxy S24</p>
        <p className="mt-1 text-[11px] text-slate-200">Lowest price in stock now</p>
      </div>
    </div>
  )
}
