/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        sm: { max: '695px' },
      },
      borderColor: {
        gray: {
          450: 'rgb(32 36 45)',
        },
      },
      colors: {
        gold: {
          500: '#FFD700',
        },
        silver: {
          500: '#C0C0C0',
        },
        bronze: {
          500: '#CD7F32',
        },
        gray: {
          100: '#63707F',
          300: '#3D4554',
          600: '#14171C',
        },
      },
      fontFamily: {
        russoOne: ['Russo One', 'sans-serif'],
      },
      animation: {
        hideToShow: 'hideToShow 1s ease-in-out',
        leftToShow: 'leftToShow 1s ease-in-out',
      },
      keyframes: {
        hideToShow: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        leftToShow: {
          '0%': {
            opacity: 0,
            marginRight: 400,
            marginLeft: -400,
          },
          '100%': {
            opacity: 1,
            marginRight: 0,
            marginLeft: 0,
          },
        },
      },
    },
  },
  plugins: [],
};
