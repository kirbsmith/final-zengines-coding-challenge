/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'graygreen': '#a3a3a3',
        'lightgray': '#d4d4d4'
      },
      fontFamily: {
        'montserrat': 'Montserrat'
      },
    }
  },
  plugins: []
};
