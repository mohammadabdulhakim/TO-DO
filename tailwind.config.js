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
        "main-dark-bg":"rgb(59 7 100)",
        "second-dark-bg":"rgb(88 28 135)",
      }
    },
  },
  plugins: [],
}

