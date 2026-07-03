import { NextRequest } from 'next/server'
import { serverClient } from '@/sanity/server'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { query, params } = body as { query: string; params?: Record<string, any> }

  if (!query) {
    return new Response('Missing query', { status: 400 })
  }

  try {
    const data = await serverClient.fetch(query, params)
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Sanity fetch failed', error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
