import { Route, Routes } from 'react-router'
import { Search } from '@renderer/routes/search'
import { SearchDetail } from '@renderer/routes/search-detail'

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Search />} />
      <Route path="/search/:id" element={<SearchDetail />} />
    </Routes>
  )
}
