import { defineConfig, presetUno, presetAttributify, presetIcons, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Montserrat',
        roboto: 'Roboto',
      },
    }),
  ],
  theme: {
    colors: {
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
    },
  },
  shortcuts: {
    'btn': 'px-4 py-2 rounded-md font-medium transition-colors',
    'btn-primary': 'btn bg-primary text-primary-foreground hover:bg-primary/90',
    'btn-secondary': 'btn bg-secondary text-secondary-foreground hover:bg-secondary/90',
    'card': 'rounded-lg border bg-card text-card-foreground shadow-sm',
  },
  safelist: [
    // INIZIO CLASSE AUTO-GENERATE
    "absolute inset-0 bg-green-500 bg-opacity-80 flex flex-col items-center justify-center text-white",
    "absolute inset-0 -z-10 rounded-lg border-2",
    "absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-500",
    "absolute top-0 left-0 right-0",
    "absolute -top-2 left-1/2 transform -translate-x-1/2",
    "absolute top-2 left-2 bg-white/90 p-2 rounded shadow-lg text-xs",
    "absolute -top-2 -right-2",
    "absolute -top-4 left-1/2 transform -translate-x-1/2",
    "animate-pulse space-y-4",
    "animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full",
    // ... (continua con tutte le classi estratte, una per riga, come nell'unocss-safelist.txt) ...
    "w-full text-xs text-gray-500 flex items-center",
    "whitespace-nowrap"
    // FINE CLASSE AUTO-GENERATE
  ],
}); 