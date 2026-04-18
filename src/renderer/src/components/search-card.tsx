import { Calendar, Search as SearchIcon } from 'lucide-react'

type Search = {
  id: number
  title: string
  query: string
  createdAt: Date
  updatedAt: Date
}

type SearchCardProps = {
  search: Search
}

export function SearchCard({ search }: SearchCardProps) {
  const date = search.createdAt ? new Date(search.createdAt) : new Date()
  const formattedDate = date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 overflow-hidden">
            <h3 className="card-title text-base font-bold group-hover:text-primary transition-colors truncate">
              {search.title}
            </h3>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-base-content/60">
              <SearchIcon size={12} className="min-w-[12px]" />
              <span className="truncate">{search.query}</span>
            </div>
          </div>
          <div className="badge badge-ghost badge-sm py-2 ml-2 min-w-fit">ID: {search.id}</div>
        </div>

        <div className="flex items-center gap-1.5 mt-4 text-[10px] font-medium uppercase tracking-wider text-base-content/40">
          <Calendar size={10} />
          {formattedDate}
        </div>
      </div>
    </div>
  )
}
