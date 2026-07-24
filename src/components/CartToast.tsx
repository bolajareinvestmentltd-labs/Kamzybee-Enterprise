"use client"

import { useEffect, useState } from 'react'

export default function CartToast() {
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail || {}
      const name = detail.name || 'Item'
      const qty = detail.quantity || 1
      setMessage(`${qty} × ${name} added to cart`)
      setVisible(true)
      window.setTimeout(() => setVisible(false), 2500)
    }

    window.addEventListener('kamzybee:add-to-cart', handler as EventListener)
    return () => window.removeEventListener('kamzybee:add-to-cart', handler as EventListener)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed right-6 top-6 z-50 animate-slide-up">
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-lg">
        {message}
      </div>
    </div>
  )
}
