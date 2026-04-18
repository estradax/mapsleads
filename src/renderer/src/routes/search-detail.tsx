import { useParams, Link } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, MapPin, Star, Phone, Globe, Calendar, Briefcase } from 'lucide-react'

export function SearchDetail(): React.JSX.Element {
  const { id } = useParams<{ id: string }>()
  const searchId = Number(id)

  const searchQuery = useQuery({
    queryKey: ['search', searchId],
    queryFn: () => window.api.search.get(searchId),
    enabled: !!searchId
  })

  const resultsQuery = useQuery({
    queryKey: ['searchResults', searchId],
    queryFn: () => window.api.searchResult.getAll({ search_id: searchId }),
    enabled: !!searchId
  })

  const isLoading = searchQuery.isLoading || resultsQuery.isLoading
  const search = searchQuery.data
  const results = resultsQuery.data || []

  if (isLoading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  if (!search) {
    return (
      <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold opacity-50">Search not found</h1>
        <Link to="/" className="btn btn-primary btn-sm">
          <ArrowLeft size={16} /> Go Back
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <Link to="/" className="btn btn-ghost btn-sm gap-2 pl-0 hover:bg-transparent">
              <ArrowLeft size={16} /> Back to Search
            </Link>
            <h1 className="text-4xl font-extrabold text-primary tracking-tight">{search.title}</h1>
            <div className="flex items-center gap-4 text-sm text-base-content/60">
              <span className="flex items-center gap-1.5">
                <Briefcase size={14} /> {search.query}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} /> {new Date(search.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="stats shadow bg-base-100">
            <div className="stat">
              <div className="stat-title text-xs uppercase tracking-wider font-bold opacity-50">
                Total Leads
              </div>
              <div className="stat-value text-primary text-3xl">{results.length}</div>
              <div className="stat-desc">collected from maps</div>
            </div>
          </div>
        </div>

        {/* Results Table */}
        <div className="card bg-base-100 shadow-xl overflow-hidden border border-base-300">
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-sm">
              <thead className="bg-base-300/50">
                <tr>
                  <th className="font-bold">Business Name</th>
                  <th className="font-bold">Rating</th>
                  <th className="font-bold">Contact</th>
                  <th className="font-bold">Address</th>
                  <th className="font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="hover:bg-primary/5 transition-colors group">
                    <td>
                      <div className="font-bold text-base group-hover:text-primary transition-colors">
                        {result.title}
                      </div>
                      <div className="text-xs opacity-50 flex items-center gap-1 mt-0.5">
                        <MapPin size={10} /> {result.type || 'Business'}
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <div className="flex items-center text-warning font-bold">
                          <Star size={14} fill="currentColor" />
                          <span className="ml-1">{result.rating || 'N/A'}</span>
                        </div>
                        <span className="text-xs opacity-50">({result.reviews || 0})</span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col gap-1">
                        {result.phone && (
                          <div className="flex items-center gap-1.5 text-xs">
                            <Phone size={12} className="text-success" />
                            {result.phone}
                          </div>
                        )}
                        {result.website && (
                          <a
                            href={result.website}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1.5 text-xs text-info hover:underline"
                          >
                            <Globe size={12} />
                            Website
                          </a>
                        )}
                        {!result.phone && !result.website && (
                          <span className="text-xs opacity-30 italic">No contact info</span>
                        )}
                      </div>
                    </td>
                    <td className="max-w-xs truncate">
                      <div className="text-xs opacity-70 truncate" title={result.address}>
                        {result.address}
                      </div>
                    </td>
                    <td>
                      {result.url && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-ghost btn-xs btn-square"
                        >
                          <MapPin size={14} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
                {results.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-20 opacity-30 italic font-medium">
                      No results found for this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
