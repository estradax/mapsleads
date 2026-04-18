import { searches, db } from '@main/database/database'
import { desc, eq } from 'drizzle-orm'
import { CreateSearchInput, UpdateSearchInput } from '@shared/types'

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

export async function updateSearch(id: number, data: UpdateSearchInput) {
  return await db.update(searches).set(data).where(eq(searches.id, id)).returning()
}

export async function deleteSearch(id: number) {
  return await db.delete(searches).where(eq(searches.id, id)).returning()
}

