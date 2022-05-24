module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      darkBlueDarkMode: "hsl(209, 23%, 22%)",
      veryDarkBlueDarkMode: "hsl(207, 26%, 17%)",
      veryDarkBlueLightMode: "hsl(200, 15%, 8%)",
      darkGreyLightMode: "hsl(0, 0%, 52%)",
      veryLightGreyLightMode: "hsl(0, 0%, 98%)",
      white: "hsl(0, 0%, 100%)",
    },
    fontFamily: {
      sans: ["Nunito Sans", "sans-serif"],
      awesome: ["Font Awesome 5 Free"],
    },
  },
  plugins: [require("tw-elements/dist/plugin")],
};
