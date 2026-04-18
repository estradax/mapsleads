import { useState } from 'react'
import { SearchInput } from '@renderer/components/search-input'
import { SearchOverlay } from '@renderer/components/search-overlay'
import { useQuery, useMutation } from '@tanstack/react-query'
import { SearchCard } from '@renderer/components/search-card'

export function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const searchesQuery = useQuery({
    queryKey: ['searches'],
    queryFn: () => window.api.search.getAll()
  })

  const searchMutation = useMutation({
    mutationFn: async (query: string) => {
      await window.api.mapsEngine.init()
      try {
        const results = await window.api.mapsEngine.search(query)
        const search = await window.api.search.create({ title: query, query })
        await window.api.searchResult.createBulk(
          results.map((result) => ({
            searchId: search[0].id,
            title: result.title,
            address: result.address,
            rating: result.rating ?? null,
            reviews: result.reviews ?? null,
            phone: result.phone ?? null,
            website: result.website ?? null,
            price: result.price ?? null,
            latitude: result.gps_coordinates?.latitude ?? null,
            longitude: result.gps_coordinates?.longitude ?? null,
            placeId: result.place_id ?? null,
            openingHours: result.opening_hours ? JSON.stringify(result.opening_hours) : null,
            plusCode: result.plus_code ?? null,
            type: result.type ?? null,
            url: result.url ?? null
          }))
        )
      } finally {
        await window.api.mapsEngine.close()
      }
    },
    onSuccess: () => {
      setInputValue('')
      searchesQuery.refetch()
    },
    onError: (error) => {
      console.error('Search failed:', error)
    }
  })

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pt-20 p-4">
      <div className="text-center w-full max-w-3xl px-4">
        <h1 className="text-5xl font-bold mb-8 text-primary">MapsLeads</h1>
        <SearchInput
          value={inputValue}
          onChange={setInputValue}
          onSearch={() => searchMutation.mutate(inputValue)}
        />
      </div>

      {searchesQuery.data && searchesQuery.data.length > 0 && (
        <div className="w-full max-w-6xl mt-16">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-semibold opacity-70">Search History</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchesQuery.data.map((search) => (
              <SearchCard key={search.id} search={search} />
            ))}
          </div>
        </div>
      )}

      <SearchOverlay visible={searchMutation.isPending} />
    </div>
  )
}
