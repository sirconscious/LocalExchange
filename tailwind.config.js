/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Fixed the glob pattern for src files
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6E14', // Add your custom color under the `colors` key
      },
    },
  },
  plugins: [],
};