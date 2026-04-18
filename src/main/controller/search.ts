import { searches, db } from '@main/database/database'
import { desc, eq } from 'drizzle-orm'
import { CreateSearchInput } from '@shared/types'

export async function getSearches() {
  return await db.select().from(searches).orderBy(desc(searches.createdAt))
}

export async function getSearchById(id: number) {
  const result = await db.select().from(searches).where(eq(searches.id, id))
  return result[0]
}

export async function createSearch(data: CreateSearchInput) {
  return await db.insert(searches).values(data).returning()
}

