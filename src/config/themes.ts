export type ColorTheme = 'emerald' | 'baby-rose' | 'purple'
export type ThemeMode = 'light' | 'dark'

export const DEFAULT_COLOR_THEME: ColorTheme = 'baby-rose'

type ThemePalette = {
  background: string
  card: string
  surface: string
  accent: string
  bronze: string
  text: string
  accentLight: string
  surfaceLight: string
}

type WeddingTheme = {
  id: ColorTheme
  label: string
  swatch: string
  petalColor: string
  light: ThemePalette
  dark: ThemePalette
}

export const weddingThemes: readonly WeddingTheme[] = [
  {
    id: 'emerald',
    label: 'Emerald',
    swatch: '#35745b',
    petalColor: '#e2ba68',
    light: {
      background: '#f1f5ef', card: '#fbfdf9', surface: '#e1ece3',
      accent: '#765914', bronze: '#70501e', text: '#263b30',
      accentLight: '#a77c13', surfaceLight: '#cbded0',
    },
    dark: {
      background: '#060b09', card: '#0b1310', surface: '#02241c',
      accent: '#d4af37', bronze: '#aa771c', text: '#f3ead3',
      accentLight: '#e7c75a', surfaceLight: '#12382d',
    },
  },
  {
    id: 'baby-rose',
    label: 'Baby Rose',
    swatch: '#ec6095',
    petalColor: '#ec6095',
    light: {
      background: '#fdf3f6', card: '#fffbfc', surface: '#f9e4ec',
      accent: '#a83261', bronze: '#923352', text: '#50323e',
      accentLight: '#cf477c', surfaceLight: '#f1cdda',
    },
    dark: {
      background: '#22151d', card: '#301e28', surface: '#452b39',
      accent: '#ec6095', bronze: '#cb5681', text: '#fceef3',
      accentLight: '#f495b7', surfaceLight: '#5c384b',
    },
  },
  {
    id: 'purple',
    label: 'Purple',
    swatch: '#9670c5',
    petalColor: '#cfb4f1',
    light: {
      background: '#f5f0fb', card: '#fdfaff', surface: '#e9def5',
      accent: '#715091', bronze: '#684e80', text: '#3f2e50',
      accentLight: '#9268b8', surfaceLight: '#d8c5eb',
    },
    dark: {
      background: '#1b1226', card: '#261b33', surface: '#382449',
      accent: '#cfb4f1', bronze: '#af8bce', text: '#f1e7fa',
      accentLight: '#e1cef8', surfaceLight: '#503365',
    },
  },
]

export function getWeddingTheme(value: string | null): WeddingTheme {
  const themeId = value === 'ocean' ? 'purple' : value === 'rose' ? 'baby-rose' : value
  return weddingThemes.find(palette => palette.id === themeId)
    ?? weddingThemes.find(palette => palette.id === DEFAULT_COLOR_THEME)!
}