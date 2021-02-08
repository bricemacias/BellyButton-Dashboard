import { createGlobalStyle } from 'styled-components';
import theme from './theme';

/**
 * Global styles for the application
 */
export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 62.5%; // 1rem = 10px, 10/16px = 62.5%

  /* @media only screen and (max-width: $bp-largest) {
    font-size: 70%;
  } */
  @media only screen and (max-width: ${theme.screen.largest}) {
    font-size: 50%;
  }
}

body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  margin: 0;
  font-weight: 400;
  line-height: 1.6;
  height:100vh;
  min-height:100vh;
  color: ${theme.colors.grey.dark2};
  background-image: linear-gradient(
    to right bottom,
    ${theme.colors.primary.light},
    ${theme.colors.primary.main}
  );
  background-size: cover;
  background-attachment: fixed;
  /* height: 100vh; */
  background-repeat: no-repeat;

   @media only screen and (max-width: ${theme.screen.smallest}) {
    background-image: linear-gradient(
    to right bottom,
    white,
    white
  );
   }
}


code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

`;
