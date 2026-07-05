'use client'

import Link from 'next/link'
import { useCart } from '@/components/CartProvider'
import RotaryDiscountComponent from '@/components/RotaryDiscountComponent'

export default function CartPage() {
  const { items, totalAmount, updateItem, removeItem, clearCart } = useCart()

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-blue-600">Shopping cart</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">Review your selections</h1>
          </div>
          <Link href="/inventory" className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-900 transition hover:bg-slate-100">
            Continue browsing
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-14 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-900">Your cart is empty.</p>
            <p className="mt-3 text-slate-600">Add a product from inventory to get started.</p>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.slug} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.28em] text-slate-500">{item.name}</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{item.slug}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateItem(item.slug, item.quantity - 1)}
                        className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
                      >
                        −
                      </button>
                      <span className="min-w-[2rem] text-center text-base font-semibold text-slate-900">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateItem(item.slug, item.quantity + 1)}
                        className="rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-slate-500">Unit price</p>
                    <p className="text-lg font-semibold text-slate-900">₦{item.price.toLocaleString()}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-600">Subtotal</p>
                    <p className="text-base font-semibold text-slate-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    className="mt-6 text-sm font-medium text-red-600 transition hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Order summary</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">₦{totalAmount.toLocaleString()}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4">
                  <p className="text-sm text-slate-600">You can update quantities or remove items here before checkout.</p>
                </div>
                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="w-full rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Clear cart
                </button>
                <button
                  type="button"
                  className="w-full rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  Proceed to checkout
                </button>
                <div className="mt-6">
                  <RotaryDiscountComponent />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
