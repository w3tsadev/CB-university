import { useSearchParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import { Icons } from "~/components/icons";

interface SearchProps {
  placeholder: string;
  value: string;
}

export default function Search(props: SearchProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFocused, setIsFocused] = createSignal(false);

  let inputRef: HTMLInputElement | undefined;

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const value = target.value;

    // Update URL with search term, preserve category if it exists
    setSearchParams({ q: value });
  };

  const clearSearch = () => {
    // Remove q param but keep category if it exists
    setSearchParams({ q: "", category: "" });

    // Focus the input after clearing
    inputRef?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      clearSearch();
    }
  };

  const hasSearchTerm = () => (props.value?.length ?? 0) > 0;

  return (
    <form
      class="relative max-w-2xl mx-auto"
      role="search"
      onSubmit={(e) => e.preventDefault()}
    >
      <label for="search" class="sr-only">
        Search
      </label>

      {/* Search Icon */}
      <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icons.search
          class="h-5 w-5 transition-colors"
          classList={{
            "text-gray-400": !isFocused(),
            "text-blue-500": isFocused(),
          }}
          aria-hidden="true"
        />
      </div>

      <input
        ref={inputRef}
        type="search"
        id="search"
        class="block w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
        classList={{
          "border-blue-500": isFocused(),
          "border-gray-200": !isFocused(),
        }}
        placeholder={props.placeholder}
        value={props.value || ""}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        aria-label="Search courses, lessons, or tags"
      />

      {/* Clear Button */}
      <button
        type="button"
        class="absolute inset-y-0 right-0 pr-4 flex items-center"
        classList={{
          "opacity-100 pointer-events-auto": hasSearchTerm(),
          "opacity-0 pointer-events-none": !hasSearchTerm(),
        }}
        onClick={clearSearch}
        aria-label="Clear search"
        tabIndex={hasSearchTerm() ? 0 : -1}
      >
        <Icons.x class="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
      </button>
    </form>
  );
}
