import { useLocation } from "@solidjs/router";
import { createMemo, createSignal, For, Show } from "solid-js";
import CategoryFilter from "~/components/category-filter";
import CourseCard from "~/components/course-card";
import EmptyState from "~/components/empty-state";
import Footer from "~/components/footer";
import Header from "~/components/header";
import LessonModal from "~/components/lesson-modal";
import Search from "~/components/search";
import { TRAINING_DATA } from "~/lib/training_data";
import type { Course, Lesson } from "~/lib/types";

// Constants
const DEFAULT_CATEGORY = "All";

export default function Home() {
  const location = useLocation();
  const [selectedLesson, setSelectedLesson] = createSignal<{
    lesson: Lesson;
    courseTitle: string;
  } | null>(null);

  // Derived state directly from URL location
  const searchQuery = () => (location.query.q as string) || "";
  const selectedCategory = () =>
    (location.query.category as string) || DEFAULT_CATEGORY;

  const courses = createMemo(() => {
    return Object.entries(TRAINING_DATA.courses)
      .map(
        ([id, data]) =>
          ({
            id,
            ...data,
          }) as Course,
      )
      .sort((a, b) => a.priority - b.priority);
  });

  const categories = createMemo(() => {
    const cats = new Set(courses().map((c) => c.category));
    return [DEFAULT_CATEGORY, ...Array.from(cats)];
  });

  const filteredCourses = createMemo(() => {
    const query = searchQuery().toLowerCase();
    const category = selectedCategory();

    // Early return for common case
    if (!query && category === DEFAULT_CATEGORY) return courses();

    return courses().filter((course) => {
      const matchesCategory =
        category === DEFAULT_CATEGORY || course.category === category;
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

  const handleLessonSelect = (lesson: Lesson, courseTitle: string) => {
    setSelectedLesson({ lesson, courseTitle });
  };

  const handleCloseModal = () => {
    setSelectedLesson(null);
  };

  return (
    <div class="min-h-screen bg-gray-50 selection:bg-blue-100 selection:text-blue-900">
      <Header />

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div class="mb-16 text-center max-w-3xl mx-auto">
          <h1 class="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Master the <span class="text-blue-600">DevOps</span> Ecosystem
          </h1>
          <p class="text-lg text-gray-600 leading-relaxed">
            Explore our comprehensive directory of Jenkins and CloudBees
            training materials. From foundational OSS concepts to advanced
            enterprise orchestration.
          </p>
        </div>

        {/* Filters */}
        <div class="mb-12 space-y-8">
          <Search
            placeholder="Search courses, lessons, or tags..."
            value={searchQuery()}
          />

          <CategoryFilter
            categories={categories()}
            selectedCategory={selectedCategory()}
          />
        </div>

        {/* Course Grid */}
        <Show when={filteredCourses().length > 0} fallback={<EmptyState />}>
          <div
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            role="region"
            aria-label="Course listings"
            data-testid="course-grid"
          >
            <For each={filteredCourses()}>
              {(course) => (
                <CourseCard
                  course={course}
                  onLessonSelect={handleLessonSelect}
                />
              )}
            </For>
          </div>
        </Show>
      </main>

      <Footer />

      {/* Lesson Details Modal */}
      <Show when={selectedLesson()}>
        {(selectedData) => (
          <LessonModal
            lesson={selectedData().lesson}
            courseTitle={selectedData().courseTitle}
            onClose={handleCloseModal}
          />
        )}
      </Show>
    </div>
  );
}
