<script setup lang="ts">
interface Option {
  value: string
  label: string
}

interface Props {
  modelValue: string
  options: Option[]
  label?: string
  required?: boolean
  placeholder?: string
}

defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const onChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full space-y-1 font-sans text-xs">
    <label v-if="label" class="block text-gray-400 tracking-wider font-medium">
      {{ label }} <span v-if="required" class="text-theme-gold">*</span>
    </label>
    <select
      :value="modelValue"
      :required="required"
      @change="onChange"
      class="w-full bg-theme-emerald border border-white/10 rounded px-3 py-2 text-white focus:outline-none focus:border-theme-gold transition-colors duration-200 appearance-none cursor-pointer"
    >
      <option v-if="placeholder" value="" disabled selected>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}
      </option>
    </select>
  </div>
</template>