<script setup lang="ts">
import TopHorizonBar from '@/components/portfolio/TopHorizonBar.vue'

defineProps<{
  handle?: string
  githubUrl: string
  telegramUrl: string
  isDark: boolean
}>()

const emit = defineEmits<{
  toggleTheme: []
}>()
</script>

<template>
  <div
    class="min-h-screen bg-white text-zinc-900 transition-colors duration-200 motion-reduce:transition-none dark:bg-carbon dark:text-zinc-100"
  >
    <div class="mx-auto max-w-[968px] px-5 pt-5 pb-20 sm:px-8 sm:pt-6">
      <TopHorizonBar
        :github-url="githubUrl"
        :telegram-url="telegramUrl"
        :is-dark="isDark"
        @toggle-theme="emit('toggleTheme')"
      />

      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
