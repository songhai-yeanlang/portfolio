<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'outline' | 'ghost' | 'solid'
    type?: 'button' | 'submit' | 'reset'
    href?: string
    target?: string
    ariaLabel?: string
  }>(),
  {
    variant: 'outline',
    type: 'button',
    href: undefined,
    target: undefined,
    ariaLabel: undefined,
  },
)
</script>

<template>
  <component
    :is="href ? 'a' : 'button'"
    :href="href"
    :target="href ? target : undefined"
    :rel="href && target === '_blank' ? 'noopener noreferrer' : undefined"
    :type="href ? undefined : type"
    :aria-label="ariaLabel"
    class="inline-flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-150 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 motion-reduce:transition-none dark:focus-visible:outline-zinc-100"
    :class="[
      variant === 'solid' &&
        'bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-950 dark:hover:bg-zinc-200',
      variant === 'outline' &&
        'border border-zinc-200 bg-white text-zinc-900 hover:border-zinc-300 dark:border-carbon-line dark:bg-carbon dark:text-zinc-100 dark:hover:border-zinc-600',
      variant === 'ghost' &&
        'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
    ]"
  >
    <slot />
  </component>
</template>
