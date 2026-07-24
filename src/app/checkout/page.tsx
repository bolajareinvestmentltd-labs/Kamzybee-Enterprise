"use client"

import { useMemo } from 'react'
import { useCart } from '@/components/CartProvider'

const SERVICE_CHARGE_PCT = 7 // default 7% service charge

export default function CheckoutPage() {
  const { items, totalAmount, discountedTotal } = useCart()

  const subtotal = totalAmount
  const appliedTotal = typeof discountedTotal === 'number' ? discountedTotal : subtotal
  const serviceCharge = useMemo(() => Math.round((appliedTotal * SERVICE_CHARGE_PCT) / 100), [appliedTotal])
  const grandTotal = appliedTotal + serviceCharge

  return (
    <div className="min-h-screen bg-[var(--background)] py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Checkout</h1>
        <p className="mt-2 text-sm text-[var(--text-light)]">Review your order and complete payment.</p>

        <div className="mt-8 space-y-4 rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-6">
          <div className="flex justify-between">
            <span className="text-sm text-[var(--text-light)]">Subtotal</span>
            <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
          </div>
          {appliedTotal !== subtotal && (
            <div className="flex justify-between">
              <span className="text-sm text-[var(--text-light)]">Discounted total</span>
              <span className="font-semibold">₦{appliedTotal.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between">
            <span className="text-sm text-[var(--text-light)]">Service charge ({SERVICE_CHARGE_PCT}%)</span>
            <span className="font-semibold">₦{serviceCharge.toLocaleString()}</span>
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex justify-between">
              <span className="text-sm text-[var(--text-light)]">Total</span>
              <span className="text-xl font-bold">₦{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => alert('Proceed to payment — integrate your payment gateway here.')}
            className="mt-6 w-full rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0F172A] transition hover:brightness-95"
          >
            Pay ₦{grandTotal.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  )
}
