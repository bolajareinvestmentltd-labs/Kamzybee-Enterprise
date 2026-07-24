'use client'

import { type PointerEvent, useRef, useState } from 'react'
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
        <path d="M3 7h18M3 12h18M3 17h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Cart',
    href: '/cart',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M6 6h15l-1.5 9H8.5L6 6Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" stroke="currentColor" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    name: 'Account',
    href: '/account',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 21c0-4 4-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
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
]

export default function DockMobile() {
  const [dockOffset, setDockOffset] = useState(0)
  const dragStartY = useRef<number | null>(null)
  const dragStartOffset = useRef(0)

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragStartY.current = event.clientY
    dragStartOffset.current = dockOffset
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStartY.current === null) return

    const movement = event.clientY - dragStartY.current
    const nextOffset = Math.max(-24, Math.min(24, dragStartOffset.current + movement))
    setDockOffset(nextOffset)
  }

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragStartY.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
    setDockOffset(0)
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3 md:hidden">
        <div
          className="w-full max-w-[420px] rounded-full border border-white/70 bg-white/70 px-2 py-2 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-2xl"
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
                className="inline-flex flex-col items-center justify-center rounded-3xl px-1 py-2 text-[0.65rem] font-semibold text-[#0F172A] transition hover:bg-[#F8F9FA]"
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-[#F8FAFC] text-[#0F172A] shadow-sm">
                  {item.icon}
                </span>
                <span className="mt-1 text-[10px] uppercase tracking-[0.2em]">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop expanded dock intentionally removed so desktop uses the top header navigation. */}
    </>
  )
}
