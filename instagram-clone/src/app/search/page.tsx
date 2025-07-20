import SearchForm from "@/components/search-form";
import SearchResults from "@/components/search-results";

export default async function SearchPage({
    searchParams: {query}
}:{
    searchParams: {query: string}
}) {
    return (
        <div className="w-full flex flex-col items-center">
            <SearchForm />
            {query && (
                <SearchResults query={query} />
            )}
            {!query && (
                <div className="text-gray-500">
                    Enter your search query...
                </div>
            )}
        </div>
    )
}