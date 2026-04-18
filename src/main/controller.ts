import { ipcMain } from 'electron'
import { getSearches, createSearch, getSearchById } from './controller/search'
import { createSearchResultBulk, getSearchResults } from './controller/search-result'
import { ExcelExporter } from './controller/export'
import { CreateSearchInput, CreateSearchResultInput, Search } from '@shared/types'

export function registerSearchHandler() {
  ipcMain.handle('search:get-all', async () => {
    return await getSearches()
  })

  ipcMain.handle('search:create', async (_, data: CreateSearchInput) => {
    return await createSearch(data)
  })

  ipcMain.handle('search:get', async (_, id: number) => {
    return await getSearchById(id)
  })
}

export function registerSearchResultHandler() {
  ipcMain.handle('search-result:create-bulk', async (_, results: CreateSearchResultInput[]) => {
    return await createSearchResultBulk(results)
  })

  ipcMain.handle('search-result:get-all', async (_, params?: { search_id?: number }) => {
    return await getSearchResults(params)
  })
}

export function registerExportHandler() {
  ipcMain.handle('export:excel', async (_, search: Search) => {
    return await new ExcelExporter().export(search)
  })
}
