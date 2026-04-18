export type Search = {
  id: number
  title: string
  query: string
  createdAt: Date
  updatedAt: Date
}

export type CreateSearchInput = Pick<Search, 'title' | 'query'>

export type SearchResult = {
  id: number
  searchId: number | null
  title: string
  address: string
  rating: number | null
  reviews: number | null
  phone: string | null
  website: string | null
  price: string | null
  latitude: number | null
  longitude: number | null
  placeId: string | null
  openingHours: string | null
  plusCode: string | null
  type: string | null
  url: string | null
  createdAt: Date
}

export type CreateSearchResultInput = Omit<SearchResult, 'id' | 'createdAt'>
