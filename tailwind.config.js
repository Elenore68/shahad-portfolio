/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#EFEEF6',
        primary: {
          500: '#4b3bbd',
          600: '#3f30a7'
        }
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(75,59,189,0.15)'
      },
      backgroundImage: {
        'soft-gradient': 'linear-gradient(135deg, rgba(75,59,189,0.06), rgba(255,255,255,0.9))'
      }
    }
  },
  plugins: []
}


