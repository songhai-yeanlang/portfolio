<script setup lang="ts">
import { ref } from 'vue'
import type { ExperienceItem } from '@/stores/portfolioData'

const props = defineProps<{
  experience: ExperienceItem[]
  email: string
  githubUrl: string
  telegramUrl: string
}>()

const copied = ref(false)
let resetId: number | undefined

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(props.email)
    copied.value = true
    if (resetId !== undefined) window.clearTimeout(resetId)
    resetId = window.setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    window.location.href = `mailto:${props.email}`
  }
}
</script>

<template>
  <div>
    <!-- Central 1px Vertical Connector Stem from PROJECTS -->
    <div class="mx-auto h-12 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

    <!-- Connected Experience Ledger Container -->
    <section aria-labelledby="experience-heading"
      class="relative rounded-lg border border-zinc-200 bg-white px-5 py-7 sm:px-8 sm:py-8 dark:border-carbon-line dark:bg-carbon">
      <h2 id="experience-heading"
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100">
        EXPERIENCE
      </h2>

      <div class="divide-y divide-zinc-200 dark:divide-carbon-line">
        <article v-for="item in experience" :key="item.id" class="py-5 first:pt-1 last:pb-1">
          <div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
            <h3 class="text-[14.5px] font-medium text-zinc-900 dark:text-zinc-100">
              {{ item.role }}
              <span class="font-normal text-zinc-500 dark:text-zinc-400">
                at {{ item.company }}
              </span>
            </h3>
            <span class="font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              {{ item.period }}
            </span>
          </div>

          <p class="mt-2 max-w-[66ch] text-[13.5px] leading-[1.6] text-zinc-700 dark:text-zinc-300">
            {{ item.description }}
          </p>
        </article>
      </div>
    </section>

    <!-- Terminal Vertical Stem & Minimal Contact Bar -->
    <div class="mx-auto h-8 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

    <footer
      class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-md border border-zinc-200 bg-white px-5 py-3 text-[12.5px] text-zinc-500 dark:border-carbon-line dark:bg-carbon dark:text-zinc-400">
      <button type="button"
        class="cursor-pointer rounded-sm text-zinc-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-100 dark:focus-visible:outline-zinc-100"
        @click="copyEmail">
        {{ copied ? 'Copied email address' : email }}
      </button>
      <span class="text-zinc-300 dark:text-zinc-700" aria-hidden="true">/</span>
      <a :href="githubUrl" target="_blank" rel="noopener noreferrer"
        class="rounded-sm transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100">
        GitHub
      </a>
      <span class="text-zinc-300 dark:text-zinc-700" aria-hidden="true">/</span>
      <a :href="telegramUrl" target="_blank" rel="noopener noreferrer"
        class="rounded-sm transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100">
        Telegram
      </a>
    </footer>
  </div>
</template>
