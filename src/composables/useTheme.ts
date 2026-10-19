import { computed, onMounted, onUnmounted, ref } from 'vue'
import { DEFAULT_COLOR_THEME, getWeddingTheme, weddingThemes, type ColorTheme, type ThemeMode } from '@/config/themes'

type Theme = ThemeMode

const STORAGE_KEY = 'mission-shaadi-theme'
const PALETTE_STORAGE_KEY = 'mission-shaadi-palette'
const theme = ref<Theme>('dark')
const colorTheme = ref<ColorTheme>(DEFAULT_COLOR_THEME)

function readPreference(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function savePreference(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    return
  }
}

function applyPalette(): void {
  const selected = getWeddingTheme(colorTheme.value)
  const palette = selected[theme.value]
  const root = document.documentElement
  root.dataset.palette = selected.id
  const variables = {
    '--color-luxury-dark': palette.background,
    '--color-luxury-card': palette.card,
    '--color-luxury-emerald': palette.surface,
    '--color-luxury-gold': palette.accent,
    '--color-luxury-bronze': palette.bronze,
    '--color-luxury-cream': palette.text,
    '--color-theme-gold-light': palette.accentLight,
    '--color-theme-emerald-light': palette.surfaceLight,
    '--color-petal': selected.petalColor,
    '--theme-background': `linear-gradient(145deg, ${palette.card} 0%, ${palette.background} 50%, ${palette.surface} 100%)`,
  }
  for (const [property, value] of Object.entries(variables)) {
    root.style.setProperty(property, value)
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(value: Theme) {
  theme.value = value
  document.documentElement.dataset.theme = value
  document.documentElement.style.colorScheme = value
  applyPalette()
}

function handleSystemThemeChange(event: MediaQueryListEvent) {
  if (!['light', 'dark'].includes(readPreference(STORAGE_KEY) ?? '')) {
    applyTheme(event.matches ? 'dark' : 'light')
  }
}

export function useTheme() {
  let mediaQuery: MediaQueryList | undefined
  const isDark = computed(() => theme.value === 'dark')
  const selectedTheme = computed(() => getWeddingTheme(colorTheme.value))

  function selectTheme(value: ColorTheme): void {
    colorTheme.value = getWeddingTheme(value).id
    savePreference(PALETTE_STORAGE_KEY, colorTheme.value)
    applyPalette()
  }

  function toggleTheme() {
    const nextTheme: Theme = isDark.value ? 'light' : 'dark'
    savePreference(STORAGE_KEY, nextTheme)
    applyTheme(nextTheme)
  }

  onMounted(() => {
    mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const savedTheme = readPreference(STORAGE_KEY)
    colorTheme.value = getWeddingTheme(readPreference(PALETTE_STORAGE_KEY)).id
    applyTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : getSystemTheme())
    mediaQuery.addEventListener('change', handleSystemThemeChange)
  })

  onUnmounted(() => {
    mediaQuery?.removeEventListener('change', handleSystemThemeChange)
  })

  return { isDark, toggleTheme, colorTheme, selectedTheme, themes: weddingThemes, selectTheme }
}
