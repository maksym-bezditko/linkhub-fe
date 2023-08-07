/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      keyframes: {
        'sidebar-appear': {
          from: { transform: 'translateX(-1000px)' },
          to: { transform: 'translateX(-300px)' },
        },
        'sidebar-disappear': {
          from: { transform: 'translateX(-300px)' },
          to: { transform: 'translateX(-1000px)' },
        },

        'sidebar-overlay-appear': {
          from: { opacity: '0' },
          to: { opacity: '0.5' },
        },
        'sidebar-overlay-disappear': {
          from: { opacity: '0.5' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'sidebar-appear':
          'sidebar-appear 0.8s cubic-bezier(0.555, -0.030, 0.385, 1.325) forwards',
        'sidebar-disappear':
          'sidebar-disappear 0.8s cubic-bezier(0.430, -0.205, 0.800, 0.620) forwards',
        'sidebar-overlay-appear': 'sidebar-overlay-appear 0.5s linear forwards',
        'sidebar-overlay-disappear':
          'sidebar-overlay-disappear 0.5s linear forwards',
      },
      colors: {
        'greying-blue': '#364f6b',
      },
      screens: {
        laptop: { max: '1024px' },
        mobile: { max: '550px' },
        'mini-mobile': { max: '400px' },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
