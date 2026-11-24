<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    type?: string
    id?: string
    ariaLabel?: string
  }>(),
  {
    modelValue: '',
    placeholder: '',
    type: 'text',
    id: undefined,
    ariaLabel: undefined,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    :id="id"
    :type="type"
    :value="modelValue"
    :placeholder="placeholder"
    :aria-label="ariaLabel || placeholder"
    class="w-full rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-[13px] text-zinc-900 transition-colors duration-150 placeholder:text-zinc-400 focus:border-zinc-400 focus:outline-none motion-reduce:transition-none dark:border-carbon-line dark:bg-carbon dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-zinc-600"
    @input="onInput"
  />
</template>
