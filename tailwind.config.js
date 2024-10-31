/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#2C3E50",
          secondary: "#F8F9F9",
          accent: "#eceef2",
          neutral: "#f7f8fd",
        },
      },
      "light",
      "synthwave",
    ],
  },
}