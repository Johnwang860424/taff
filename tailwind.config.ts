import type { Config } from 'tailwindcss'

const tailwindConfig: Config = {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#2C2C2C",
        "background-light": "#EEECE1",
        "accent-gold": "#C6A87C",
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "'Noto Serif TC'", "serif"],
        sans: ["'Montserrat'", "'Noto Sans TC'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

export default tailwindConfig
