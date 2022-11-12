/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Avenir', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        alatsi: ['Alatsi', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
        cagliostro: ['Cagliostro', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
