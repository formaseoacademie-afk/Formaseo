/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#082238',
          navy: '#0B2C47',
          darker: '#041624',
          accent: '#F5B716',
          accentHover: '#E0A30B',
          accentLight: '#FFF8E6',
          yellow: '#F5B716',
          yellowLight: '#FEF9EC',
          blueLight: '#EDF5FC',
          cyanLight: '#EEF6F8',
          grayBg: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3.2rem',
      }
    },
  },
  plugins: [],
}
