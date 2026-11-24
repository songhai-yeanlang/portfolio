<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProjectItem } from '@/stores/portfolioData'
import BaseButton from '@/components/base/baseButton.vue'
import ProjectCard from './ProjectCard.vue'

const props = withDefaults(
  defineProps<{
    projects: ProjectItem[]
    limit?: number
  }>(),
  {
    limit: 6,
  },
)

const emit = defineEmits<{
  selectProject: [project: ProjectItem]
  viewAll: []
}>()

const isHoveringArchive = ref(false)

const displayedProjects = computed(() => {
  const featured = props.projects.filter((p) => p.featured)
  if (featured.length >= props.limit) {
    return featured.slice(0, props.limit)
  }
  const rest = props.projects.filter((p) => !p.featured)
  return [...featured, ...rest].slice(0, props.limit)
})
</script>

<template>
  <section aria-labelledby="projects-heading" class="relative">
    <!-- 4 Receding Stacked Sheet Layers (Subtly fan upward when hovering "View all projects") -->
    <div aria-hidden="true" class="select-none">
      <div
        class="mx-12 h-[5px] rounded-t-md border-x border-t border-zinc-200/55 bg-white transition-transform duration-200 motion-reduce:transition-none sm:mx-[72px] dark:border-zinc-800/55 dark:bg-carbon"
        :class="isHoveringArchive && '-translate-y-1'"
      />
      <div
        class="mx-9 h-[5px] rounded-t-md border-x border-t border-zinc-200/70 bg-white transition-transform duration-200 motion-reduce:transition-none sm:mx-[52px] dark:border-zinc-800/70 dark:bg-carbon"
        :class="isHoveringArchive && '-translate-y-[3px]'"
      />
      <div
        class="mx-6 h-[5px] rounded-t-md border-x border-t border-zinc-200/85 bg-white transition-transform duration-200 motion-reduce:transition-none sm:mx-[34px] dark:border-zinc-800/85 dark:bg-carbon"
        :class="isHoveringArchive && '-translate-y-0.5'"
      />
      <div
        class="mx-3 h-1.5 rounded-t-md border-x border-t border-zinc-200 bg-white transition-transform duration-200 motion-reduce:transition-none sm:mx-4 dark:border-carbon-line dark:bg-carbon"
        :class="isHoveringArchive && '-translate-y-px'"
      />
    </div>

    <!-- Main Dot-Matrix Projects Frame -->
    <div
      class="relative rounded-lg border border-zinc-200 bg-white bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:16px_16px] bg-[position:8px_8px] p-4 pt-6 sm:p-5 sm:pt-6 dark:border-carbon-line dark:bg-carbon dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]"
    >
      <!-- Centered Section Title Straddling Top Hairline -->
      <h2
        id="projects-heading"
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100"
      >
        PROJECTS
      </h2>

      <!-- 3x2 Featured Card Grid (Max 6 Cards on Homepage) -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-[18px] lg:grid-cols-3">
        <ProjectCard
          v-for="project in displayedProjects"
          :key="project.id"
          :project="project"
          @select="emit('selectProject', $event)"
        />
      </div>

      <!-- Integrated Archive Footer Bar -->
      <div
        v-if="projects.length > displayedProjects.length"
        class="mt-4 flex flex-col items-center justify-between gap-3 rounded-md border border-zinc-200 bg-white px-4 py-2.5 sm:flex-row dark:border-carbon-line dark:bg-carbon"
      >
        <div class="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m12 2 10 5.5-10 5.5L2 7.5 12 2Z" />
            <path d="m2 12.5 10 5.5 10-5.5" />
            <path d="m2 17.5 10 5.5 10-5.5" />
          </svg>
          <span>
            Showing <strong class="font-medium text-zinc-800 dark:text-zinc-200">{{ displayedProjects.length }}</strong> of
            <strong class="font-medium text-zinc-800 dark:text-zinc-200">{{ projects.length }}</strong> projects
          </span>
        </div>

        <div
          @mouseenter="isHoveringArchive = true"
          @mouseleave="isHoveringArchive = false"
        >
          <BaseButton variant="outline" @click="emit('viewAll')">
            View all {{ projects.length }} projects
          </BaseButton>
        </div>
      </div>
    </div>
  </section>
</template>
