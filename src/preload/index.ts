import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {
  CreateSearchInput,
  CreateSearchResultInput,
  Search,
  UpdateSearchInput
} from '@shared/types'

// Custom APIs for renderer
const api = {
  mapsEngine: {
    init: () => ipcRenderer.invoke('maps-engine:init'),
    close: () => ipcRenderer.invoke('maps-engine:close'),
    search: (query: string, options?: any) => ipcRenderer.invoke('maps-engine:search', query, options)
  },
  search: {
    getAll: () => ipcRenderer.invoke('search:get-all'),
    create: (data: CreateSearchInput) => ipcRenderer.invoke('search:create', data),
    get: (id: number) => ipcRenderer.invoke('search:get', id),
    update: (id: number, data: UpdateSearchInput) => ipcRenderer.invoke('search:update', id, data),
    delete: (id: number) => ipcRenderer.invoke('search:delete', id)
  },
  searchResult: {
    createBulk: (results: CreateSearchResultInput[]) =>
      ipcRenderer.invoke('search-result:create-bulk', results),
    getAll: (params?: { search_id?: number }) => ipcRenderer.invoke('search-result:get-all', params)
  },
  export: {
    excel: (search: Search) => ipcRenderer.invoke('export:excel', search)
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
