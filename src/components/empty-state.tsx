import { useSearchParams } from "@solidjs/router";
import { Icons } from "~/components/icons";

export default function EmptyState() {
  const [, setSearchParams] = useSearchParams();

  const handleClearFilters = () => {
    // Clear all search params
    setSearchParams({});
  };

  return (
    <div class="text-center py-20">
      <div
        class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400"
        aria-hidden="true"
      >
        <Icons.search size={32} />
      </div>
      <h3 class="text-xl font-bold text-gray-900 mb-2">No results found</h3>
      <p class="text-gray-500">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <button
        onClick={handleClearFilters}
        class="mt-6 text-blue-600 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-4 py-2"
      >
        Clear all filters
      </button>
    </div>
  );
}
