import { ElectronAPI } from '@electron-toolkit/preload'
import { MapSearchResult } from '../main/engine/maps-engine'

type Search = {
  id: number
  title: string
  query: string
  createdAt: Date
  updatedAt: Date
}

type MapsEngineAPI = {
  init: () => Promise<void>
  close: () => Promise<void>
  search: (query: string) => Promise<MapSearchResult[]>
}

type SearchAPI = {
  getAll: () => Promise<Search[]>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      mapsEngine: MapsEngineAPI
      search: SearchAPI
    }
  }
}
