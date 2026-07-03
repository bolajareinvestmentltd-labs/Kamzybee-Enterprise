import {createClient} from 'next-sanity'

export const serverClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-12-02',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  // Ensure we talk to the same Sanity project host the token was issued for.
  // If this is incorrect, Sanity returns: "Unauthorized - Session does not match project host".
  // For most Sanity setups, the default host (production) is correct, so we only set it when provided.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ...(process.env.SANITY_PROJECT_HOST ? { apiHost: process.env.SANITY_PROJECT_HOST as any } : {}),
})

