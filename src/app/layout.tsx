import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import './globals.css'

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
      <body className="min-h-full bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
            <Link href='/' className='flex items-center gap-3'>
              <Image src='/logo.svg' width={42} height={42} alt='KamzyBee logo' />
              <div>
                <p className='text-sm font-semibold uppercase tracking-[0.3em] text-blue-600'>KamzyBee</p>
                <p className='text-xs text-slate-500'>Global Enterprise</p>
              </div>
            </Link>
            <nav className='flex items-center gap-4 text-sm text-slate-600'>
              <Link href='/inventory' className='font-medium text-slate-900 hover:text-blue-600'>Inventory</Link>
              <Link href='/' className='hover:text-blue-600'>Home</Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  )
}
