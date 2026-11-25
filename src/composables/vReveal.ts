import type { Directive } from 'vue'

export type RevealVariant = 'up' | 'line-x' | 'line-y'

export interface RevealOptions {
  delay?: number
  variant?: RevealVariant
}

let sharedObserver: IntersectionObserver | null = null

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return null
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            target.dataset.revealed = 'true'
            obs.unobserve(target)
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -32px 0px',
      },
    )
  }

  return sharedObserver
}

export const vReveal: Directive<HTMLElement, number | RevealOptions | undefined> = {
  mounted(el, binding) {
    const val = binding.value
    const delay = typeof val === 'number' ? val : (val?.delay ?? 0)
    const variant: RevealVariant =
      typeof val === 'object' && val?.variant ? val.variant : 'up'

    if (prefersReducedMotion()) {
      el.dataset.revealed = 'true'
      return
    }

    el.dataset.reveal = variant
    if (delay > 0) {
      el.style.setProperty('--reveal-delay', `${delay}ms`)
    }

    const observer = getObserver()
    if (!observer) {
      el.dataset.revealed = 'true'
      return
    }

    observer.observe(el)
  },

  unmounted(el) {
    sharedObserver?.unobserve(el)
  },
}
