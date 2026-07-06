<script setup lang="ts">
interface Props {
  modelValue: string
  label?: string
  type?: 'text' | 'email'
  placeholder?: string
  required?: boolean
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full space-y-1 font-sans text-xs">
    <label v-if="label" class="block text-gray-400 tracking-wider font-medium">
      {{ label }} <span v-if="required" class="text-theme-gold">*</span>
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      @input="onInput"
      class="w-full bg-theme-emerald border border-white/10 rounded px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-theme-gold transition-colors duration-200"
    />
  </div>
</template>