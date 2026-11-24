<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { ProjectItem } from '@/stores/portfolioData'
import BaseButton from '@/components/base/baseButton.vue'
import ProjectSchematic from './ProjectSchematic.vue'

defineProps<{
  project: ProjectItem | null
}>()

const emit = defineEmits<{
  close: []
}>()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="project"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`modal-title-${project.id}`"
      @click.self="emit('close')"
    >
      <div
        class="w-full max-w-[460px] rounded-lg border border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-carbon"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3
              :id="`modal-title-${project.id}`"
              class="text-base font-medium text-zinc-900 dark:text-zinc-100"
            >
              {{ project.title }}
            </h3>
            <p class="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
              {{ project.subtitle }}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close project details"
            class="inline-flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-zinc-500 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
            @click="emit('close')"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          class="my-5 flex h-[140px] items-center justify-center rounded-md border border-zinc-200 bg-white bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:16px_16px] bg-[position:8px_8px] dark:border-carbon-line dark:bg-carbon dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]"
        >
          <ProjectSchematic
            :kind="project.schematic"
            :image-url="project.imageUrl"
            :title="project.title"
          />
        </div>

        <p class="text-[13.5px] leading-[1.62] text-zinc-700 dark:text-zinc-300">
          {{ project.summary }}
        </p>

        <div class="mt-4 flex flex-wrap gap-1.5">
          <span
            v-for="tech in project.stack"
            :key="tech"
            class="rounded border border-zinc-200 px-2 py-0.5 font-mono text-[11px] text-zinc-500 dark:border-carbon-line dark:text-zinc-400"
          >
            {{ tech }}
          </span>
        </div>

        <div class="mt-6 flex items-center justify-end gap-2.5 border-t border-zinc-200 pt-4 dark:border-carbon-line">
          <BaseButton
            v-if="project.repoUrl"
            variant="outline"
            :href="project.repoUrl"
            target="_blank"
          >
            View source
          </BaseButton>
          <BaseButton
            v-if="project.liveUrl"
            variant="solid"
            :href="project.liveUrl"
            target="_blank"
          >
            Open project
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
