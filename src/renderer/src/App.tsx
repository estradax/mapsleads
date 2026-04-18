import { useState } from 'react'
import { SearchInput } from '@renderer/components/search-input'
import { SearchOverlay } from '@renderer/components/search-overlay'

export function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')
  const [isSearching, setIsSearching] = useState(false)

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
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="hero-content text-center min-w-2xl">
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl font-bold mb-8 text-primary">MapsLeads</h1>
          <SearchInput value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
        </div>
      </div>
      <SearchOverlay visible={isSearching} />
    </div>
  )
}
