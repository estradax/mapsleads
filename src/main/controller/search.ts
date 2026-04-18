import { db, searches } from '@main/database/database'
import { desc } from 'drizzle-orm'

export async function getSearches() {
  return await db.select().from(searches).orderBy(desc(searches.createdAt))
}
