import { ipcMain } from 'electron'
import { getSearches } from './controller/search'

export function registerSearchHandler() {
  ipcMain.handle('search:get-all', async () => {
    return await getSearches()
  })
}
