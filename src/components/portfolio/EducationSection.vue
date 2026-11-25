<script setup lang="ts">
import type { EducationItem } from '@/stores/portfolioData'

defineProps<{
  education: EducationItem[]
}>()
</script>

<template>
  <div v-if="education.length > 0">
    <!-- Central 1px Vertical Connector Stem from EXPERIENCE -->
    <div class="mx-auto h-12 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

    <!-- Connected Education Container -->
    <section aria-labelledby="education-heading"
      class="relative rounded-lg border border-zinc-200 bg-white px-5 py-7 sm:px-8 sm:py-8 dark:border-carbon-line dark:bg-carbon">
      <h2 id="education-heading"
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100">
        EDUCATION
      </h2>

      <div class="divide-y divide-zinc-200 dark:divide-carbon-line">
        <article v-for="item in education" :key="item.id" class="py-5 first:pt-1 last:pb-1">
          <div class="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
            <div>
              <h3 class="text-[14.5px] font-medium text-zinc-900 dark:text-zinc-100">
                {{ item.degree }}
              </h3>
              <p v-if="item.school" class="mt-0.5 text-[13px] text-zinc-500 dark:text-zinc-400">
                {{ item.school }}
                <template v-if="item.location">
                  · {{ item.location }}
                </template>
              </p>
            </div>

            <span class="shrink-0 font-mono text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
              {{ item.period }}
            </span>
          </div>

          <p v-if="item.description"
            class="mt-2 max-w-[66ch] text-[13.5px] leading-[1.6] text-zinc-700 dark:text-zinc-300">
            {{ item.description }}
          </p>
        </article>
      </div>
    </section>
  </div>
</template>
