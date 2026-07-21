import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export async function POST(req: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 })
  }

  try {
    const body = await req.json()
    const { riNumber, clubName } = body

    if (!riNumber || !clubName) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin.from('verified_members').insert([
      { ri_number: riNumber, club_name: clubName, verification_status: 'pending' },
    ])

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json({ ok: true, record: data?.[0] })
  } catch (err) {
    return NextResponse.json({ error: 'server error' }, { status: 500 })
  }
}
