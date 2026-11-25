/// <reference types="vite/client" />

import type { vReveal } from './src/composables/vReveal'

declare module 'vue' {
  export interface GlobalDirectives {
    vReveal: typeof vReveal
  }
}
