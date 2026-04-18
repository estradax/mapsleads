import { ipcMain } from 'electron'
import { getSearches, createSearch } from './controller/search'
import { createSearchResultBulk } from './controller/search-result'
import { CreateSearchInput, CreateSearchResultInput } from '@shared/types'

export function registerSearchHandler() {
  ipcMain.handle('search:get-all', async () => {
    return await getSearches()
  })

  ipcMain.handle('search:create', async (_, data: CreateSearchInput) => {
    return await createSearch(data)
  })
}

export function registerSearchResultHandler() {
  ipcMain.handle('search-result:create-bulk', async (_, results: CreateSearchResultInput[]) => {
    return await createSearchResultBulk(results)
  })
}
