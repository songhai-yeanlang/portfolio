<script setup lang="ts">
import type { ProjectItem } from '@/stores/portfolioData'
import ProjectImagePreview from './ProjectImagePreview.vue'

defineProps<{
  project: ProjectItem
}>()

const emit = defineEmits<{
  select: [project: ProjectItem]
}>()
</script>

<template>
  <button
    type="button"
    class="group flex w-full cursor-pointer flex-col rounded-md border border-zinc-200 bg-white p-3.5 text-center transition-colors duration-150 hover:border-zinc-300 focus-visible:border-zinc-500 focus-visible:outline-none motion-reduce:transition-none dark:border-carbon-line dark:bg-carbon dark:hover:border-zinc-700 dark:focus-visible:border-zinc-400"
    @click="emit('select', project)"
  >
    <!-- Subtle Top Spec Metadata Row -->
    <div class="mb-2.5 flex w-full items-center justify-between text-[10.5px] text-zinc-400 dark:text-zinc-500">
      <span class="font-mono">{{ project.category }}</span>
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.7"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none"
        aria-hidden="true"
      >
        <path d="M7 17 17 7" />
        <path d="M8 7h9v9" />
      </svg>
    </div>

    <!-- Full-Width 16:10 Project Image Preview -->
    <ProjectImagePreview
      :image="project.image"
      :title="project.title"
      aspect-class="aspect-[16/10]"
    />

    <!-- Title & Plain-Language Subtitle -->
    <span class="mt-3 text-sm font-medium leading-snug text-zinc-900 dark:text-zinc-100">
      {{ project.title }}
    </span>
    <span class="mt-0.5 text-xs leading-snug text-zinc-500 dark:text-zinc-400">
      {{ project.subtitle }}
    </span>

    <!-- Quiet Monochrome Tech Stack Footer -->
    <div
      class="mt-3 flex w-full flex-wrap items-center justify-center gap-1 border-t border-zinc-100 pt-2.5 dark:border-zinc-800/80"
    >
      <span
        v-for="tech in project.stack.slice(0, 3)"
        :key="tech"
        class="rounded border border-zinc-200/80 bg-zinc-50/60 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500 dark:border-zinc-800 dark:bg-carbon-window dark:text-zinc-400"
      >
        {{ tech }}
      </span>
      <span
        v-if="project.stack.length > 3"
        class="px-1 font-mono text-[10px] text-zinc-400 dark:text-zinc-500"
      >
        +{{ project.stack.length - 3 }}
      </span>
    </div>
  </button>
</template>
