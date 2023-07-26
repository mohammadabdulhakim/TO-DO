/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors:{
        "main-color":"#FF0327",
        "second-color":"#29BCFF",
      },
      backgroundColor:{
        "main-bg":"rgb(226 232 240)",
        "second-bg":"#fff",
        "main-dark-bg":"#1d1a2c",
        "second-dark-bg":"#282637",
      }
    },
  },
  plugins: [],
}

