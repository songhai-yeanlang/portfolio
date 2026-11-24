<script setup lang="ts">
import type { SkillIconName } from '@/stores/portfolioData'

defineProps<{
  name: SkillIconName
}>()
</script>

<template>
  <!-- HTML5 -->
  <svg
    v-if="name === 'html5'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#E34F26] motion-reduce:transition-none dark:text-zinc-400"
    aria-hidden="true"
  >
    <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3Z" />
    <path d="M15.5 7.5H8.8l.4 4h6l-.5 4.2-2.7.8-2.7-.8-.2-1.8" />
  </svg>

  <!-- CSS3 -->
  <svg
    v-else-if="name === 'css3'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#1572B6] motion-reduce:transition-none dark:text-zinc-400"
    aria-hidden="true"
  >
    <path d="M4 3h16l-1.5 15.5L12 21l-6.5-2.5L4 3Z" />
    <path d="M8.5 7.5h7l-.4 4H9.5" />
    <path d="M15.1 11.5l-.4 4.2-2.7.8-2.7-.8-.2-1.8" />
  </svg>

  <!-- JavaScript -->
  <svg
    v-else-if="name === 'javascript'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#D9A300] motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-[#F7DF1E]"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M10.5 11v5.2a1.6 1.6 0 0 1-3.1.4" />
    <path d="M17.2 12.1c-.4-.7-1.7-.9-2.4-.3-.7.6-.3 1.7.8 2.1 1.2.4 1.8 1.4 1.2 2.4-.5.9-2 .9-2.8.1" />
  </svg>

  <!-- TypeScript -->
  <svg
    v-else-if="name === 'typescript'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#3178C6] motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-[#58A6FF]"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7.2 11.5h4.8" />
    <path d="M9.6 11.5v5.8" />
    <path d="M17.5 12.2c-.5-.7-1.8-.8-2.5-.2-.7.6-.2 1.6.9 2 1.2.4 1.7 1.3 1.1 2.3-.5.8-1.9.8-2.7.1" />
  </svg>

  <!-- Vue.js -->
  <svg
    v-else-if="name === 'vuejs'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#42B883] motion-reduce:transition-none dark:text-zinc-400"
    aria-hidden="true"
  >
    <path d="M2.5 4.5h4.2L12 13.8l5.3-9.3h4.2L12 20.5 2.5 4.5Z" />
    <path d="M7.2 4.5 12 12.6l4.8-8.1" />
  </svg>

  <!-- ReactJS -->
  <svg
    v-else-if="name === 'reactjs'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#087EA4] motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-[#61DAFB]"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="1.7" fill="currentColor" stroke="none" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
  </svg>

  <!-- Node.js -->
  <svg
    v-else-if="name === 'nodejs'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#5FA04E] motion-reduce:transition-none dark:text-zinc-400"
    aria-hidden="true"
  >
    <path d="M12 2.5 20 7.1v9.8l-8 4.6-8-4.6V7.1l8-4.6Z" />
    <path d="M9.5 14.5V9.5l5 5V9.5" />
  </svg>

  <!-- ExpressJS -->
  <svg
    v-else-if="name === 'expressjs'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-zinc-950 motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-white"
    aria-hidden="true"
  >
    <path d="M3.5 12h6.5c0-2.1-1.3-3.5-3.2-3.5S3.5 9.9 3.5 12c0 2.3 1.4 3.6 3.5 3.6 1.2 0 2.2-.4 2.8-1.1" />
    <path d="m13.5 8.8 6.5 6.8" />
    <path d="m20 8.8-6.5 6.8" />
  </svg>

  <!-- MySQL -->
  <svg
    v-else-if="name === 'mysql'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#00758F] motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-[#58A6C8]"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
    <path d="M4.5 5.5v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V5.5" />
    <path d="M4.5 12v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V12" />
  </svg>

  <!-- PostgreSQL -->
  <svg
    v-else-if="name === 'postgresql'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#336791] motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-[#699ECA]"
    aria-hidden="true"
  >
    <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
    <path d="M4.5 5.5v13c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-13" />
    <path d="M4.5 12c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8" />
    <path d="M12 8.3v13" />
  </svg>

  <!-- Git -->
  <svg
    v-else-if="name === 'git'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#F05032] motion-reduce:transition-none dark:text-zinc-400"
    aria-hidden="true"
  >
    <circle cx="7" cy="6.5" r="2.2" />
    <circle cx="7" cy="17.5" r="2.2" />
    <circle cx="17" cy="9.5" r="2.2" />
    <path d="M7 8.7v6.6" />
    <path d="M17 11.7c0 3-2.5 3.8-5.5 3.8H9.2" />
  </svg>

  <!-- GitHub -->
  <svg
    v-else-if="name === 'github'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.6"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-zinc-950 motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-white"
    aria-hidden="true"
  >
    <path
      d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
    />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>

  <!-- Postman -->
  <svg
    v-else-if="name === 'postman'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#FF6C37] motion-reduce:transition-none dark:text-zinc-400"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="8.8" />
    <path d="m8.5 15.5 7-7" />
    <path d="M11.5 8.5h4v4" />
  </svg>

  <!-- Contabo (VPS) -->
  <svg
    v-else-if="name === 'contabo'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#0066B3] motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-[#38BDF8]"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="6.5" rx="1.8" />
    <rect x="3" y="13.5" width="18" height="6.5" rx="1.8" />
    <circle cx="7" cy="7.25" r="0.9" fill="currentColor" stroke="none" />
    <circle cx="7" cy="16.75" r="0.9" fill="currentColor" stroke="none" />
    <path d="M13 7.25h4.5" />
    <path d="M13 16.75h4.5" />
  </svg>

  <!-- aaPanel -->
  <svg
    v-else-if="name === 'aapanel'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.65"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-[#20A53A] motion-reduce:transition-none dark:text-zinc-400"
    aria-hidden="true"
  >
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M7.5 16V11" />
    <path d="M12 16V8" />
    <path d="M16.5 16v-3.5" />
  </svg>

  <!-- Vercel -->
  <svg
    v-else-if="name === 'vercel'"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linejoin="round"
    class="h-3.5 w-3.5 shrink-0 text-zinc-500 transition-colors duration-150 group-hover:text-zinc-950 motion-reduce:transition-none dark:text-zinc-400 dark:group-hover:text-white"
    aria-hidden="true"
  >
    <path d="M12 4 21 19.5H3L12 4Z" />
  </svg>
</template>
