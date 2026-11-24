<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import type { ProjectItem } from '@/stores/portfolioData'
import { useAppRouter } from '@/routers'
import BaseButton from '@/components/base/baseButton.vue'
import ProjectImagePreview from './ProjectImagePreview.vue'

const props = defineProps<{
  project: ProjectItem | null
}>()

const emit = defineEmits<{
  close: []
}>()

const { openProjectDetail } = useAppRouter()

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    emit('close')
  }
}

function goToDetail() {
  if (!props.project) return
  const id = props.project.id
  emit('close')
  openProjectDetail(id)
}

function toExternalHref(rawUrl: string) {
  const trimmed = rawUrl.trim()
  if (!trimmed) return '#'
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(trimmed)) return trimmed
  return `https://${trimmed}`
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
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      :aria-labelledby="`modal-title-${project.id}`"
      @click.self="emit('close')"
    >
      <div
        class="w-full max-w-[520px] rounded-lg border border-zinc-300 bg-white p-6 dark:border-zinc-700 dark:bg-carbon"
      >
        <div class="flex items-start justify-between gap-4">
          <div>
            <h3
              :id="`modal-title-${project.id}`"
              class="text-base font-medium text-zinc-900 dark:text-zinc-100"
            >
              {{ project.title }}
            </h3>
            <p
              v-if="project.timeline"
              class="mt-1 inline-flex items-center gap-1.5 font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400"
            >
              
              <span>{{ project.timeline }}</span>
            </p>
            <p v-else class="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
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

        <!-- Full-Width 16:10 Project Image Preview in Modal -->
        <div class="my-4">
          <ProjectImagePreview
            :image="project.image"
            :title="project.title"
            aspect-class="aspect-[16/10]"
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
            v-if="project.liveUrl"
            variant="outline"
            :href="toExternalHref(project.liveUrl)"
            target="_blank"
          >
            View website
          </BaseButton>
          <BaseButton variant="solid" @click="goToDetail">
            <span>View detail</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </BaseButton>
        </div>
      </div>
    </div>
  </Teleport>
</template>
