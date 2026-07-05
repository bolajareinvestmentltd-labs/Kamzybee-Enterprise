export const client = {
  async fetch(query: string) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-02'

    if (!projectId || !dataset) {
      throw new Error('Missing Sanity configuration env vars')
    }

    const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
      query,
    )}`

    const res = await fetch(url)
    const json = await res.json()
    return json.result
  },
}
