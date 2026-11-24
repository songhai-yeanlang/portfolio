<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { portfolioData, type ProjectScreenshot } from '@/stores/portfolioData'
import { useTheme } from '@/composables/useTheme'
import { useAppRouter } from '@/routers'
import PortfolioLayout from '@/layouts/PortfolioLayout.vue'
import BaseButton from '@/components/base/baseButton.vue'
import ProjectImagePreview from '@/components/portfolio/ProjectImagePreview.vue'

const { isDark, toggleTheme } = useTheme()
const { currentProjectId, lastListRoute, navigateTo } = useAppRouter()

const project = computed(() =>
  portfolioData.projects.find((item) => item.id === currentProjectId.value) ?? null,
)

const normalizedScreenshots = computed<ProjectScreenshot[]>(() => {
  if (!project.value?.screenshots?.length) return []
  return project.value.screenshots
    .map((entry) => (typeof entry === 'string' ? { image: entry } : entry))
    .filter((entry) => Boolean(entry.image))
})

const youtubeEmbedUrl = computed(() => {
  const url = project.value?.demoVideoUrl?.trim()
  if (!url) return null

  const shortMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/)
  if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`

  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
  if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`

  const embedMatch = url.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/)
  if (embedMatch?.[1]) return `https://www.youtube.com/embed/${embedMatch[1]}`

  return null
})

const isDirectVideoFile = computed(() => {
  const url = project.value?.demoVideoUrl?.trim().toLowerCase()
  if (!url) return false
  return url.endsWith('.mp4') || url.endsWith('.webm') || url.endsWith('.ogg')
})

const resourceLinks = computed(() => {
  const p = project.value
  if (!p) return []

  const items: Array<{
    key: string
    label: string
    url: string
    icon: 'globe' | 'frontend' | 'backend' | 'video' | 'repo'
  }> = []

  if (p.liveUrl) {
    items.push({
      key: 'live',
      label: 'Live Website',
      url: p.liveUrl,
      icon: 'globe',
    })
  }

  if (p.frontendRepoUrl) {
    items.push({
      key: 'frontend',
      label: 'Frontend Source',
      url: p.frontendRepoUrl,
      icon: 'frontend',
    })
  }

  if (p.backendRepoUrl) {
    items.push({
      key: 'backend',
      label: 'Backend Source',
      url: p.backendRepoUrl,
      icon: 'backend',
    })
  } else if (!p.frontendRepoUrl && p.repoUrl) {
    items.push({
      key: 'repo',
      label: 'Source Code',
      url: p.repoUrl,
      icon: 'repo',
    })
  }

  if (p.demoVideoUrl) {
    items.push({
      key: 'video',
      label: 'Video Demo',
      url: p.demoVideoUrl,
      icon: 'video',
    })
  }

  return items
})

function toExternalHref(rawUrl: string) {
  const trimmed = rawUrl.trim()
  if (!trimmed) return '#'
  if (/^(https?:\/\/|mailto:|tel:|\/)/i.test(trimmed)) return trimmed
  return `https://${trimmed}`
}

// Lightbox viewer state for system screenshots
const lightboxIndex = ref<number | null>(null)

const activeScreenshot = computed(() => {
  if (lightboxIndex.value === null) return null
  return normalizedScreenshots.value[lightboxIndex.value] ?? null
})

function closeLightbox() {
  lightboxIndex.value = null
}

function nextScreenshot() {
  if (lightboxIndex.value === null || normalizedScreenshots.value.length <= 1) return
  lightboxIndex.value = (lightboxIndex.value + 1) % normalizedScreenshots.value.length
}

function prevScreenshot() {
  if (lightboxIndex.value === null || normalizedScreenshots.value.length <= 1) return
  lightboxIndex.value =
    (lightboxIndex.value - 1 + normalizedScreenshots.value.length) %
    normalizedScreenshots.value.length
}

