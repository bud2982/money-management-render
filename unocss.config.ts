import { defineConfig, presetUno, presetAttributify, presetIcons, presetWebFonts, presetMini } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetMini(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Montserrat',
        roboto: 'Roboto',
      },
    }),
  ],
  // Puoi aggiungere qui le tue regole custom o shortcut
}); 