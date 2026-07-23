'use client'

import Link from 'next/link'
import AuthMenu from '@/components/AuthMenu'
import ThemeToggle from '@/components/ThemeToggle'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Cart', href: '/cart' },
  { label: 'Account', href: '/account' },
  { label: 'About', href: '/about' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/90 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <img src="/images/brand/brand-official.png" alt="KamzyBee logo" className="h-10 w-10 object-contain" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#0F172A]">KamzyBee</p>
            <p className="text-xs text-[#475569]">Global Enterprise</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-[#0F172A] md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-[#EFF6FF] hover:text-[#0B3D91]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="hidden md:block">
            <AuthMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
