import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CartProvider from '@/components/CartProvider'
import DockMobile from '@/components/DockMobile'
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
          <Header />

          <main className="pb-28 md:pb-0">
            {children}
          </main>

          <Footer />
          <DockMobile />
        </CartProvider>
      </body>
    </html>
  )
}
