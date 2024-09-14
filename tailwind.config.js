/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./node_modules/twrnc/**/*.js",
     "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3573FB',
          light: '#FB923C',
          dark: '#EF4444',
        },        
        blue: {
          DEFAULT: '#3573FB',
          '20': '#DCE4F9',
          '40': '#A6B8F0',
          '60': '#6F8AE0',
          '80': '#3573FB',
          '100': '#0039FF',
        },
        orange: {
          DEFAULT: '#FB923C',
          '20': '#FCE9E0',
          '40': '#F8C9A0',
          '60': '#F49A60',
          '80': '#FB923C',
          '100': '#C94D00',
        },
        red: {
          DEFAULT: '#EF4444',
          '20': '#F9DCDC',
          '40': '#F4A1A1',
          '60': '#F27C7C',
          '80': '#EF4444',
          '100': '#D00000',
        },
        grayscale: {
          '100': '#FBFCFF',
          '80': '#DFE6F5',
          '60': '#787F8D',
          '40': '#21242B',
          '20': '#0C0C11',
        },
      },
    },
  },
  plugins: [],
};
