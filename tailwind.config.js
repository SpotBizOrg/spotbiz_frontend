/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      borderRadius: {
        'custom': '22px',
      },
      fontFamily: {
        body: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        yellow: {
          100: '#fefcbf',
          400: '#f6e05e',
          500: '#ecc94b',
        },
        blue: '#bfdbfe',
        bluedark: "#0D3B66",
        bluegray: '#ebf3fa',
        customYellow: '#FAF0CA',
        customYellow2 : '#FFFAE7',
        customWhite : "#F5FBFF",
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        primary: '#0D3B66',
        secondary: '#D9D9D9',
      },
      spacing: {
        96: '24rem',
      },
      fontSize: {
        heading: '70px',
        subheading: '40px',
        subsubheading: '30px',
        subsubsubheading: '20px',
        body: '12px',
        bodysmall: '14px',
        bodymedium: '16px',
        bodylarge: '20px',
      },
      boxShadow: {
        'left': '-4px 0 10px -6px rgba(0, 0, 0, 0.5)',
        'right': '4px 0 10px -6px rgba(0, 0, 0, 0.5)',
        'top': '0 -4px 10px -6px rgba(0, 0, 0, 0.5)',
        'bottom': '0 4px 10px -6px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
      textColor: ['hover', 'focus'],
      ringWidth: ['focus'],
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
