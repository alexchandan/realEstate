import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Deep Architectural Forest & Warm Platinum
        brand: {
          50: '#f4f7f5',
          100: '#e5ece7',
          200: '#ccdbd2',
          300: '#a7c1b4',
          400: '#7ba291',
          500: '#568472',
          600: '#416a5b',
          700: '#34554a',
          800: '#2c453c',
          900: '#0e382c', // Primary Architectural Deep Forest
          950: '#072019',
        },
        stone: {
          850: '#1f1d1b',
          900: '#1c1917',
          950: '#0c0a09',
        },
        onyx: {
          800: '#161b22',
          850: '#11151b',
          900: '#0b0d10', // Deep obsidian background
          950: '#060709',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['var(--font-display)', 'Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'elevation-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'elevation-card': '0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.03)',
        'elevation-hover': '0 12px 32px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)',
        'elevation-modal': '0 24px 48px -12px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-up': 'slideUp 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
