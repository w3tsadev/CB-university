import { For } from "solid-js";
import { Icons } from "~/components/icons";
import type { Lesson, Course } from "~/lib/types";

interface CourseCardProps {
  course: Course;
  onLessonSelect: (lesson: Lesson, courseTitle: string) => void;
}

export default function CourseCard(props: CourseCardProps) {
  const getIconComponent = (category: string) => {
    const icons: Record<string, typeof Icons.bookOpen> = {
      Certification: Icons.award,
      Platform: Icons.layers,
    };
    return icons[category] || Icons.bookOpen;
  };

  const IconComponent = () => {
    const Icon = getIconComponent(props.course.category);
    return <Icon size={24} />;
  };

  return (
    <div class="group bg-white rounded-3xl border border-gray-200 overflow-hidden hover:shadow-2xl hover:shadow-blue-900/5 transition-all flex flex-col">
      <div class="p-8 grow">
        <div class="flex justify-between items-start mb-6">
          <div
            class="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors"
            aria-hidden="true"
          >
            <IconComponent />
          </div>
          <div class="flex flex-col items-end">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Priority
            </span>
            <span
              class="text-lg font-mono font-bold text-gray-900 leading-none"
              aria-label={`Priority ${props.course.priority}`}
            >
              #{props.course.priority}
            </span>
          </div>
        </div>

        <h3 class="text-xl font-bold text-gray-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
          {props.course.title}
        </h3>
        <p class="text-xs font-medium text-gray-400 uppercase tracking-widest mb-8">
          {props.course.category}
        </p>

        <div class="space-y-3">
          <p class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-2">
            Lessons
          </p>
          <For each={props.course.lessons}>
            {(lesson) => (
              <button
                onClick={() => props.onLessonSelect(lesson, props.course.title)}
                class="w-full flex items-center justify-between p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors group/lesson text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`Start lesson: ${lesson.title}`}
                data-testid={`lesson-${lesson.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover/lesson:bg-blue-600"
                    aria-hidden="true"
                  />
                  <span class="text-sm font-semibold text-gray-700 group-hover/lesson:text-blue-700 transition-colors line-clamp-1">
                    {lesson.title}
                  </span>
                </div>
                <Icons.chevronRight
                  size={16}
                  class="text-gray-300 group-hover/lesson:text-blue-400 group-hover/lesson:translate-x-1 transition-all"
                  aria-hidden="true"
                />
              </button>
            )}
          </For>
        </div>
      </div>

      <div class="px-8 py-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span class="text-xs font-medium text-gray-500">
          {props.course.lessons.length}{" "}
          {props.course.lessons.length === 1 ? "Lesson" : "Lessons"}
        </span>
        <button
          onClick={() =>
            props.onLessonSelect(props.course.lessons[0], props.course.title)
          }
          class="text-sm font-bold text-blue-600 flex items-center gap-1 hover:gap-2 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-3 py-1"
          aria-label={`Start first lesson of ${props.course.title}`}
        >
          Start Learning <Icons.arrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
