<script setup lang="ts">
import { ref, computed } from 'vue'
import { portfolioData, type ProjectCategory, type ProjectItem } from '@/stores/portfolioData'
import { useTheme } from '@/composables/useTheme'
import { useAppRouter } from '@/routers'
import PortfolioLayout from '@/layouts/PortfolioLayout.vue'
import BaseInput from '@/components/base/baseInput.vue'
import BaseButton from '@/components/base/baseButton.vue'
import ProjectCard from '@/components/portfolio/ProjectCard.vue'
import ProjectDetailModal from '@/components/portfolio/ProjectDetailModal.vue'

const { isDark, toggleTheme } = useTheme()
const { navigateTo } = useAppRouter()

const activeProject = ref<ProjectItem | null>(null)
const selectedCategory = ref<'All' | ProjectCategory>('All')
const searchQuery = ref('')

const categories: Array<'All' | ProjectCategory> = [
  'All',
  'Full-Stack',
  'Frontend',
  'Backend & DevOps',
]

const filteredProjects = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return portfolioData.projects.filter((project) => {
    const matchesCategory =
      selectedCategory.value === 'All' || project.category === selectedCategory.value
    if (!matchesCategory) return false
    if (!q) return true

    return (
      project.title.toLowerCase().includes(q) ||
      project.subtitle.toLowerCase().includes(q) ||
      project.summary.toLowerCase().includes(q) ||
      project.stack.some((tech) => tech.toLowerCase().includes(q))
    )
  })
})

function countByCategory(cat: 'All' | ProjectCategory) {
  if (cat === 'All') return portfolioData.projects.length
  return portfolioData.projects.filter((p) => p.category === cat).length
}

function resetFilters() {
  selectedCategory.value = 'All'
  searchQuery.value = ''
}
</script>

<template>
  <PortfolioLayout
    :handle="portfolioData.handle"
    :github-url="portfolioData.githubUrl"
    :telegram-url="portfolioData.telegramUrl"
    :is-dark="isDark"
    @toggle-theme="toggleTheme"
  >
    <!-- Top Archive Navigation & Intro -->
    <div
      v-reveal="40"
      class="mt-8 mb-7 flex flex-col justify-between gap-4 sm:mt-10 sm:flex-row sm:items-end"
    >
      <div>
        <button
          type="button"
          class="inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
          @click="navigateTo('home')"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          <span>Back to homepage</span>
        </button>

        <h1 class="mt-3 text-xl font-semibold tracking-[-0.015em] text-zinc-900 dark:text-zinc-100">
          All Projects
        </h1>
        <p class="mt-1 text-[13.5px] text-zinc-500 dark:text-zinc-400">
          Complete archive of web applications, developer tools, and backend services.
        </p>
      </div>

      <div class="w-full sm:w-64">
        <BaseInput
          v-model="searchQuery"
          placeholder="Search name or tech stack..."
          aria-label="Search projects by name or tech stack"
        />
      </div>
    </div>

    <!-- Category Filter Bar -->
    <div class="mb-5 flex flex-wrap items-center gap-2" role="tablist" aria-label="Project categories">
      <button
        v-for="cat in categories"
        :key="cat"
        type="button"
        role="tab"
        :aria-selected="selectedCategory === cat"
        class="inline-flex cursor-pointer items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:focus-visible:outline-zinc-100"
        :class="
          selectedCategory === cat
            ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950'
            : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900 dark:border-carbon-line dark:bg-carbon dark:text-zinc-400 dark:hover:border-zinc-700 dark:hover:text-zinc-100'
        "
        @click="selectedCategory = cat"
      >
        <span>{{ cat }}</span>
        <span
          class="font-mono text-[10.5px]"
          :class="
            selectedCategory === cat
              ? 'text-zinc-300 dark:text-zinc-600'
              : 'text-zinc-400 dark:text-zinc-500'
          "
        >
          {{ countByCategory(cat) }}
        </span>
      </button>
    </div>

    <!-- Dot-Matrix Archive Grid -->
    <section
      v-reveal="100"
      aria-label="Project archive"
      class="relative rounded-lg border border-zinc-200 bg-white bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:16px_16px] bg-[position:8px_8px] p-4 sm:p-5 dark:border-carbon-line dark:bg-carbon dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]"
    >
      <div
        v-if="filteredProjects.length > 0"
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[18px] lg:grid-cols-3"
      >
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
          @select="activeProject = $event"
        />
      </div>

      <!-- Helpful Empty State -->
      <div
        v-else
        class="flex flex-col items-center justify-center rounded-md border border-zinc-200 bg-white py-14 px-4 text-center dark:border-carbon-line dark:bg-carbon"
      >
        <p class="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          No projects match your current filter.
        </p>
        <p class="mt-1 mb-4 text-xs text-zinc-500 dark:text-zinc-400">
          Try another keyword or clear the active category filter.
        </p>
        <BaseButton variant="outline" @click="resetFilters">
          Clear filters
        </BaseButton>
      </div>
    </section>

    <ProjectDetailModal :project="activeProject" @close="activeProject = null" />
  </PortfolioLayout>
</template>
