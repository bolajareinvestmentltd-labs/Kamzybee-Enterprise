export const client = {
  async fetch(query: string) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-02'
    let host = process.env.SANITY_PROJECT_HOST || `${projectId}.api.sanity.io`

    if (!host.startsWith('http')) {
      host = `https://${host}`
    }

    if (!projectId || !dataset) {
      console.warn('Sanity env vars missing; using fallback content.')
      return null
    }

    const url = `${host}/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`

    const res = await fetch(url)
    if (!res.ok) {
      console.warn('Sanity fetch failed', res.status, res.statusText)
      return null
    }

    const json = await res.json()
    return json.result
  },
}
