import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        eveagle: {
          bg: '#0B0B0D',
          'bg-secondary': '#141419',
          accent: '#FF4D2E',
          text: '#F4F4F5',
          'text-muted': '#A6A6AA',
        }
      },
      fontFamily: {
        display: ['var(--font-sora)', 'Sora', 'sans-serif'],
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'IBM Plex Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
