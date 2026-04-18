import { useState } from 'react'
import { SearchInput } from '@renderer/components/search-input'
import { SearchOverlay } from '@renderer/components/search-overlay'
import { useQuery } from '@tanstack/react-query'
import { SearchCard } from '@renderer/components/search-card'

export function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const searchesQuery = useQuery({
    queryKey: ['searches'],
    queryFn: () => window.api.search.getAll()
  })

  const handleSearch = async (): Promise<void> => {
    setIsSearching(true)
    try {
      await window.api.mapsEngine.init()
      const results = await window.api.mapsEngine.search(inputValue)
      console.log('Search results:', results)
    } catch (error) {
      console.error('Search failed:', error)
    } finally {
      await window.api.mapsEngine.close()
      setIsSearching(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center pt-20 p-4">
      <div className="text-center w-full max-w-4xl px-4">
        <h1 className="text-5xl font-bold mb-8 text-primary">MapsLeads</h1>
        <SearchInput value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
      </div>

      {searchesQuery.data && searchesQuery.data.length > 0 && (
        <div className="w-full max-w-6xl mt-16">
          <div className="flex items-center justify-between mb-6 px-2">
            <h2 className="text-xl font-semibold opacity-70">Search History</h2>
            <div className="badge badge-outline opacity-50">
              {searchesQuery.data?.length || 0} searches
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchesQuery.data.map((search) => (
              <SearchCard key={search.id} search={search} />
            ))}
          </div>
        </div>
      )}

      <SearchOverlay visible={isSearching} />
    </div>
  )
}
