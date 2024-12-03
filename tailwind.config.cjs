/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "350px",
      sm: '640px',  
      md: '768px',  
      lg: '1024px', 
      xl: '1280px', 
      
    },
  },
  plugins: [],
};