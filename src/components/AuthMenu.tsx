'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function AuthMenu() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!mounted) return
      setUserEmail(data.session?.user?.email ?? null)
      setLoading(false)
    }

    loadSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return
      setUserEmail(session?.user?.email ?? null)
    })

    return () => {
      mounted = false
      authListener.subscription?.unsubscribe()
    }
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    setUserEmail(null)
  }

  if (loading) {
    return <span className="text-sm text-slate-500">Loading...</span>
  }

  return userEmail ? (
    <div className="flex items-center gap-3 text-sm text-slate-700">
      <span className="rounded-full bg-slate-100 px-3 py-2">{userEmail}</span>
      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 transition hover:bg-slate-100"
      >
        Sign out
      </button>
    </div>
  ) : (
    <Link
      href="/auth"
      className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
    >
      Sign in / Sign up
    </Link>
  )
}
