/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        fontFamily: {
          poppins: "'Poppins', sans-serif ",
          opensans: "'Open Sans',sans-serif",
          gabarito: "'Gabarito','sans-serif'",
        },
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2C3E50",
          secondary: "#4A30FF",
          accent: "#eceef2",
          neutral: "#f7f8fd",
        },
      },
    ],
  },
}