<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { MemoryItem } from '@/stores/portfolioData'
import BaseButton from '@/components/base/baseButton.vue'

const props = withDefaults(
  defineProps<{
    memories: MemoryItem[]
    initialLimit?: number
  }>(),
  {
    initialLimit: 6,
  },
)

const showAll = ref(false)
const lightboxIndex = ref<number | null>(null)

const visibleMemories = computed(() =>
  showAll.value ? props.memories : props.memories.slice(0, props.initialLimit),
)

const activeMemory = computed(() => {
  if (lightboxIndex.value === null) return null
  return props.memories[lightboxIndex.value] ?? null
})

function openMemory(idx: number) {
  const item = props.memories[idx]
  if (!item?.image) return
  lightboxIndex.value = idx
}

function closeLightbox() {
  lightboxIndex.value = null
}

function stepLightbox(delta: 1 | -1) {
  if (lightboxIndex.value === null || props.memories.length === 0) return
  const total = props.memories.length
  for (let i = 1; i <= total; i++) {
    const candidate = (lightboxIndex.value + delta * i + total) % total
    if (props.memories[candidate]?.image) {
      lightboxIndex.value = candidate
      return
    }
  }
}

function onKeydown(event: KeyboardEvent) {
  if (lightboxIndex.value === null) return
  if (event.key === 'Escape') closeLightbox()
  else if (event.key === 'ArrowRight') stepLightbox(1)
  else if (event.key === 'ArrowLeft') stepLightbox(-1)
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div v-if="memories.length > 0">
    <!-- Central 1px Vertical Connector Stem from EDUCATION -->
    <div class="mx-auto h-12 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

    <!-- Connected Memories Gallery Container -->
    <section
      aria-labelledby="memories-heading"
      class="relative rounded-lg border border-zinc-200 bg-white bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:16px_16px] bg-[position:8px_8px] p-4 pt-7 sm:p-5 sm:pt-7 dark:border-carbon-line dark:bg-carbon dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]"
    >
      <h2
        id="memories-heading"
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100"
      >
        MEMORIES
      </h2>

      <!-- 3-Column Equal-Height Photo Print Cards (16:10 preserves full width of 3:2 / 16:10 camera photos) -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <component
          :is="item.image ? 'button' : 'div'"
          v-for="(item, idx) in visibleMemories"
          :key="item.id"
          :type="item.image ? 'button' : undefined"
          class="group flex h-full w-full flex-col rounded-md border border-zinc-200 bg-white p-2.5 text-left transition-colors duration-150 dark:border-carbon-line dark:bg-carbon"
          :class="
            item.image &&
            'cursor-pointer hover:border-zinc-300 focus-visible:border-zinc-500 focus-visible:outline-none dark:hover:border-zinc-700 dark:focus-visible:border-zinc-400'
          "
          @click="openMemory(idx)"
        >
          <!-- Uniform 16:10 Photo Frame (Keeps 100% Width, Trims Excess Height Only) -->
          <div
            class="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded border border-zinc-200/80 bg-zinc-100 dark:border-zinc-800 dark:bg-carbon-window"
          >
            <img
              v-if="item.image"
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              class="h-full w-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
            />

            <!-- Clean Camera Placeholder When Image Not Added Yet -->
            <div
              v-else
              class="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-zinc-50 bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:14px_14px] px-3 text-zinc-400 dark:bg-carbon-window dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] dark:text-zinc-500"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3Z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <span class="font-mono text-[10.5px]">Add photo</span>
            </div>
          </div>

          <!-- Caption & Date Footer -->
          <div class="mt-2.5 px-0.5">
            <div class="flex items-baseline justify-between gap-2">
              <h3 class="truncate text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
                {{ item.title }}
              </h3>
              <span
                v-if="item.date"
                class="shrink-0 font-mono text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500"
              >
                {{ item.date }}
              </span>
            </div>
            <p
              v-if="item.caption"
              class="mt-0.5 truncate text-xs leading-relaxed text-zinc-500 dark:text-zinc-400"
            >
              {{ item.caption }}
            </p>
          </div>
        </component>
      </div>

      <!-- Expand / Collapse Toggle When More Than 6 Photos -->
      <div
        v-if="memories.length > initialLimit"
        class="mt-4 flex justify-center"
      >
        <BaseButton variant="outline" @click="showAll = !showAll">
          {{ showAll ? 'Show fewer photos' : `Show all ${memories.length} photos` }}
        </BaseButton>
      </div>
    </section>

    <!-- Full-Screen Memory Lightbox -->
    <Teleport to="body">
      <div
        v-if="activeMemory && activeMemory.image"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-[2px]"
        role="dialog"
        aria-modal="true"
        :aria-label="activeMemory.title"
        @click.self="closeLightbox"
      >
        <div class="relative flex w-full max-w-4xl flex-col items-center">
          <div class="mb-3 flex w-full items-center justify-between gap-4 text-zinc-200">
            <div class="min-w-0">
              <div class="truncate text-sm font-medium text-white">
                {{ activeMemory.title }}
                <span v-if="activeMemory.date" class="ml-2 font-mono text-xs text-zinc-400">
                  {{ activeMemory.date }}
                </span>
              </div>
              <p v-if="activeMemory.caption" class="truncate text-xs text-zinc-400">
                {{ activeMemory.caption }}
              </p>
            </div>

            <button
              type="button"
              aria-label="Close photo viewer"
              class="inline-flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-md border border-white/20 bg-black/50 text-white hover:bg-white/10"
              @click="closeLightbox"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <img
            :src="activeMemory.image"
            :alt="activeMemory.title"
            class="max-h-[78vh] w-auto max-w-full rounded-md border border-white/15 bg-zinc-950 object-contain"
          />

          <div v-if="memories.length > 1" class="mt-4 flex items-center gap-3">
            <button
              type="button"
              class="cursor-pointer rounded-md border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10"
              @click="stepLightbox(-1)"
            >
              Previous
            </button>
            <button
              type="button"
              class="cursor-pointer rounded-md border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10"
              @click="stepLightbox(1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
