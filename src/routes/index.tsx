import { useSearchParams } from "@solidjs/router";
import { createEffect, createMemo, createSignal, For, Show } from "solid-js";
import { Icons } from "~/components/icons";
import LessonModal from "~/components/lesson-modal";
import { TRAINING_DATA } from "~/lib/training_data";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [getSelectedLesson, setSelectedLesson] = createSignal(null);

  // Initialize signals from URL params
  const [getSearchQuery, setSearchQuery] = createSignal(searchParams.q || "");
  const [getSelectedCategory, setSelectedCategory] = createSignal(
    searchParams.category || "All",
  );

  // Update URL when filters change
  createEffect(() => {
    const params = {};
    const query = getSearchQuery();
    const category = getSelectedCategory();

    if (query) params.q = query;
    if (category && category !== "All") params.category = category;

    setSearchParams(params, { replace: true });
  });

  const courses = createMemo(() => {
    return Object.entries(TRAINING_DATA.courses)
      .map(([id, data]) => ({
        id,
        ...data,
      }))
      .sort((a, b) => a.priority - b.priority);
  });

  const categories = createMemo(() => {
    const cats = new Set(courses().map((c) => c.category));
    return ["All", ...Array.from(cats)];
  });

  const filteredCourses = createMemo(() => {
    const query = getSearchQuery().toLowerCase();
    const category = getSelectedCategory();

    return courses().filter((course) => {
      const matchesCategory =
        category === "All" || course.category === category;
      const matchesSearch =
        !query ||
        course.title.toLowerCase().includes(query) ||
        course.lessons.some(
          (l) =>
            l.title.toLowerCase().includes(query) ||
            l.tags.some((t) => t.toLowerCase().includes(query)),
        );
      return matchesCategory && matchesSearch;
    });
  });

  const handleSearchInput = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
  };

  const handleLessonSelect = (lesson, courseTitle) => {
    setSelectedLesson({ lesson, courseTitle });
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  return (
    <div class="min-h-screen bg-gray-50 selection:bg-blue-100 selection:text-blue-900">
      {/* Header */}
      <header class="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-20">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <Icons.graduationCap size={24} />
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900 tracking-tight">
                  CloudBees University
                </h1>
                <p class="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] -mt-1">
                  Training Directory
                </p>
              </div>
            </div>
            <nav class="hidden md:flex items-center gap-8">
              <a
                href="/catalog"
                class="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                Catalog
              </a>
              <a
                href="/certifications"
                class="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                Certifications
              </a>
              <a
                href="/resources"
                class="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
              >
                Resources
              </a>
              <button class="bg-gray-900 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-800 transition-all shadow-md">
                Sign In
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div class="mb-16 text-center max-w-3xl mx-auto">
          <h2 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Master the <span class="text-blue-600">DevOps</span> Ecosystem
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed">
            Explore our comprehensive directory of Jenkins and CloudBees
            training materials. From foundational OSS concepts to advanced
            enterprise orchestration.
          </p>
        </div>

        {/* Filters */}
        <div class="mb-12 space-y-8">
          <div class="relative max-w-2xl mx-auto">
            <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Icons.search class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses, lessons, or tags..."
              class="block w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
              value={getSearchQuery()}
              onInput={handleSearchInput}
            />
          </div>

          <div class="flex flex-wrap justify-center gap-2">
            <For each={categories()}>
              {(cat) => (
                <button
                  onClick={() => handleCategorySelect(cat)}
                  class={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                    getSelectedCategory() === cat
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
                >
                  {cat}
                </button>
              )}
            </For>
          </div>
        </div>

        {/* Course Grid */}
        <Show
          when={filteredCourses().length > 0}
          fallback={
            <div class="text-center py-20">
              <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Icons.search size={32} />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                No results found
              </h3>
              <p class="text-gray-500">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={handleClearFilters}
                class="mt-6 text-blue-600 font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          }
        >
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <For each={filteredCourses()}>
              {(course) => {
                const IconComponent =
                  course.category === "Certification"
                    ? Icons.award
                    : course.category === "Platform"
                      ? Icons.layers
                      : Icons.bookOpen;

                return (
                  <div class="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all flex flex-col">
                    <div class="p-8 grow">
                      <div class="flex justify-between items-start mb-6">
                        <div class="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <IconComponent size={24} />
                        </div>
                        <div class="flex flex-col items-end">
                          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                            Priority
                          </span>
                          <span class="text-lg font-mono font-bold text-gray-900 leading-none">
                            #{course.priority}
                          </span>
                        </div>
                      </div>

                      <h3 class="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                        {course.title}
                      </h3>
                      <p class="text-xs font-medium text-gray-400 uppercase tracking-widest mb-8">
                        {course.category}
                      </p>

                      <div class="space-y-3">
                        <p class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
                          Lessons
                        </p>
                        <For each={course.lessons}>
                          {(lesson) => (
                            <button
                              onClick={() =>
                                handleLessonSelect(lesson, course.title)
                              }
                              class="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors group/lesson text-left"
                            >
                              <div class="flex items-center gap-3">
                                <div class="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/lesson:bg-blue-600" />
                                <span class="text-sm font-semibold text-gray-700 group-hover/lesson:text-blue-700 transition-colors line-clamp-1">
                                  {lesson.title}
                                </span>
                              </div>
                              <Icons.chevronRight
                                size={16}
                                class="text-gray-300 group-hover/lesson:text-blue-400 group-hover/lesson:translate-x-1 transition-all"
                              />
                            </button>
                          )}
                        </For>
                      </div>
                    </div>

                    <div class="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                      <span class="text-xs font-medium text-gray-500">
                        {course.lessons.length}{" "}
                        {course.lessons.length === 1 ? "Lesson" : "Lessons"}
                      </span>
                      <button
                        onClick={() =>
                          handleLessonSelect(course.lessons[0], course.title)
                        }
                        class="text-sm font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Start Learning <Icons.arrowRight size={16} />
                      </button>
                    </div>
                  </div>
                );
              }}
            </For>
          </div>
        </Show>
      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-gray-200 py-12 mt-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white">
                <Icons.graduationCap size={18} />
              </div>
              <span class="font-bold text-gray-900 tracking-tight">
                CloudBees University
              </span>
            </div>
            <div class="flex gap-8 text-sm font-medium text-gray-500">
              <a href="/privacy" class="hover:text-blue-600 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" class="hover:text-blue-600 transition-colors">
                Terms of Service
              </a>
              <a href="/support" class="hover:text-blue-600 transition-colors">
                Support
              </a>
            </div>
            <p class="text-sm text-gray-400">
              © 2026 CloudBees, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Lesson Details Modal */}
      <Show when={getSelectedLesson()}>
        {(selectedData) => (
          <LessonModal
            lesson={selectedData().lesson}
            courseTitle={selectedData().courseTitle}
            onClose={() => setSelectedLesson(null)}
          />
        )}
      </Show>
    </div>
  );
}
