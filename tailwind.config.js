module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      body: 'Barlow, sans-serif',
      heading: 'Barlow, sans-serif',
      display: '"Barlow Condensed", sans-serif',
    },
    fontSize: {
      xs: '1rem',
      sm: '1.5rem',
      base: '1.777rem',
      lg: '2.368rem',
      xl: '3.157rem',
      '2xl': '4.209rem',
      '3xl': '5.61rem',
      '4xl': '7.478rem',
    },
    extend: {
      colors: {
        primary: '#0085FF',
        secondary: '#7421FC',
      },
      maxHeight: {
        120: '30rem',
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
};
