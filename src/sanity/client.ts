// Client-side helper that forwards Sanity queries to a secure server route.
export const sanityFetch = async (query: string, params?: Record<string, any>) => {
  const response = await fetch('/api/sanity', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, params }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Sanity proxy request failed: ${response.status} ${errorText}`)
  }

  return response.json()
}
