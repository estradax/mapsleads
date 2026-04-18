export type MapSearchResult = {
  title: string
  address: string
  rating?: number | undefined
  reviews?: number | undefined
  phone?: string | undefined
  website?: string | undefined
  price?: string | undefined
  gps_coordinates?:
    | {
        latitude: number
        longitude: number
      }
    | undefined
  place_id?: string | undefined
  opening_hours?: string[] | undefined
  plus_code?: string | undefined
  type?: string | undefined
  url?: string | undefined
}

export type SearchOptions = {
  maxScrolls?: number
}

export type MapsEngine = {
  init(): Promise<void>
  close(): Promise<void>
  search(query: string, options?: SearchOptions): Promise<MapSearchResult[]>
}
