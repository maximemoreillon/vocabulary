/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: "#c00000",
      "primary-100": "#c00000",
      "primary-200": "#cc371e",
      "primary-300": "#d75538",
      "primary-400": "#e16f52",
      "primary-500": "#e9886d",
      "primary-600": "#f1a089",

      light: "#F9FAFB",
      dark: "#121212",
      "dark-100": "#121212",
      "dark-200": "#282828",
      "dark-300": "#3f3f3f",
      "dark-400": "#575757",
      "dark-500": "#717171",
      "dark-600": "#8b8b8b",
      success: "#4CAF50",
      error: "#F44336",
    },
  },
  plugins: [],
}
