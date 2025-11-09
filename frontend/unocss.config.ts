import { defineConfig, presetWind3, presetIcons } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({
      fonts: {
        sans: 'Montserrat',
        mono: 'Arizonia', 
        serif: 'Noto Serif',
        diner: 'Permanent Marker',
      },
      // Add timeout and better error handling
      timeouts: {
        warning: 3000, // 3 seconds warning
        failure: 8000, // 8 seconds before giving up
      },
      // Provide fallback fonts
      provider: 'google',
      inlineImports: false,
    }),
    presetIcons({
      scale: 1.2,
      warn: true,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  // Add safelist to ensure critical utilities are always available
  safelist: [
    'font-sans',
    'font-mono',
    'font-serif',
    'font-diner',
  ],
})
