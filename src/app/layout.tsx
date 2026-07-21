import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'
import AuthMenu from '@/components/AuthMenu'
import CartProvider from '@/components/CartProvider'
import CartLink from '@/components/CartLink'
import MobileNavDock from '@/components/MobileNavDock'

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#F3F4F6] text-[#1F2937] antialiased">
        <CartProvider>
          <header className="w-full">
            <div className="flex flex-col items-center justify-between gap-4 bg-[#0B3D91] px-6 py-4 text-white md:flex-row md:px-12">
              <Link href="/" className="flex items-center gap-3">
                <div className="rounded-lg bg-[#F4B400] p-2 text-[#0B3D91]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.66 0-3-1.34-3-3H7c0 2.76 2.24 5 5 5s5-2.24 5-5h-2c0 1.66-1.34 3-3 3z" />
                  </svg>
                </div>
                <div>
                  <span className="block text-2xl font-bold leading-none tracking-wide">KamzyBee</span>
                  <span className="text-xs font-medium uppercase tracking-[0.2em] text-[#F4B400]">Store</span>
                </div>
              </Link>

              <div className="flex w-full max-w-xl items-center overflow-hidden rounded-md bg-white shadow-inner">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-full px-4 py-2.5 text-sm text-[#1F2937] focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Search products"
                  className="bg-[#0B3D91] px-5 py-2.5 text-white transition-colors hover:bg-opacity-90"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m0 0A7.5 7.5 0 1 0 6.75 6.75a7.5 7.5 0 0 0 10.6 10.6Z" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-6">
                <Link href="/auth" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-[#F4B400]">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Zm-10.5 12.75a6.75 6.75 0 0 1 13.5 0" />
                  </svg>
                  <span>My Account</span>
                </Link>
                <CartLink />
                <AuthMenu />
              </div>
            </div>

            <nav className="border-b border-gray-200 bg-white px-6 py-3.5 shadow-sm md:px-12">
              <ul className="flex flex-wrap items-center justify-center gap-8 text-sm font-semibold tracking-wide text-[#1F2937]">
                <li><Link href="/" className="text-[#0B3D91] hover:opacity-80">HOME</Link></li>
                <li><Link href="/inventory" className="transition-colors hover:text-[#0B3D91]">SHOP</Link></li>
                <li><Link href="/about" className="transition-colors hover:text-[#0B3D91]">ABOUT US</Link></li>
                <li><Link href="/contact" className="transition-colors hover:text-[#0B3D91]">CONTACT US</Link></li>
              </ul>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="border-t border-gray-200 bg-white px-6 py-8 text-sm text-[#6B7280] md:px-12">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-[#0B3D91]">KamzyBee Store</p>
                <p>Premium tech, trusted service, and fast delivery for every shopper.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link href="/inventory" className="hover:text-[#0B3D91]">Inventory</Link>
                <Link href="/about" className="hover:text-[#0B3D91]">About</Link>
                <Link href="/contact" className="hover:text-[#0B3D91]">Contact</Link>
              </div>
            </div>
          </footer>

          <MobileNavDock />
        </CartProvider>
      </body>
    </html>
  )
}
