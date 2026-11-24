import { ref } from 'vue'

export type RouteName = 'home' | 'projects'

function parseHash(): RouteName {
  if (typeof window === 'undefined') return 'home'
  return window.location.hash === '#/projects' ? 'projects' : 'home'
}

const currentRoute = ref<RouteName>(parseHash())

if (typeof window !== 'undefined') {
  window.addEventListener('hashchange', () => {
    currentRoute.value = parseHash()
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  })
}

export function useAppRouter() {
  function navigateTo(route: RouteName) {
    const targetHash = route === 'projects' ? '#/projects' : '#/'
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash
    } else {
      currentRoute.value = route
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }

  return {
    currentRoute,
    navigateTo,
  }
}
