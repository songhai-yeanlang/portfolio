import { ref } from 'vue'

export type RouteName = 'home' | 'projects' | 'project-detail'

function parseHash(): { name: RouteName; projectId: string | null } {
  if (typeof window === 'undefined') {
    return { name: 'home', projectId: null }
  }

  const hash = window.location.hash || '#/'
  if (hash.startsWith('#/projects/')) {
    const rawId = hash.slice('#/projects/'.length).trim()
    if (rawId) {
      return { name: 'project-detail', projectId: decodeURIComponent(rawId) }
    }
  }

  if (hash === '#/projects') {
    return { name: 'projects', projectId: null }
  }

  return { name: 'home', projectId: null }
}

const initial = parseHash()
const currentRoute = ref<RouteName>(initial.name)
const currentProjectId = ref<string | null>(initial.projectId)
const lastListRoute = ref<'home' | 'projects'>('home')

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    const parsed = parseHash()
    if (currentRoute.value === 'home' || currentRoute.value === 'projects') {
      lastListRoute.value = currentRoute.value
    }
    currentRoute.value = parsed.name
    currentProjectId.value = parsed.projectId
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  })
}

export function useAppRouter() {
  function navigateTo(route: 'home' | 'projects') {
    const targetHash = route === 'projects' ? '#/projects' : '#/'
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    } else {
      currentRoute.value = route
      currentProjectId.value = null
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }

  function openProjectDetail(projectId: string) {
    if (currentRoute.value === 'home' || currentRoute.value === 'projects') {
      lastListRoute.value = currentRoute.value
    }
    const targetHash = `#/projects/${encodeURIComponent(projectId)}`
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    } else {
      currentRoute.value = 'project-detail'
      currentProjectId.value = projectId
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }

  return {
    currentRoute,
    currentProjectId,
    lastListRoute,
    navigateTo,
    openProjectDetail,
  }
}