function onKeydown(event: KeyboardEvent) {
  if (lightboxIndex.value === null) return
  if (event.key === 'Escape') closeLightbox()
  else if (event.key === 'ArrowRight') nextScreenshot()
  else if (event.key === 'ArrowLeft') prevScreenshot()
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <PortfolioLayout :handle="portfolioData.handle" :github-url="portfolioData.githubUrl"
    :telegram-url="portfolioData.telegramUrl" :is-dark="isDark" @toggle-theme="toggleTheme">
    <!-- Missing Project Fallback -->
    <div v-if="!project"
      class="my-16 flex flex-col items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 py-16 text-center dark:border-carbon-line dark:bg-carbon">
      <p class="text-base font-medium text-zinc-900 dark:text-zinc-100">
        Project not found
      </p>
      <p class="mt-1 mb-5 text-xs text-zinc-500 dark:text-zinc-400">
        This project link may have moved or been renamed.
      </p>
      <BaseButton variant="outline" @click="navigateTo('home')">
        Back to homepage
      </BaseButton>
    </div>

    <!-- Project Detail Content -->
    <div v-else class="mt-8 sm:mt-10">
      <!-- Top Back Bar & Metadata -->
      <div class="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button type="button"
          class="inline-flex cursor-pointer items-center gap-1.5 rounded-sm text-xs font-medium text-zinc-500 transition-colors hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:outline-zinc-100"
          @click="navigateTo(lastListRoute)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
            stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          <span>
            {{ lastListRoute === 'projects' ? 'Back to all projects' : 'Back to homepage' }}
          </span>
        </button>

        <div class="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
          <span
            class="rounded border border-zinc-200 bg-zinc-50 px-2 py-0.5 font-mono text-[11px] dark:border-carbon-line dark:bg-carbon-window">
            {{ project.category }}
          </span>
          <span v-if="project.timeline" class="inline-flex items-center gap-1.5 font-mono tabular-nums">
            
            <span>{{ project.timeline }}</span>
          </span>
        </div>
      </div>

      <!-- 1. Main Overview & Links Container -->
      <section aria-labelledby="detail-heading"
        class="relative rounded-lg border border-zinc-200 bg-white p-5 sm:p-8 dark:border-carbon-line dark:bg-carbon">
        <div class="mb-5">
          <h1 id="detail-heading"
            class="text-xl font-semibold tracking-[-0.015em] text-zinc-900 sm:text-2xl dark:text-zinc-100">
            {{ project.title }}
          </h1>
          <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {{ project.subtitle }}
          </p>
        </div>

        <!-- Cover Image (16:10) -->
        <div class="mb-6">
          <ProjectImagePreview :image="project.image" :title="project.title" aspect-class="aspect-[16/10]" />
        </div>

        <!-- Summary & Extended Description -->
        <div class="space-y-3 text-[14.5px] leading-[1.68] text-zinc-700 dark:text-zinc-300">
          <p>{{ project.summary }}</p>
          <p v-if="project.description" class="whitespace-pre-line">
            {{ project.description }}
          </p>
        </div>

        <!-- Tech Stack Chips -->
        <div class="mt-5 flex flex-wrap gap-1.5">
          <span v-for="tech in project.stack" :key="tech"
            class="rounded border border-zinc-200 bg-zinc-50/70 px-2.5 py-1 font-mono text-xs text-zinc-600 dark:border-carbon-line dark:bg-carbon-window dark:text-zinc-300">
            {{ tech }}
          </span>
        </div>
      </section>

      <!-- 2. Dedicated URL Ledger Section (Clearly Displays Full Links + Copy/Open) -->
      <template v-if="resourceLinks.length > 0">
        <div class="mx-auto h-10 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

        <section
          aria-labelledby="links-heading"
          class="relative rounded-lg border border-zinc-200 bg-white px-5 py-6 sm:px-7 sm:py-7 dark:border-carbon-line dark:bg-carbon"
        >
          <h2
            id="links-heading"
            class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100"
          >
            LINKS &amp; SOURCE CODE
          </h2>

          <div class="divide-y divide-zinc-200/85 dark:divide-carbon-line">
            <div
              v-for="item in resourceLinks"
              :key="item.key"
              class="flex flex-col gap-2 py-3.5 first:pt-1 last:pb-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
            >
              <!-- Left: Icon + Resource Type -->
              <div class="flex w-48 shrink-0 items-center gap-2.5 text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                <svg
                  v-if="item.icon === 'globe'"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.65"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="shrink-0 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3.6 9h16.8" />
                  <path d="M3.6 15h16.8" />
                  <path d="M11.5 3a17 17 0 0 0 0 18" />
                  <path d="M12.5 3a17 17 0 0 1 0 18" />
                </svg>

                <svg
                  v-else-if="item.icon === 'frontend' || item.icon === 'repo'"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.65"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="shrink-0 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>

                <svg
                  v-else-if="item.icon === 'backend'"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.65"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="shrink-0 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                >
                  <rect x="3" y="4" width="18" height="6.5" rx="1.8" />
                  <rect x="3" y="13.5" width="18" height="6.5" rx="1.8" />
                  <circle cx="7" cy="7.25" r="0.9" fill="currentColor" stroke="none" />
                  <circle cx="7" cy="16.75" r="0.9" fill="currentColor" stroke="none" />
                </svg>

                <svg
                  v-else-if="item.icon === 'video'"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.65"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="shrink-0 text-zinc-500 dark:text-zinc-400"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <polygon points="10 8.5 16 12 10 15.5 10 8.5" fill="currentColor" stroke="none" />
                </svg>

                <span>{{ item.label }}</span>
              </div>

              <!-- Right: Single-Line Truncated Clickable URL -->
              <div class="w-full min-w-0 flex-1">
                <a
                  :href="toExternalHref(item.url)"
                  :title="item.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block max-w-full truncate font-mono text-xs text-blue-600 underline decoration-blue-600/35 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-blue-700 sm:text-[12.5px] dark:text-sky-400 dark:decoration-sky-400/35 dark:hover:text-sky-300 dark:hover:decoration-sky-300"
                >
                  {{ item.url }}
                </a>
              </div>
            </div>
          </div>
        </section>
      </template>

      <!-- 2. Embedded Video Demo Player (Auto-shown for YouTube or direct MP4/WebM URLs) -->
      <template v-if="youtubeEmbedUrl || isDirectVideoFile">
        <div class="mx-auto h-10 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

        <section aria-labelledby="video-heading"
          class="relative rounded-lg border border-zinc-200 bg-white p-5 pt-7 sm:p-6 sm:pt-7 dark:border-carbon-line dark:bg-carbon">
          <h2 id="video-heading"
            class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100">
            VIDEO DEMO
          </h2>

          <div class="overflow-hidden rounded-md border border-zinc-200 bg-black aspect-video dark:border-carbon-line">
            <iframe v-if="youtubeEmbedUrl" :src="youtubeEmbedUrl" :title="`${project.title} video demo`"
              class="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen />
            <video v-else-if="isDirectVideoFile" :src="project.demoVideoUrl" controls class="h-full w-full" />
          </div>
        </section>
      </template>

      <!-- 4. System Screenshots Gallery -->
      <div class="mx-auto h-10 w-px bg-zinc-200 dark:bg-carbon-line" aria-hidden="true" />

      <section aria-labelledby="screenshots-heading"
        class="relative rounded-lg border border-zinc-200 bg-white bg-[radial-gradient(#e4e4e7_1px,transparent_1px)] bg-[size:16px_16px] bg-[position:8px_8px] p-4 pt-7 sm:p-6 sm:pt-7 dark:border-carbon-line dark:bg-carbon dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]">
        <h2 id="screenshots-heading"
          class="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3.5 text-[11px] font-medium tracking-[0.07em] text-zinc-900 select-none dark:bg-carbon dark:text-zinc-100">
          SYSTEM SCREENSHOTS
        </h2>

        <div v-if="normalizedScreenshots.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button v-for="(shot, idx) in normalizedScreenshots" :key="idx" type="button"
            class="group flex cursor-pointer flex-col overflow-hidden rounded-md border border-zinc-200 bg-white p-2.5 text-left transition-colors duration-150 hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:border-carbon-line dark:bg-carbon dark:hover:border-zinc-600 dark:focus-visible:outline-zinc-100"
            @click="lightboxIndex = idx">
            <div
              class="relative aspect-[16/10] w-full overflow-hidden rounded border border-zinc-200/80 bg-zinc-100 dark:border-zinc-800 dark:bg-carbon-window">
              <img :src="shot.image" :alt="shot.caption || `${project.title} screenshot ${idx + 1}`" loading="lazy"
                class="h-full w-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-[1.02] motion-reduce:transition-none" />
            </div>
            <div v-if="shot.caption" class="mt-2 px-1 text-xs text-zinc-600 dark:text-zinc-400">
              {{ shot.caption }}
            </div>
          </button>
        </div>

        <div v-else
          class="flex flex-col items-center justify-center rounded-md border border-zinc-200 bg-white py-10 px-4 text-center dark:border-carbon-line dark:bg-carbon">
          <p class="text-xs text-zinc-500 dark:text-zinc-400">
            No additional system screenshots added yet. Add images to
            <code class="rounded border border-zinc-200 px-1.5 py-0.5 font-mono text-[11px] dark:border-zinc-700">screenshots:
        [...]</code>
            in <code class="font-mono text-[11px]">portfolioData.ts</code>.
          </p>
        </div>
      </section>
    </div>

    <!-- Full-Screen Screenshot Lightbox -->
    <Teleport to="body">
      <div v-if="activeScreenshot"
        class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 p-4 backdrop-blur-[2px]"
        role="dialog" aria-modal="true" aria-label="Screenshot viewer" @click.self="closeLightbox">
        <div class="relative flex w-full max-w-5xl flex-col items-center">
          <div class="mb-3 flex w-full items-center justify-between text-zinc-200">
            <span class="font-mono text-xs">
              {{ (lightboxIndex ?? 0) + 1 }} / {{ normalizedScreenshots.length }}
              <template v-if="activeScreenshot.caption">
                — {{ activeScreenshot.caption }}
              </template>
            </span>

            <button type="button" aria-label="Close screenshot viewer"
              class="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border border-white/20 bg-black/50 text-white hover:bg-white/10"
              @click="closeLightbox">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                stroke-linecap="round">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <img :src="activeScreenshot.image" :alt="activeScreenshot.caption || 'System screenshot'"
            class="max-h-[80vh] w-auto max-w-full rounded-md border border-white/15 bg-zinc-950 object-contain" />

          <div v-if="normalizedScreenshots.length > 1" class="mt-4 flex items-center gap-3">
            <button type="button"
              class="cursor-pointer rounded-md border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10"
              @click="prevScreenshot">
              Previous
            </button>
            <button type="button"
              class="cursor-pointer rounded-md border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-medium text-white hover:bg-white/10"
              @click="nextScreenshot">
              Next
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </PortfolioLayout>
</template>
