<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  fullName: string
  bio: string
  avatarUrl?: string
}>()

const bioParts = computed(() => {
  const name = props.fullName.trim()
  if (!name || !props.bio.includes(name)) {
    return [{ text: props.bio, isName: false }]
  }

  const index = props.bio.indexOf(name)
  return [
    { text: props.bio.slice(0, index), isName: false },
    { text: name, isName: true },
    { text: props.bio.slice(index + name.length), isName: false },
  ]
})
</script>

<template>
  <section
    aria-label="Introduction"
    class="mx-auto my-10 flex max-w-[784px] flex-col items-start gap-6 px-2 sm:my-12 sm:flex-row sm:items-center sm:gap-9"
  >
    <!-- Circular Avatar / Slate Disc -->
    <div
      v-reveal="100"
      class="h-[74px] w-[74px] shrink-0 overflow-hidden rounded-full bg-[#69707d] ring-1 ring-zinc-200 sm:h-20 sm:w-20 dark:ring-carbon-line"
    >
      <img
        v-if="avatarUrl"
        :src="avatarUrl"
        :alt="fullName"
        class="h-full w-full object-cover object-[center_15%]"
      />
    </div>

    <!-- Left-Aligned Personal Narrative (< 75ch per line) -->
    <p
      v-reveal="170"
      class="max-w-[65ch] text-left text-[17px] leading-[1.58] font-normal tracking-[-0.01em] text-zinc-700 sm:text-lg dark:text-zinc-300"
    >
      <template v-for="(part, idx) in bioParts" :key="idx">
        <strong
          v-if="part.isName"
          class="font-semibold text-zinc-950 dark:text-white"
        >{{ part.text }}</strong>
        <template v-else>{{ part.text }}</template>
      </template>
    </p>
  </section>
</template>
