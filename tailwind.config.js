/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D32F2F',
        secondary: '#388E3C',
        accent: '#FFD700',
        charcoal: '#333333',
        'light-gray': '#F5F5F5',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'snow-1': 'snowfall-1 10s linear infinite',
        'snow-2': 'snowfall-2 15s linear infinite',
        'slideDown': 'slideDown 0.3s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};