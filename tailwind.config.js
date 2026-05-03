/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          200: '#c7d7fe',
          300: '#a5bcfc',
          400: '#8194f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        accent: {
          yellow: '#FFD93D',
          orange: '#FF6B35',
          green:  '#06D6A0',
          pink:   '#FF6B9D',
        },
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(99,102,241,0.1) 0%, rgba(168,85,247,0.05) 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(99,102,241,0.8)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        skillsphere: {
          "primary":          "#6366f1",
          "primary-content":  "#ffffff",
          "secondary":        "#a855f7",
          "secondary-content":"#ffffff",
          "accent":           "#FFD93D",
          "accent-content":   "#1a1a2e",
          "neutral":          "#1e1b4b",
          "neutral-content":  "#e0eaff",
          "base-100":         "#0f0c29",
          "base-200":         "#16133a",
          "base-300":         "#1e1b4b",
          "base-content":     "#e0eaff",
          "info":             "#06D6A0",
          "success":          "#06D6A0",
          "warning":          "#FFD93D",
          "error":            "#FF6B9D",
        },
      },
    ],
  },
}
