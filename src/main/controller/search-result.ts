import { db, searchResults } from '@main/database/database'
import { CreateSearchResultInput } from '@shared/types'

export async function createSearchResultBulk(results: CreateSearchResultInput[]) {
  return await db.transaction(async (tx) => {
    return await tx.insert(searchResults).values(results).returning()
  })
}
