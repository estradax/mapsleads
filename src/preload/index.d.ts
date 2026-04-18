import { ElectronAPI } from '@electron-toolkit/preload'
import { MapSearchResult } from '../main/engine/maps-engine'

type MapsEngineAPI = {
  init: () => Promise<void>
  close: () => Promise<void>
  search: (query: string) => Promise<MapSearchResult[]>
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      mapsEngine: MapsEngineAPI
    }
  }
}
