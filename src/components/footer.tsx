import { Icons } from "~/components/icons";

export default function Footer() {
  return (
    <footer class="bg-white border-t border-gray-200 py-12 mt-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white"
              aria-hidden="true"
            >
              <Icons.graduationCap size={18} />
            </div>
            <span class="font-bold text-gray-900 tracking-tight">
              CloudBees University
            </span>
          </div>
          <nav aria-label="Footer navigation">
            <div class="flex gap-8 text-sm font-medium text-gray-500">
              <a
                href="/privacy"
                class="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                class="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Terms of Service
              </a>
              <a
                href="/support"
                class="hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                Support
              </a>
            </div>
          </nav>
          <p class="text-sm text-gray-400">
            © 2026 CloudBees, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
