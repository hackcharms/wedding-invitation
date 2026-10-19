export type ColorTheme = 'emerald' | 'rose' | 'ocean'
export type ThemeMode = 'light' | 'dark'

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
    id: 'rose',
    label: 'Rose',
    swatch: '#ad526a',
    petalColor: '#e29aa9',
    light: {
      background: '#fbf2f4', card: '#fffafb', surface: '#f3dfe5',
      accent: '#97405b', bronze: '#844157', text: '#492c36',
      accentLight: '#b85b76', surfaceLight: '#e9c7d2',
    },
    dark: {
      background: '#190d13', card: '#25131c', surface: '#3a1929',
      accent: '#edb4c5', bronze: '#cd8b9e', text: '#f8e9ee',
      accentLight: '#f5ccda', surfaceLight: '#51263a',
    },
  },
  {
    id: 'ocean',
    label: 'Ocean',
    swatch: '#287b87',
    petalColor: '#92cdd5',
    light: {
      background: '#eff7f8', card: '#f9fdfe', surface: '#dceef1',
      accent: '#246675', bronze: '#315d6a', text: '#263e46',
      accentLight: '#348292', surfaceLight: '#bfdde3',
    },
    dark: {
      background: '#0b171c', card: '#112127', surface: '#14343d',
      accent: '#92cdd5', bronze: '#6ba8b4', text: '#e5f2f4',
      accentLight: '#bde3e8', surfaceLight: '#204852',
    },
  },
]

export function getWeddingTheme(value: string | null): WeddingTheme {
  return weddingThemes.find(palette => palette.id === value) ?? weddingThemes[0]!
}