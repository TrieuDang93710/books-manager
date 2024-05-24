/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,jsx}"];
export const mode = "jit";
export const theme = {
  extend: {
    colors: {
      primary: "#f0f0f0",
      secondary: "#c92127",
      dimWhite: "rgba(255, 255, 255, 0.7)",
      dimBlue: "rgba(9, 151, 124, 0.1)",
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    scale: {
      '175': '1.75',
    }
  },
  screens: {
    xs: "480px",
    ss: "768px",
    sm: "992px",
    md: "1024px",
    lg: "1200px",
    xl: "1700px",
  },
};
export const plugins = [];