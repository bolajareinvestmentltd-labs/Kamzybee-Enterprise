import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import AuthMenu from '@/components/AuthMenu'
import CartProvider from '@/components/CartProvider'
import CartLink from '@/components/CartLink'
import MobileNavDock from '@/components/MobileNavDock'
import ThemeToggle from '@/components/ThemeToggle'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'KamzyBee Global Enterprise',
  description: 'Browse the inventory catalog and product details for KamzyBee Enterprise.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <CartProvider>
          <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:rgba(255,255,255,0.92)] backdrop-blur dark:bg-[color:rgba(15,23,42,0.92)]">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 sm:px-8 lg:px-10">
              <Link href="/" className="flex items-center gap-3">
                <img src="/images/brand/brand-official.png" alt="KamzyBee logo" className="h-10 w-10 object-contain" />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#0B3D91]">KamzyBee</p>
                  <p className="text-xs text-[var(--text-light)]">Global Enterprise</p>
                </div>
              </Link>

              <div className="hidden items-center gap-6 lg:flex">
                <nav className="flex items-center gap-5 text-sm font-medium text-[var(--text-light)]">
                  <Link href="/" className="transition hover:text-[#0B3D91]">Home</Link>
                  <Link href="/shop" className="transition hover:text-[#0B3D91]">Shop</Link>
                  <Link href="/about" className="transition hover:text-[#0B3D91]">About</Link>
                  <Link href="/contact" className="transition hover:text-[#0B3D91]">Contact</Link>
                </nav>
              </div>

              <div className="flex items-center gap-3">
                <CartLink />
                <ThemeToggle />
                <AuthMenu />
              </div>
            </div>
          </header>

          <main className="pb-28 md:pb-0">
            {children}
          </main>

          <Footer />
          <MobileNavDock />
        </CartProvider>
      </body>
    </html>
  )
}
