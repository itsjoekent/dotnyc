import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,800');

  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.blue[100]};
  }

  h1, h2, h3, h4, h5, h6, p, span, a {
    display: block;
    margin: 0;
    font-family: ${props => props.theme.font.family};
  }

  div, section, article, header, footer, main {
    display: block;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ::selection {
    background-color: ${({ theme }) => theme.colors.blue[200]};
  }
`;

export default GlobalStyle;
