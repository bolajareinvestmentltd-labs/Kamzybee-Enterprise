"use client"

import { useState } from 'react'

export default function RotaryDiscountComponent() {
  const [riNumber, setRiNumber] = useState('')
  const [clubName, setClubName] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setStatus('verifying')

    try {
      const res = await fetch('/api/verify-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riNumber, clubName }),
      })

      const data = await res.json()
      if (res.ok) {
        setStatus('verified')
        try {
          // store a placeholder discount percentage and verified flag locally
          window.localStorage.setItem('rotaryVerified', 'true')
          window.localStorage.setItem('rotaryDiscountPct', '10')
        } catch {
          // ignore
        }
      } else {
        setStatus(data?.error ?? 'failed')
      }
    } catch (err) {
      setStatus('failed')
    }
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold">Rotary / Rotaract Member Discount</h3>
      <p className="text-sm text-slate-600">Enter your RI Number and Club to request verification.</p>
      <form onSubmit={handleVerify} className="mt-4 space-y-3">
        <input value={riNumber} onChange={(e) => setRiNumber(e.target.value)} placeholder="RI Number" className="w-full rounded-md border px-3 py-2" />
        <input value={clubName} onChange={(e) => setClubName(e.target.value)} placeholder="Club Name" className="w-full rounded-md border px-3 py-2" />
        <button type="submit" className="rounded-full bg-blue-600 px-4 py-2 text-white">Verify</button>
      </form>
      {status && <p className="mt-3 text-sm text-slate-700">Status: {status}</p>}
    </div>
  )
}
