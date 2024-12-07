/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors:{
        primary : "#3D8287",
        hippoBlack:"282A2E"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "320px",
      sm: '640px',  
      md: '650px',  
      lg: '1024px', 
      xl: '1280px', 
      
    },
  },
  plugins: [],
};