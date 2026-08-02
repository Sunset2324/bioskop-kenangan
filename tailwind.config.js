/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cinema: {
          bg: '#1a0e0e',
          surface: '#241414',
          maroon: '#7b1e1e',
          maroonDark: '#5a1414',
          maroonLight: '#a32828',
          gold: '#c9a14a',
          goldLight: '#e0b85a',
          cream: '#f5e6c8',
          parchment: '#e8d5b5',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
