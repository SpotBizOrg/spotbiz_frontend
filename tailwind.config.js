const flowbite = require('flowbite/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    fontFamily: {
      body: ['"Poppins"', 'sans-serif'], // Fixed typo "Popins" to "Poppins"
    },
    colors: {
      blue: '#bfdbfe',
      bluedark: '#0D3B66',
      bluegray: '#ebf3fa',
      bgyellow: '#FAF0CA',
      black: '#000000',
      white: '#FFFFFF',
      gray: {
        50: '#f9fafb',
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
    },
    fontSize: {
      heading: '70px',
      subheading: '40px',
      subsubheading: '30px',
      bodyfont: '12px',
      bodysmall: '14px',
      bodymedium: '16px',
      bodylarge: '20px',
    },
    boxShadow: {
      'left': '-4px 0 10px -6px rgba(0, 0, 0, 0.5)', // Shadow on the left side
      'right': '4px 0 10px -6px rgba(0, 0, 0, 0.5)', // Shadow on the right side
      'top': '0 -4px 10px -6px rgba(0, 0, 0, 0.5)', // Shadow on the top side
      'bottom': '0 4px 10px -6px rgba(0, 0, 0, 0.5)', // Shadow on the bottom side
    },
    extend: {},
  },
  plugins: [
    flowbite, // Correct usage for flowbite plugin
  ],
};
