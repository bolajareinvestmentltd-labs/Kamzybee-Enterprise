'use client'

import { useEffect, useState } from 'react'
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
    name: 'Inventory',
    href: '/inventory',
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

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 md:hidden">
        <div className="w-full max-w-3xl rounded-full border border-white/30 bg-white/80 px-3 py-2 shadow-2xl shadow-slate-950/10 backdrop-blur-xl backdrop-saturate-150">
          <div className="grid grid-cols-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex flex-col items-center justify-center rounded-full px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900"
              >
                {item.icon}
                <span className="mt-1 hidden text-[11px] font-semibold sm:block">{item.name}</span>
              </Link>
            ))}
            <button
              type="button"
              onClick={() => setTrayOpen(true)}
              className="inline-flex flex-col items-center justify-center rounded-full bg-slate-900 px-3 py-2 text-white transition hover:bg-slate-800"
              aria-label="Open categories tray"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span className="mt-1 hidden text-[11px] font-semibold sm:block">Menu</span>
            </button>
          </div>
        </div>
      </div>

      {trayOpen ? (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setTrayOpen(false)}
          />
          <div className="fixed inset-x-4 bottom-4 z-50 w-[calc(100%-2rem)] max-w-3xl rounded-[2rem] border border-slate-200/70 bg-white/95 p-5 shadow-2xl shadow-slate-950/20 backdrop-blur-xl transition duration-300">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Categories</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">Explore quick access topics</p>
              </div>
              <button
                type="button"
                onClick={() => setTrayOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                aria-label="Close categories tray"
              >
                <span className="text-lg font-bold">×</span>
              </button>
            </div>

            <div className="mt-5 grid gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-left text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
