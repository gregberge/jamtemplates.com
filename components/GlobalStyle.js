import { createGlobalStyle } from '@xstyled/styled-components'
import { normalize } from 'polished'

export const GlobalStyle = createGlobalStyle`
  ${normalize()}

  body {
    margin: 0;
    font-family: sans-serif;
    background-color: bg;
    color: text;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  * {
    box-sizing: border-box;
  }

  button {
    font-family: sans-serif;
  }

  ::selection {
    background-color: accent; 
    color: lighter;
  }

  a {
    color: primary;
    text-decoration: none;
    transition: base;

    &:hover {
      color: accent;
    }
  }
`
