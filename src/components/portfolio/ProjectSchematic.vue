<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { SchematicKind } from '@/stores/portfolioData'

const props = defineProps<{
  kind: SchematicKind
  imageUrl?: string
  title?: string
}>()

const fullSql = 'SELECT * FROM users\nWHERE active = 1\nLIMIT 10;'
const charCount = ref(fullSql.length)
let timerId: number | undefined

const sqlLines = computed(() => {
  const sliced = fullSql.slice(0, charCount.value)
  return sliced.split('\n')
})

onMounted(() => {
  if (props.kind !== 'sql-client' || props.imageUrl) return
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) {
    charCount.value = fullSql.length
    return
  }

  let pauseTicks = 32
  charCount.value = fullSql.length

  timerId = window.setInterval(() => {
    if (pauseTicks > 0) {
      pauseTicks -= 1
      if (pauseTicks === 0) {
        charCount.value = 0
      }
      return
    }

    if (charCount.value < fullSql.length) {
      charCount.value += 1
    } else {
      pauseTicks = 38
    }
  }, 75)
})

onUnmounted(() => {
  if (timerId !== undefined) {
    window.clearInterval(timerId)
  }
})
</script>

<template>
  <!-- Optional Real Project Screenshot Framed Inside Minimalist Browser Chrome -->
  <div
    v-if="imageUrl"
    class="flex h-[104px] w-[86%] max-w-[220px] flex-col overflow-hidden rounded-md border border-zinc-300/90 bg-zinc-50/70 dark:border-zinc-700/80 dark:bg-carbon-window"
  >
    <div
      class="flex h-[18px] shrink-0 items-center gap-[5px] border-b border-zinc-200 bg-zinc-100 px-2.5 dark:border-zinc-700/70 dark:bg-carbon-bar"
    >
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
    </div>
    <img
      :src="imageUrl"
      :alt="title || 'Project preview'"
      class="h-full w-full object-cover object-top"
    />
  </div>

  <!-- 1. SQL Client Window Schematic ("studio") -->
  <div
    v-else-if="kind === 'sql-client'"
    class="flex h-[104px] w-[86%] max-w-[218px] flex-col overflow-hidden rounded-md border border-zinc-300/90 bg-zinc-50/70 text-left dark:border-zinc-700/80 dark:bg-carbon-window"
    aria-hidden="true"
  >
    <div
      class="flex h-[19px] shrink-0 items-center gap-[5px] border-b border-zinc-200 bg-zinc-100 px-2.5 dark:border-zinc-700/70 dark:bg-carbon-bar"
    >
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
    </div>
    <div class="flex-1 px-3 py-2 font-mono text-[10px] leading-[1.65] text-zinc-500 dark:text-zinc-400">
      <div v-for="(line, idx) in sqlLines" :key="idx" class="whitespace-pre">
        <span>{{ line }}</span>
        <span
          v-if="idx === sqlLines.length - 1"
          class="cursor-blink ml-px inline-block h-2.5 w-px translate-y-px bg-zinc-500 dark:bg-zinc-400"
        />
      </div>
    </div>
  </div>

  <!-- 2. SQLite B-Tree Visualizer Schematic ("sqlite internal") -->
  <svg
    v-else-if="kind === 'btree'"
    viewBox="0 0 220 104"
    class="h-[104px] w-[86%] max-w-[222px] overflow-visible"
    aria-hidden="true"
  >
    <line x1="82" y1="32" x2="42" y2="70" stroke-width="1" class="stroke-zinc-300 dark:stroke-zinc-700" />
    <line
      x1="110"
      y1="32"
      x2="110"
      y2="70"
      stroke-width="1"
      class="stroke-zinc-300 transition-colors duration-200 group-hover:stroke-zinc-500 motion-reduce:transition-none dark:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
    />
    <line x1="138" y1="32" x2="178" y2="70" stroke-width="1" class="stroke-zinc-300 dark:stroke-zinc-700" />

    <g>
      <rect
        x="68"
        y="8"
        width="84"
        height="24"
        rx="3"
        stroke-width="1"
        class="fill-zinc-100 stroke-zinc-300 dark:fill-carbon-bar dark:stroke-zinc-700"
      />
      <line x1="96" y1="8" x2="96" y2="32" stroke-width="1" class="stroke-zinc-300 dark:stroke-zinc-700" />
      <line x1="124" y1="8" x2="124" y2="32" stroke-width="1" class="stroke-zinc-300 dark:stroke-zinc-700" />
      <text x="82" y="23.5" text-anchor="middle" class="fill-zinc-500 font-mono text-[9.5px] dark:fill-zinc-400">
        23
      </text>
      <text x="110" y="23.5" text-anchor="middle" class="fill-zinc-500 font-mono text-[9.5px] dark:fill-zinc-400">
        47
      </text>
    </g>

    <g>
      <rect
        x="18"
        y="70"
        width="48"
        height="22"
        rx="2.5"
        stroke-width="1"
        class="fill-zinc-50/70 stroke-zinc-300 dark:fill-carbon-window dark:stroke-zinc-700"
      />
      <line x1="42" y1="70" x2="42" y2="92" stroke-width="1" class="stroke-zinc-300 dark:stroke-zinc-700" />
    </g>

    <g>
      <rect
        x="86"
        y="70"
        width="48"
        height="22"
        rx="2.5"
        stroke-width="1"
        class="fill-zinc-50/70 stroke-zinc-300 transition-colors duration-200 group-hover:stroke-zinc-500 motion-reduce:transition-none dark:fill-carbon-window dark:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
      />
      <line x1="110" y1="70" x2="110" y2="92" stroke-width="1" class="stroke-zinc-300 dark:stroke-zinc-700" />
      <text
        x="98"
        y="84"
        text-anchor="middle"
        class="fill-zinc-500 font-mono text-[8.5px] opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none dark:fill-zinc-400"
      >
        34
      </text>
    </g>

    <g>
      <rect
        x="154"
        y="70"
        width="48"
        height="22"
        rx="2.5"
        stroke-width="1"
        class="fill-zinc-50/70 stroke-zinc-300 dark:fill-carbon-window dark:stroke-zinc-700"
      />
      <line x1="178" y1="70" x2="178" y2="92" stroke-width="1" class="stroke-zinc-300 dark:stroke-zinc-700" />
    </g>
  </svg>

  <!-- 3. Screenshot Editor Crop Schematic ("viScreen") -->
  <div
    v-else-if="kind === 'screen-crop'"
    class="relative flex h-[104px] w-[86%] max-w-[218px] flex-col overflow-hidden rounded-md border border-zinc-300/90 bg-zinc-50/70 dark:border-zinc-700/80 dark:bg-carbon-window"
    aria-hidden="true"
  >
    <div
      class="flex h-[18px] shrink-0 items-center gap-[5px] border-b border-zinc-200 bg-zinc-100 px-2.5 dark:border-zinc-700/70 dark:bg-carbon-bar"
    >
      <span class="h-[5px] w-[5px] rounded-[1px] bg-zinc-400/50 dark:bg-zinc-500/50" />
      <span class="h-[5px] w-[5px] rounded-[1px] bg-zinc-400/50 dark:bg-zinc-500/50" />
      <span class="h-[5px] w-[5px] rounded-[1px] bg-zinc-400/50 dark:bg-zinc-500/50" />
    </div>

    <div class="relative flex flex-1 flex-col justify-center gap-2 px-4 py-3">
      <div class="h-0.5 w-[66%] rounded-full bg-zinc-200 dark:bg-zinc-700/80" />
      <div class="h-0.5 w-[82%] rounded-full bg-zinc-200 dark:bg-zinc-700/80" />
      <div class="h-0.5 w-[74%] rounded-full bg-zinc-200 dark:bg-zinc-700/80" />
      <div class="h-0.5 w-[58%] rounded-full bg-zinc-200 dark:bg-zinc-700/80" />
      <div class="h-0.5 w-[48%] rounded-full bg-zinc-200 dark:bg-zinc-700/80" />

      <div
        class="pointer-events-none absolute top-3 left-[34px] h-[44px] w-[84px] rounded-[2px] border border-dashed border-zinc-400 bg-zinc-900/[0.03] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-0.5 group-focus-visible:translate-x-1.5 group-focus-visible:translate-y-0.5 motion-reduce:transition-none dark:border-zinc-500 dark:bg-white/[0.04]"
      />
    </div>
  </div>

  <!-- 4. Code Diffing Animation Schematic ("codeMorph") -->
  <div
    v-else-if="kind === 'code-diff'"
    class="flex h-[104px] w-[88%] max-w-[224px] items-center justify-center gap-2"
    aria-hidden="true"
  >
    <div
      class="flex h-[80px] w-[92px] flex-col justify-center gap-[7px] rounded border border-zinc-300/90 bg-zinc-50/70 px-3 dark:border-zinc-700/80 dark:bg-carbon-window"
    >
      <div class="h-1 w-[62%] rounded-[1.5px] bg-zinc-300 dark:bg-zinc-600" />
      <div class="h-1 w-[84%] rounded-[1.5px] bg-zinc-200 dark:bg-zinc-700/80" />
      <div class="h-1 w-[46%] rounded-[1.5px] bg-zinc-200 dark:bg-zinc-700/80" />
      <div class="h-1 w-[76%] rounded-[1.5px] bg-zinc-300 dark:bg-zinc-600" />
      <div class="h-1 w-[54%] rounded-[1.5px] bg-zinc-200 dark:bg-zinc-700/80" />
    </div>

    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      stroke-width="1.2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="shrink-0 text-zinc-400 dark:text-zinc-500"
    >
      <path d="M2.5 8h11" />
      <path d="m9.5 4 4 4-4 4" />
    </svg>

    <div
      class="flex h-[80px] w-[92px] flex-col justify-center gap-[7px] rounded border border-zinc-300/90 bg-zinc-50/70 px-3 dark:border-zinc-700/80 dark:bg-carbon-window"
    >
      <div
        class="h-1 w-[78%] rounded-[1.5px] bg-zinc-300 transition-all duration-300 group-hover:w-[64%] motion-reduce:transition-none dark:bg-zinc-600"
      />
      <div
        class="ml-2 h-1 w-[68%] rounded-[1.5px] bg-zinc-200 transition-all duration-300 group-hover:w-[76%] motion-reduce:transition-none dark:bg-zinc-700/80"
      />
      <div
        class="ml-2 h-1 w-[74%] rounded-[1.5px] bg-zinc-300 transition-all duration-300 group-hover:w-[52%] motion-reduce:transition-none dark:bg-zinc-600"
      />
      <div
        class="h-1 w-[50%] rounded-[1.5px] bg-zinc-200 transition-all duration-300 group-hover:w-[82%] motion-reduce:transition-none dark:bg-zinc-700/80"
      />
      <div class="h-1 w-[66%] rounded-[1.5px] bg-zinc-200 dark:bg-zinc-700/80" />
    </div>
  </div>

  <!-- 5. E-Commerce Storefront Schematic ("ecommerce") -->
  <div
    v-else-if="kind === 'ecommerce'"
    class="flex h-[104px] w-[86%] max-w-[218px] flex-col overflow-hidden rounded-md border border-zinc-300/90 bg-zinc-50/70 dark:border-zinc-700/80 dark:bg-carbon-window"
    aria-hidden="true"
  >
    <div
      class="flex h-[19px] shrink-0 items-center justify-between border-b border-zinc-200 bg-zinc-100 px-2.5 dark:border-zinc-700/70 dark:bg-carbon-bar"
    >
      <div class="flex items-center gap-1">
        <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
        <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
      </div>
      <span class="rounded px-1 font-mono text-[8px] text-zinc-500 dark:text-zinc-400">CART (2)</span>
    </div>
    <div class="grid flex-1 grid-cols-3 gap-2 p-2.5">
      <div
        v-for="item in 3"
        :key="item"
        class="flex flex-col justify-between rounded border border-zinc-200/90 bg-white p-1.5 transition-colors duration-200 group-hover:border-zinc-300 dark:border-zinc-700/70 dark:bg-carbon dark:group-hover:border-zinc-600"
      >
        <div class="h-7 rounded-[2px] bg-zinc-100 dark:bg-zinc-800" />
        <div class="space-y-1">
          <div class="h-1 w-4/5 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          <div class="h-1 w-1/2 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </div>
      </div>
    </div>
  </div>

  <!-- 6. Analytics & POS Dashboard Schematic ("dashboard") -->
  <div
    v-else-if="kind === 'dashboard'"
    class="flex h-[104px] w-[86%] max-w-[218px] flex-col overflow-hidden rounded-md border border-zinc-300/90 bg-zinc-50/70 dark:border-zinc-700/80 dark:bg-carbon-window"
    aria-hidden="true"
  >
    <div
      class="flex h-[18px] shrink-0 items-center gap-[5px] border-b border-zinc-200 bg-zinc-100 px-2.5 dark:border-zinc-700/70 dark:bg-carbon-bar"
    >
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
      <span class="h-1.5 w-1.5 rounded-full border border-zinc-400/70 dark:border-zinc-500/70" />
    </div>
    <div class="flex flex-1 flex-col justify-between p-2.5">
      <div class="grid grid-cols-2 gap-2">
        <div class="rounded border border-zinc-200/90 bg-white px-2 py-1 text-left dark:border-zinc-700/70 dark:bg-carbon">
          <div class="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div class="mt-1 font-mono text-[8.5px] text-zinc-500 dark:text-zinc-400">+24.8%</div>
        </div>
        <div class="rounded border border-zinc-200/90 bg-white px-2 py-1 text-left dark:border-zinc-700/70 dark:bg-carbon">
          <div class="h-1 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
          <div class="mt-1 font-mono text-[8.5px] text-zinc-500 dark:text-zinc-400">1,420</div>
        </div>
      </div>
      <div class="flex h-8 items-end gap-1.5 px-1 pt-1">
        <div class="h-[45%] flex-1 rounded-t-[1.5px] bg-zinc-200 dark:bg-zinc-700" />
        <div class="h-[70%] flex-1 rounded-t-[1.5px] bg-zinc-300 transition-all duration-300 group-hover:h-[85%] dark:bg-zinc-600" />
        <div class="h-[55%] flex-1 rounded-t-[1.5px] bg-zinc-200 dark:bg-zinc-700" />
        <div class="h-[90%] flex-1 rounded-t-[1.5px] bg-zinc-400/80 transition-all duration-300 group-hover:h-full dark:bg-zinc-500" />
        <div class="h-[65%] flex-1 rounded-t-[1.5px] bg-zinc-200 dark:bg-zinc-700" />
        <div class="h-[80%] flex-1 rounded-t-[1.5px] bg-zinc-300 dark:bg-zinc-600" />
      </div>
    </div>
  </div>

  <!-- 7. REST API & Auth Service Schematic ("rest-api") -->
  <div
    v-else-if="kind === 'rest-api'"
    class="flex h-[104px] w-[86%] max-w-[218px] flex-col overflow-hidden rounded-md border border-zinc-300/90 bg-zinc-50/70 text-left dark:border-zinc-700/80 dark:bg-carbon-window"
    aria-hidden="true"
  >
    <div
      class="flex h-[20px] shrink-0 items-center justify-between border-b border-zinc-200 bg-zinc-100 px-2.5 font-mono text-[8.5px] text-zinc-500 dark:border-zinc-700/70 dark:bg-carbon-bar dark:text-zinc-400"
    >
      <span>POST /api/auth</span>
      <span class="rounded border border-zinc-300 px-1 text-[8px] dark:border-zinc-600">200 OK</span>
    </div>
    <div class="flex-1 space-y-1 px-3 py-2 font-mono text-[9.5px] leading-[1.45] text-zinc-500 dark:text-zinc-400">
      <div>{</div>
      <div class="pl-2.5">"status": "verified",</div>
      <div class="pl-2.5">"token": "eyJhbGci..."</div>
      <div>}</div>
    </div>
  </div>

  <!-- 8. VPS & Deployment Pipeline Schematic ("vps-deploy") -->
  <svg
    v-else
    viewBox="0 0 220 104"
    class="h-[104px] w-[86%] max-w-[222px] overflow-visible"
    aria-hidden="true"
  >
    <rect
      x="16"
      y="34"
      width="52"
      height="36"
      rx="4"
      stroke-width="1"
      class="fill-zinc-50/70 stroke-zinc-300 dark:fill-carbon-window dark:stroke-zinc-700"
    />
    <text x="42" y="55" text-anchor="middle" class="fill-zinc-500 font-mono text-[9px] dark:fill-zinc-400">
      git push
    </text>

    <line
      x1="68"
      y1="52"
      x2="94"
      y2="52"
      stroke-width="1"
      stroke-dasharray="3 2"
      class="stroke-zinc-400 dark:stroke-zinc-600"
    />

    <rect
      x="94"
      y="26"
      width="110"
      height="52"
      rx="4"
      stroke-width="1"
      class="fill-zinc-100 stroke-zinc-300 transition-colors duration-200 group-hover:stroke-zinc-500 dark:fill-carbon-bar dark:stroke-zinc-700 dark:group-hover:stroke-zinc-400"
    />
    <text x="149" y="45" text-anchor="middle" class="fill-zinc-600 font-mono text-[9px] dark:fill-zinc-300">
      Contabo VPS
    </text>
    <text x="149" y="62" text-anchor="middle" class="fill-zinc-400 font-mono text-[8.5px] dark:fill-zinc-500">
      nginx · aaPanel
    </text>
  </svg>
</template>
