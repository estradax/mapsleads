import { useState } from 'react'
import { SearchInput } from '@renderer/components/search-input'

export function App(): React.JSX.Element {
  const [inputValue, setInputValue] = useState('')

  const handleSearch = (): void => {
    console.log('Searching for:', inputValue)
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="hero-content text-center min-w-2xl">
        <div className="max-w-4xl w-full">
          <h1 className="text-5xl font-bold mb-8 text-primary">MapsLeads</h1>
          <SearchInput value={inputValue} onChange={setInputValue} onSearch={handleSearch} />
        </div>
      </div>
    </div>
  )
}
