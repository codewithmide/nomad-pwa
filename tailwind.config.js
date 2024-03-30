/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        black: ['Black'],
        bold: ['Bold'],
        regular: ['Regular'],
        medium: ['Medium'],
        light: ['Light']
      }
    },
  },
  plugins: [],
}

