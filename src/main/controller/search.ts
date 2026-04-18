import { searches, db } from '@main/database/database'
import { desc } from 'drizzle-orm'
import { CreateSearchInput } from '@shared/types'

export async function getSearches() {
  return await db.select().from(searches).orderBy(desc(searches.createdAt))
}

export async function createSearch(data: CreateSearchInput) {
  return await db.insert(searches).values(data).returning()
}

