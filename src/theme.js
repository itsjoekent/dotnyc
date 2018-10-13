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
    black: '#00080c',
    gray: '#919ca1',
    lightBlue: '#33c5ff',
    vividBlue: '#335fff',
    darkBlue: '#002533',
  },
  font: {
    family: `'Open Sans', sans-serif`,
    sizing: {
      base: {
        mobile: 16,
        desktop: 20,
      },
      small: {
        mobile: 12,
        desktop: 14,
      },
      header: {
        mobile: 28,
        desktop: 48,
      },
      hero: {
        mobile: 48,
        desktop: 96,
      },
    },
    weight: {
      light: 300,
      base: 400,
      bold: 700,
      dark: 800,
    },
  },
  breakpoints,
  media,
};

export default theme;
