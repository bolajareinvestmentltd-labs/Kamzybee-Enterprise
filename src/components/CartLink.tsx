'use client'

import Link from 'next/link'
import { useCart } from '@/components/CartProvider'

export default function CartLink() {
  const { totalItems } = useCart()

  return (
    <Link
      href="/cart"
      className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
    >
      <span>Cart</span>
      {totalItems > 0 && (
        <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-semibold text-white">{totalItems}</span>
      )}
    </Link>
  )
}
