import { createGlobalStyle } from 'styled-components';
import { typography, spacing } from './tokens';

const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${typography.fontFamily};
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 ${spacing.sm};
    font-weight: ${typography.weightMedium};
  }

  p {
    margin: 0 0 ${spacing.md};
  }

  a {
    color: ${ ({ theme }) => theme.primaryPurple };
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  button {
    font-family: ${typography.fontFamily};
  }

  input, select, textarea {
    font-family: ${typography.fontFamily};
  }
`;

export default GlobalStyles;
