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
          neon: '#38bdf8',
          'neon-bright': '#60a5fa',
          'neon-dim': '#2563eb',
          green: '#22d3ee',
          cyan: '#00d4ff',
          blue: '#1e6fff',
          dark: '#050a14',
          'dark-alt': '#0a1628',
          card: '#0d1b2e',
          border: 'rgba(56, 189, 248, 0.18)',
          muted: '#64748b',
          'muted-soft': '#94a3b8',
        },
        accent: '#38bdf8',
        success: '#22d3ee',
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
        'card': '0 0 0 1px rgba(56, 189, 248, 0.1), 0 24px 48px rgba(0, 0, 0, 0.5), 0 0 60px rgba(37, 99, 235, 0.08)',
        'neon': '0 4px 24px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(56, 189, 248, 0.25) inset',
        'neon-hover': '0 6px 32px rgba(37, 99, 235, 0.5), 0 0 0 1px rgba(96, 165, 250, 0.35) inset',
        'glow': '0 0 20px rgba(56, 189, 248, 0.25)',
        'glow-lg': '0 0 40px rgba(37, 99, 235, 0.35)',
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
          '0%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)' },
          '100%': { boxShadow: '0 0 40px rgba(37, 99, 235, 0.4)' },
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
