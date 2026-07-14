/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Color Scheme - Updated
        karateBg: '#0D0D0D',
        karateSurface: '#171717',
        karateCard: '#222222',
        karatePrimary: '#3B82F6',      // Elegant Blue (was Gold)
        karateSecondary: '#9CA3AF',    // Gray (was Dark Red)
        karateAccent: '#F5F5F5',
        karateText: '#FAFAFA',
        karateTextSecondary: '#B5B5B5',
        karateBorder: '#F5F5F5',       // Bright White (was rgba)
        // Legacy names for compatibility
        karateWhite: '#F5F5F5',
        karateGray: '#B5B5B5',
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.4)',
        'soft-md': '0 4px 12px rgba(0, 0, 0, 0.5)',
        'soft-lg': '0 8px 24px rgba(0, 0, 0, 0.6)',
        'gold-glow': '0 0 15px rgba(59, 130, 246, 0.1)',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.4)' },
        },
      },
      animation: {
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      backdropBlur: {
        'xs': '4px',
        'sm': '8px',
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

