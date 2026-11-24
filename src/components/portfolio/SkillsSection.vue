<script setup lang="ts">
import type { SkillGroup } from '@/stores/portfolioData'
import SkillIcon from './SkillIcon.vue'

defineProps<{
  skillGroups: SkillGroup[]
}>()
</script>

<template>
  <div>
    <section
      aria-labelledby="skills-heading"
      class="relative rounded-lg border border-zinc-200 bg-white px-5 py-6 sm:px-7 sm:py-7 dark:border-carbon-line dark:bg-carbon"
    >
      <!-- Centered Section Label Straddling Top Hairline -->
      <h2
        id="skills-heading"
        class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100"
      >
        SKILLS
      </h2>

      <!-- Two-Row Architectural Spec Ledger -->
      <div class="divide-y divide-zinc-200/85 dark:divide-carbon-line">
        <div
          v-for="group in skillGroups"
          :key="group.id"
          class="flex flex-col gap-3.5 py-4 first:pt-1 last:pb-1 sm:flex-row sm:items-start sm:gap-6"
        >
          <!-- Category Column -->
          <div class="shrink-0 sm:w-48 sm:pt-1">
            <h3 class="text-[13.5px] font-medium text-zinc-900 dark:text-zinc-100">
              {{ group.category }}
            </h3>
          </div>

          <!-- Icon Keycap Chips -->
          <ul class="flex flex-1 flex-wrap gap-2 list-none" role="list">
            <li
              v-for="skill in group.items"
              :key="skill.name"
              class="group inline-flex items-center gap-2 rounded-md border border-zinc-200/90 bg-zinc-50/55 px-2.5 py-1.5 text-xs font-medium text-zinc-700 transition-colors duration-150 hover:border-zinc-300 hover:bg-white hover:text-zinc-950 motion-reduce:transition-none dark:border-carbon-line dark:bg-carbon-window dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-carbon-bar dark:hover:text-zinc-100"
            >
              <SkillIcon :name="skill.icon" />
              <span>{{ skill.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Central 1px Vertical Connector Stem down to PROJECTS -->
    <div class="mx-auto h-10 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />
  </div>
</template>
