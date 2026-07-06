"use client"

import { useEffect, useRef, useState } from 'react'

export default function VideoHero({ poster = '/hero-poster.svg' }: { poster?: string }) {
  const ref = useRef<HTMLVideoElement | null>(null)
  const [playError, setPlayError] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const v = ref.current
    if (!v) return

    const tryPlay = async () => {
      try {
        // Ensure muted for autoplay compliance
        v.muted = true
        v.playsInline = true
        await v.play()
      } catch (err) {
        // Some browsers still block autoplay; show poster fallback
        setPlayError(true)
      }
    }

    tryPlay()
  }, [])

  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl">
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        preload="auto"
      >
        <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
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
