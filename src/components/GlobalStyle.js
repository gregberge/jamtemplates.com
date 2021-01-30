import * as React from 'react'
import { createGlobalStyle, Preflight } from '@xstyled/styled-components'

const CustomGlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: sans-serif;
    background-color: bg;
    color: text;
    line-height: 1.4;
    -webkit-font-smoothing: antialiased;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
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

  svg, img {
    display: inline-block;
    vertical-align: initial;
  }
`

export function GlobalStyle() {
  return (
    <>
      <Preflight />
      <CustomGlobalStyle />
    </>
  )
}
