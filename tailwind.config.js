module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      body: 'Roboto, sans-serif',
      heading: 'Roboto, sans-serif',
      display: '"Roboto Condensed", sans-serif',
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
        tertiary: '#E9ECEF',
      },
      height: {
        min: 'min-content',
        '095': '95%',
        224: '56rem',
        248: '62rem',
      },
      maxHeight: {
        120: '30rem',
      },
      flex: {
        2: '2 1 0',
      },
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      opacity: ['disabled'],
      spacing: ['last'],
      borderWidth: ['hover'],
    },
  },
  plugins: [],
};
