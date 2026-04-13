import { For } from "solid-js";
import Badge from "./ui/Badge";
import { ExternalLink, X } from "lucide-solid";

interface LessonModalProps {
  lesson: Lesson;
  courseTitle: string;
  onClose: () => void;
}

export default function LessonModal(props: LessonModalProps) {
  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
      onClick={props.onClose}
    >
      <div
        class="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={props.onClose}
          class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <div class="p-8">
          <div class="flex items-center gap-2 mb-4">
            <Badge class="bg-blue-100 text-blue-700">
              {props.lesson.level}
            </Badge>
            <span class="text-xs text-gray-400 font-medium uppercase tracking-widest">
              {props.courseTitle}
            </span>
          </div>

          <h3 class="text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {props.lesson.title}
          </h3>

          <p class="text-gray-600 mb-8 leading-relaxed">
            {props.lesson.description}
          </p>

          <div class="flex flex-wrap gap-2 mb-8">
            <For each={props.lesson.tags}>
              {(tag) => (
                <span class="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  #{tag}
                </span>
              )}
            </For>
          </div>

          <div class="flex flex-col gap-3">
            <For each={props.lesson.assets}>
              {(asset) => (
                <a
                  href={asset.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-xl font-semibold transition-all group shadow-lg shadow-blue-600/20"
                >
                  <span class="flex items-center gap-2">
                    View Training Material
                    <span class="text-xs opacity-70 font-normal">
                      ({asset.type.toUpperCase()})
                    </span>
                  </span>
                  <ExternalLink
                    size={18}
                    class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                  />
                </a>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
}
