import { defineConfig, presetWind3, presetIcons } from 'unocss'
import presetWebFonts from '@unocss/preset-web-fonts'

export default defineConfig({
  presets: [
    presetWind3(),
    presetWebFonts({
      fonts: {
        sans: 'Montserrat',
        mono: 'Arizonia', 
        serif: 'Roboto',
        diner: 'Permanent Marker',
      },
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
})
