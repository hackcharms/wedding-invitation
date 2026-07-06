import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        theme: {
          // Dark Emerald Palettes
          emerald: {
            DEFAULT: '#021E17',
            light: '#053629',
            dark: '#01120E',
          },
          // Core Obsidian Deep Canvas
          obsidian: {
            DEFAULT: '#01140F',
            pure: '#000A07',
          },
          // Premium Accents
          gold: {
            light: '#FFFDD0', 
            DEFAULT: '#D4AF37', 
            dark: '#AA771C', 
          }
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
        mono: ['Courier New', 'monospace']
      },
      boxShadow: {
        'luxury-glow': '0 0 30px rgba(212, 175, 55, 0.25)',
        'shutter-depth': '0 0 50px rgba(0, 0, 0, 0.8)'
      }
    }
  },
  plugins: []
}

export default config