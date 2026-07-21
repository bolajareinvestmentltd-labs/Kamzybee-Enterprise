'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const navItems = [
  {
    name: 'Home',
    href: '/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M4 12L12 4l8 8v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Shop',
    href: '/shop',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'About',
    href: '/about',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M12 11.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M12 7.5h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: 'Contact',
    href: '/contact',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m4 8 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const categories = [
  'Smartphones',
  'Laptops',
  'Accessories',
  'Business Solutions',
  'Customer Support',
]

export default function MobileNavDock() {
  const [trayOpen, setTrayOpen] = useState(false)
  const [dockOffset, setDockOffset] = useState(0)
  const dragStartY = useRef<number | null>(null)
  const dragStartOffset = useRef(0)

  useEffect(() => {
    if (!trayOpen) return

    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setTrayOpen(false)
      }
    }

    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [trayOpen])

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartY.current = event.clientY
    dragStartOffset.current = dockOffset
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return

    const movement = event.clientY - dragStartY.current
    const nextOffset = Math.max(-24, Math.min(24, dragStartOffset.current + movement))
    setDockOffset(nextOffset)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dragStartY.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
    setDockOffset(0)
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3 md:hidden">
        <div
          className="w-full max-w-[420px] rounded-full border border-white/70 bg-[color:rgba(255,255,255,0.94)] px-1.5 py-1.5 shadow-[0_12px_40px_rgba(15,23,42,0.2)] backdrop-blur-2xl"
          style={{ transform: `translateY(${dockOffset}px)`, touchAction: 'none' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          <div className="grid grid-cols-5 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex flex-col items-center justify-center rounded-full px-1 py-2 text-xs font-semibold text-[var(--foreground)] transition hover:bg-[#F8F9FA] hover:text-[#0B3D91]"
              >
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EFF6FF] text-[#0B3D91]">
                  {item.icon}
                </span>
                <span className="mt-1 text-[10px] font-bold">{item.name}</span>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setTrayOpen(true)}
              className="inline-flex flex-col items-center justify-center rounded-full bg-[#0B3D91] px-1 py-2 text-white shadow-lg shadow-[#0B3D91]/20 transition hover:bg-[#0A3078]"
              aria-label="Open categories"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/10">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className="mt-1 text-[10px] font-bold">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {trayOpen ? (
        <>
          <div
            className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setTrayOpen(false)}
          />
          <div className="fixed inset-x-4 bottom-24 z-50 w-[calc(100%-2rem)] rounded-3xl border border-[var(--border)] bg-[var(--card-bg)] p-4 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition duration-300">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">Categories</p>
                <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">Browse by product type</p>
              </div>
              <button
                type="button"
                onClick={() => setTrayOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#F8F9FA] text-[#0B3D91] transition hover:bg-[#E5E7EB]"
                aria-label="Close tray"
              >
                <span className="text-lg font-bold">×</span>
              </button>
            </div>

            <div className="grid gap-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/shop?category=${encodeURIComponent(category)}`}
                  className="w-full rounded-2xl border border-[var(--border)] bg-[#F8F9FA] px-4 py-3 text-left text-sm font-medium text-[var(--foreground)] transition hover:border-[#0B3D91] hover:bg-[#F0F4FF]"
                  onClick={() => setTrayOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
