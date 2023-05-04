/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{html,js,jsx}",
    "./pages/**/*.{html,js,jsx}",
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        "heading-color": "var(--heading-color)",
        "text-color": "var(--text-color)",
        "title-color": "var(--title-color)",
        "primary-color": "var(--primary-color)",
        "highlight-color": "var(--highlight-color)",
        "bg-color": "var(--bg-color)",
        "border-color": "var(--border-color)",
      },
    },
  },
  plugins: [],
};
