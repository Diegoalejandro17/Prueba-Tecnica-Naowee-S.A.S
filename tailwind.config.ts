import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
    extend: {
      colors: {
        background: '#0a0f0d',
        surface: '#111a15',
        'surface-2': '#1a2820',
        accent: '#22c55e',
        'accent-dim': '#16a34a',
        'text-primary': '#f0fdf4',
        'text-secondary': '#86efac',
        'text-muted': '#4ade80',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      borderColor: {
        DEFAULT: 'rgba(34, 197, 94, 0.15)',
        strong: 'rgba(34, 197, 94, 0.3)',
      },
      boxShadow: {
        glow: '0 0 30px rgba(34, 197, 94, 0.15)',
        'glow-strong': '0 0 50px rgba(34, 197, 94, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'pulse-green': 'pulse-green 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;