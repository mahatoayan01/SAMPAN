/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef3e2',
          100: '#fde4b6',
          200: '#fcd48a',
          300: '#fbc35e',
          400: '#fab63d',
          500: '#f9a825',
          600: '#f59020',
          700: '#ef7a1a',
          800: '#e96515',
          900: '#df400c',
        },
        dark: {
          50: '#e8e8e8',
          100: '#c5c5c5',
          200: '#9e9e9e',
          300: '#777777',
          400: '#595959',
          500: '#3b3b3b',
          600: '#353535',
          700: '#2d2d2d',
          800: '#262626',
          900: '#1a1a1a',
          950: '#111111',
        },
        accent: {
          red: '#dc2626',
          green: '#16a34a',
          gold: '#d4a017',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
