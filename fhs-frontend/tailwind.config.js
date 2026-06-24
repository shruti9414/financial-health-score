/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF3131',
        secondary: '#081226',
        accent: '#FFB800',
      },
    },
  },
  plugins: [],
}
