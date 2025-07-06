import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'
import { AUTHOR_BY_USERNAME_QUERY } from './queries'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

export async function fetchAuthorByUsername(username: string) {
  return client.fetch(AUTHOR_BY_USERNAME_QUERY, { username })
}
