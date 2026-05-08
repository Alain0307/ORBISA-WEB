/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orbisa: {
          navy:   '#0B1120',
          dark:   '#111827',
          mid:    '#1E2D4A',
          blue:   '#2563EB',
          bright: '#3B82F6',
          light:  '#60A5FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
