<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
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
    <!-- Terminal Vertical Stem & Minimal Contact Bar -->
    <div
      v-reveal="{ variant: 'line-y', delay: 0 }"
      class="mx-auto h-8 w-px bg-zinc-200 dark:bg-carbon-line"
      aria-hidden="true"
    />

    <footer
      v-reveal="80"
      class="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 rounded-md border border-zinc-200 bg-white px-5 py-3 text-[12.5px] text-zinc-500 dark:border-carbon-line dark:bg-carbon dark:text-zinc-400"
    >
      <button
        type="button"
        class="cursor-pointer rounded-sm text-zinc-900 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-100 dark:focus-visible:outline-zinc-100"
        @click="copyEmail"
      >
        {{ copied ? 'Copied email address' : email }}
      </button>
      <span class="text-zinc-300 dark:text-zinc-700" aria-hidden="true">/</span>
      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-sm transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
      >
        GitHub
      </a>
      <span class="text-zinc-300 dark:text-zinc-700" aria-hidden="true">/</span>
      <a
        :href="telegramUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="rounded-sm transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
      >
        Telegram
      </a>
    </footer>
  </div>
</template>
