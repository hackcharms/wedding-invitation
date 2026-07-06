import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          dark: '#060B09',       // Deepest obsidian-green backdrop
          card: '#0B1310',       // Slightly lighter surface for cards
          emerald: '#02241C',    // Rich middle ground tone
          gold: '#D4AF37',       // Core bright metallic gold
          bronze: '#AA771C',     // Warm dark gold shadow
          cream: '#F3EAD3',      // Soft antique text white
        }
      },
      fontFamily: {
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'gold-glow': '0 0 25px rgba(212, 175, 55, 0.2)',
      }
    }
  },
  plugins: []
}
export default config