/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '24px'],
      lg: ['18px', '28px'],
      xl: ['20px', '28px'],
      '2xl': ['24px', '32px'],
    },
    extend: {
      fontFamily: {
        'sans-theme1': ['Helvetica', 'Arial', 'sans-serif'],
        'serif-theme2': ['Georgia', 'Times New Roman', 'serif'],
        'google-theme3': ['"Pacifico"', 'cursive'],
      },
      colors: {
        theme1: {
          primary: '#007bff',
          bg: '#f8f9fa',
          text: '#333333',
        },
        theme2: {
          primary: '#1a202c',
          bg: '#121212',
          text: '#f0f0f0',
        },
        theme3: {
          primary: '#e91e63',
          bg: '#ffe4e1',
          cardBg: '#fff0f5',
          text: '#2d2d2d',
        },
      },
      gridTemplateColumns: {
        'card-grid-theme3': 'repeat(auto-fit, minmax(250px, 1fr))',
      },
      transitionDuration: {
        300: '300ms',
      },
    },
  },
  plugins: [],
};
