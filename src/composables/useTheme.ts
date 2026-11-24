import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'portfolio-theme'
const isDark = ref(false)

function applyTheme(dark: boolean) {
  isDark.value = dark
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', dark)
  }
}

export function useTheme() {
  onMounted(() => {
    const currentlyDark = document.documentElement.classList.contains('dark')
    isDark.value = currentlyDark
  })

  function toggleTheme() {
    const next = !isDark.value
    applyTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light')
    } catch {
      // Ignore storage failures in restricted browsing contexts
    }
  }

  return {
    isDark,
    toggleTheme,
  }
}
