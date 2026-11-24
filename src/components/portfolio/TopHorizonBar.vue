<script setup lang="ts">
import { useAppRouter } from '@/routers'

defineProps<{
  githubUrl: string
  telegramUrl: string
  isDark: boolean
}>()

const emit = defineEmits<{
  toggleTheme: []
}>()

const { navigateTo } = useAppRouter()
</script>

<template>
  <header class="flex items-center select-none">
    <!-- Left: </> Developer Logo Badge -->
    <a
      href="#/"
      aria-label="Home"
      title="Home"
      class="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200/90 bg-zinc-50/70 text-zinc-800 transition-colors duration-150 hover:border-zinc-300 hover:bg-white hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:border-carbon-line dark:bg-carbon-window dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-carbon dark:hover:text-white dark:focus-visible:outline-zinc-100"
      @click.prevent="navigateTo('home')"
    >
      <svg
        width="17"
        height="17"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m7 8-4 4 4 4" />
        <path d="m17 8 4 4-4 4" />
        <path d="m14 4-4 16" />
      </svg>
    </a>

    <!-- Middle: Connecting Horizontal Line -->
    <div class="mx-3 h-px flex-1 bg-zinc-300/90 dark:bg-zinc-700/80" aria-hidden="true" />

    <!-- Right: Compact Icon Dock -->
    <div
      class="inline-flex shrink-0 items-center rounded-lg border border-zinc-200/90 bg-zinc-50/70 p-1 dark:border-carbon-line dark:bg-carbon-window"
    >
      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub profile"
        title="GitHub"
        class="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition-colors duration-150 hover:bg-white hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:text-zinc-400 dark:hover:bg-carbon dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path
            d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
          />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      </a>

      <a
        :href="telegramUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Telegram"
        title="Telegram"
        class="inline-flex h-7 w-7 items-center justify-center rounded-md text-zinc-600 transition-colors duration-150 hover:bg-white hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:text-zinc-400 dark:hover:bg-carbon dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
        </svg>
      </a>

      <div class="mx-1 h-3.5 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

      <button
        type="button"
        class="inline-flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-md border border-zinc-200/80 bg-white text-zinc-800 transition-colors duration-150 hover:border-zinc-300 hover:text-zinc-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:border-zinc-700/80 dark:bg-carbon dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:text-white dark:focus-visible:outline-zinc-100"
        :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
        @click="emit('toggleTheme')"
      >
        <!-- Moon icon in dark mode -->
        <svg
          v-if="isDark"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.65"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
          <path d="M19 3v2" />
          <path d="M18 4h2" />
        </svg>

        <!-- Sun icon in light mode -->
        <svg
          v-else
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
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2.5v2" />
          <path d="M12 19.5v2" />
          <path d="m5.28 5.28 1.42 1.42" />
          <path d="m17.3 17.3 1.42 1.42" />
          <path d="M2.5 12h2" />
          <path d="M19.5 12h2" />
          <path d="m5.28 18.72 1.42-1.42" />
          <path d="m17.3 6.7 1.42-1.42" />
        </svg>
      </button>
    </div>
  </header>
</template>
