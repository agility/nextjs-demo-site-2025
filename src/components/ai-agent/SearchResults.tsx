'use client'

interface SearchResult {
	id?: string
	title: string
	description?: string
	url?: string
	image?: string
}

interface SearchResultsProps {
	results: SearchResult[]
	totalHits?: number
	error?: string
	isLoading?: boolean
}

export function SearchResults({ results, totalHits, error, isLoading }: SearchResultsProps) {
	if (isLoading) {
		return (
			<div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
				<div className="flex items-center gap-2">
					<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" />
					<p className="text-sm text-blue-700 dark:text-blue-300">
						Searching...
					</p>
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
				<p className="text-sm text-red-700 dark:text-red-300">
					Search error: {error}
				</p>
			</div>
		)
	}

	if (!results || results.length === 0) {
		return (
			<div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
				<p className="text-sm text-yellow-700 dark:text-yellow-300">
					No results found for your search.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-3">
			<div className="text-sm text-gray-600 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 pb-2">
				Found {results.length} relevant results{totalHits && totalHits > results.length ? ` (showing top ${results.length} of ${totalHits})` : ''}:
			</div>
			{results.slice(0, 5).map((result, idx) => (
				<SearchResultCard key={result.id || idx} result={result} />
			))}
		</div>
	)
}

interface SearchResultCardProps {
	result: SearchResult
}

function SearchResultCard({ result }: SearchResultCardProps) {
	return (
		<div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1 min-w-0">
					<h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 line-clamp-2">
						{result.title || 'Untitled'}
					</h4>
					{result.description && (
						<p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-3">
							{result.description}
						</p>
					)}
					{result.url && result.url !== '#' && (
						<a
							href={result.url}
							className="text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1 inline-block"
							target="_blank"
							rel="noopener noreferrer"
						>
							View page →
						</a>
					)}
				</div>
				{result.image && (
					<img
						src={result.image}
						alt={result.title || 'Result image'}
						className="w-12 h-12 rounded object-cover bg-gray-100 dark:bg-gray-800"
					/>
				)}
			</div>
		</div>
	)
}