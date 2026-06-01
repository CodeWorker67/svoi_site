/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        zoomer: {
          neon: '#F5F5F5',
          'neon-bright': '#FFFFFF',
          'neon-dim': '#A3A3A3',
          green: '#E5E7EB',
          cyan: '#D4D4D8',
          blue: '#D4D4D8',
          dark: '#000000',
          'dark-alt': '#050505',
          card: '#0a0a0a',
          border: 'rgba(255, 255, 255, 0.1)',
          muted: '#6b7280',
          'muted-soft': '#9ca3af',
        },
        accent: '#FFFFFF',
        success: '#E5E7EB',
        warning: '#F59E0B',
        error: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '28px',
        'btn': '14px',
      },
      boxShadow: {
        'card': '0 0 0 1px rgba(255, 255, 255, 0.08), 0 24px 48px rgba(0, 0, 0, 0.6), 0 0 60px rgba(255, 255, 255, 0.04)',
        'neon': '0 4px 24px rgba(255, 255, 255, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.18) inset',
        'neon-hover': '0 6px 32px rgba(255, 255, 255, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.22) inset',
        'glow': '0 0 20px rgba(255, 255, 255, 0.15)',
        'glow-lg': '0 0 40px rgba(255, 255, 255, 0.25)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'slide-up': 'slide-up 0.6s ease-out',
        'bg-shimmer': 'bgShimmer 22s ease-in-out infinite',
        'title-shimmer': 'titleShimmer 6s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(255, 255, 255, 0.15)' },
          '100%': { boxShadow: '0 0 40px rgba(255, 255, 255, 0.25)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        bgShimmer: {
          '0%, 100%': { backgroundPosition: '0% 40%' },
          '35%': { backgroundPosition: '100% 55%' },
          '65%': { backgroundPosition: '85% 20%' },
        },
        titleShimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
