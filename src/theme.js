import { css } from 'styled-components';

const breakpoints = {
  mobileSmall: '320px',
  mobileMedium: '375px',
  mobileLarge: '425px',
  tablet: '768px',
  desktopSmall: '1024px',
  desktopLarge: '1440px',
  infinity: '2560px',
};

// modified from https://www.styled-components.com/docs/advanced#media-templates
const media = Object.keys(breakpoints).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${breakpoints[label]}) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

const theme = {
  spacing: {
    interval: 4,
    base: 4 * 4,
  },
  colors: {
    bw: {
      100: '#fefefe',
      200: '#dce0e5',
      300: '#bac3cb',
      400: '#99a5b2',
      500: '#778899',
      600: '#5b6b7a',
      700: '#424d58',
      800: '#293037',
      900: '#101215',
    },
    blue: {
      100: '#f8fcfd',
      200: '#d9eff4',
      300: '#bbe2ec',
      400: '#9cd5e3',
      500: '#7ec8da',
      600: '#5fbbd1',
      700: '#41aec9',
      800: '#3297b0',
      900: '#2a7d92',
    },
  },
  font: {
    family: `'Open Sans', sans-serif`,
    size: {
      base: 20,
      small: 14,
      header: 36,
      hero: 52,
    },
    weight: {
      light: 300,
      base: 400,
      bold: 600,
      dark: 800,
    },
  },
  breakpoints,
  media,
};

export default theme;
