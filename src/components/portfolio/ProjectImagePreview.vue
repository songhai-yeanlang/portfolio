<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    image?: string
    title: string
    aspectClass?: string
  }>(),
  {
    image: undefined,
    aspectClass: 'aspect-[16/10]',
  },
)

const hasError = ref(false)

watch(
  () => props.image,
  () => {
    hasError.value = false
  },
)
</script>

<template>
  <div
    class="relative w-full overflow-hidden rounded-md border border-zinc-200/90 bg-zinc-100 dark:border-zinc-800 dark:bg-carbon-window"
    :class="aspectClass"
  >
    <img
      v-if="image && !hasError"
      :src="image"
      :alt="title"
      loading="lazy"
      class="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.03] motion-reduce:transition-none"
      @error="hasError = true"
    />

    <!-- Clean Fallback Slot When No Image Is Provided Yet -->
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
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span class="truncate max-w-full font-mono text-[10.5px]">
        {{ title }}
      </span>
    </div>
  </div>
</template>
