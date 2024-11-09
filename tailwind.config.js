/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.h-webkit-fill-available': {
          height: '-webkit-fill-available',
        },
        '.min-h-webkit-fill-available': {
          minHeight: '-webkit-fill-available',
        },
      });
    },
  ],
};
