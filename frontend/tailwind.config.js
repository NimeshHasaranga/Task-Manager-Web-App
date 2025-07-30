/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-in': 'slide-in 1s ease-out forwards',
      },
      keyframes: {
        'fade-in': {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in': {
          'from': { opacity: '0', transform: 'translateY(-20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animationDelay: {
        200: '0.2s',
        400: '0.4s',
        600: '0.6s',
        800: '0.8s',
        1000: '1s',
        1200: '1.2s',
        1400: '1.4s',
        1600: '1.6s',
        1800: '1.8s',
        2000: '2s',
        2200: '2.2s',
        2400: '2.4s',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-200': { 'animation-delay': '0.2s' },
        '.animation-delay-400': { 'animation-delay': '0.4s' },
        '.animation-delay-600': { 'animation-delay': '0.6s' },
        '.animation-delay-800': { 'animation-delay': '0.8s' },
        '.animation-delay-1000': { 'animation-delay': '1s' },
        '.animation-delay-1200': { 'animation-delay': '1.2s' },
        '.animation-delay-1400': { 'animation-delay': '1.4s' },
        '.animation-delay-2000': { 'animation-delay': '2s' },
        '.animation-delay-2200': { 'animation-delay': '2.2s' },
      });á
    },
  ],
};