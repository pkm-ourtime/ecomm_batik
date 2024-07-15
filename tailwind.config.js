/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      body: ['Poppins'],
    },
    container: {
      center: true,
      // padding: '16px',
    },
    extend: {
      colors: {
        primary: '#FF8023',
        secondary: '#FFA726',
        dark: '#0f172a'
      },
      screens:{
        '2xl': '1320px',
      },
    },
  },
  plugins: [],
}