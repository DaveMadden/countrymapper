/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      primary: colors.sky[700],
      secondary: colors.slate[600],
      dark: colors.slate[900],
      light: colors.slate[200],
      white: colors.slate[50],
      error: colors.red[700],
      red: colors.red[700],
      green: colors.green[700],
      blue: colors.blue[700],
    },
    extend: {
      fontSize: {
        base: ["18px", "24px"],
      },
      fontFamily: {
        sans: ["var(--font-catamaran)", ...fontFamily.sans],
      },
      // colors: {
      //   red: "#FF0000",
      //   green: "#00FF00",
      //   blue: "#0000FF",
      // },
    },
  },
  plugins: [],
};
