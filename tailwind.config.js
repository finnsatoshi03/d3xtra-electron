/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/renderer/index.html",
    "./src/renderer/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white200: "#ece0e0",
        gray200: "#D9D9D9",
        blue200: "#DCE2FF",
        blue400: "#5686e1",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      keyframes: {
        translateY: {
          "0%": { transform: "translateY(-15%)" },
          "100%": { transform: "translateY(0)" },
        },
      },
      animation: {
        translateY: "translateY 0.15s ease-in-out",
      },
    },
  },
  plugins: [],
};
