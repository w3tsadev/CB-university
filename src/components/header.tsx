import { Icons } from "./icons";

export default function Header() {
  return (
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
          {/* <nav class="hidden md:flex items-center gap-8">
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
          </nav> */}
        </div>
      </div>
    </header>
  );
}
