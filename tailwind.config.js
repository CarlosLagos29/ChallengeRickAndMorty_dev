/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        backGround: "#010024",
        blue: "#31fcce",
        greenLime: "#16ee65",
        greenTransition: "#28fe8a",
      },
      fontFamily:{
        'Indie_Flower': ['Indie Flower','cursive'],
        'Permanent_Marker':['Permanent Marker','cursive']
      }
    },
  },
  plugins: [],
};

