import { computed, onMounted, onUnmounted, ref } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'mission-shaadi-theme'
const theme = ref<Theme>('dark')
let mediaQuery: MediaQueryList | undefined

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: Theme) {
  theme.value = value
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
}

function handleSystemThemeChange(event: MediaQueryListEvent) {
  if (!localStorage.getItem(STORAGE_KEY)) {
    applyTheme(event.matches ? 'dark' : 'light')
  }
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function toggleTheme() {
    const nextTheme: Theme = isDark.value ? 'light' : 'dark'
    localStorage.setItem(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const savedTheme = localStorage.getItem(STORAGE_KEY) as Theme | null
    applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getSystemTheme())
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleSystemThemeChange)
  })

  return { isDark, toggleTheme }
}
