import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default <Config>{
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#fafaf9',   // Canvas Background base
          100: '#f5f5f4',  // Card Surface Muted / Insets
          200: '#e7e5e4',  // Stone structural borders
          300: '#d6d3d1',  // Active borders / focus rings
          400: '#a8a29e',  // Muted captions & icons
          700: '#44403c',
          800: '#292524',
          900: '#1c1917'   // Deep stone text
        },
        ink: {
          primary: '#0f172a',    // High-contrast primary slate typography
          secondary: '#475569',  // Medium slate secondary guidance
          muted: '#94a3b8'       // Soft slate placeholders
        },
        maritime: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          500: '#0ea5e9',
          600: '#0284c7',   // Primary brand action accent
          700: '#0369a1',   // Interactive hover state
          800: '#075985'
        },
        crimson: {
          50: '#fef2f2',    // Critical risk pill background
          100: '#fee2e2',
          200: '#fecaca',
          600: '#dc2626',   // Critical risk border and icons
          700: '#b91c1c',   // High-contrast critical text
          800: '#991b1b'
        },
        amber: {
          50: '#fffbeb',    // Warning risk pill background
          100: '#fef3c7',
          200: '#fde68a',
          600: '#d97706',   // Warning risk border and icons
          700: '#b45309',   // High-contrast warning text
          800: '#92400e'
        },
        emerald: {
          50: '#f0fdf4',    // Safe / protective pill background
          100: '#dcfce7',
          200: '#bbf7d0',
          600: '#16a34a',   // Safe badge border and icons
          700: '#15803d',   // High-contrast safe text
          800: '#166534'
        }
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', 'Plus Jakarta Sans', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      boxShadow: {
        parchment: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.03)',
        elevation: '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.03)'
      }
    }
  },
  plugins: [
    typography
  ]
};
