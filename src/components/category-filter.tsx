import { useSearchParams } from "@solidjs/router";
import { For } from "solid-js";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
}

const DEFAULT_CATEGORY = "All";

export default function CategoryFilter(props: CategoryFilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategorySelect = (cat: string) => {
    // Create new params object from current params

    if (cat === DEFAULT_CATEGORY) {
      // Remove category param for "All"
      setSearchParams({ q: "", category: "" });
    } else {
      // Set category param
      setSearchParams({ category: cat });
    }
  };

  return (
    <div
      class="flex flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Course categories"
    >
      <For each={props.categories}>
        {(cat) => (
          <button
            onClick={() => handleCategorySelect(cat)}
            role="tab"
            aria-selected={props.selectedCategory === cat}
            class={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              props.selectedCategory === cat
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
            }`}
          >
            {cat}
          </button>
        )}
      </For>
    </div>
  );
}
