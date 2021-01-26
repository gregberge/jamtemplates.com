import React from 'react'
import {
  ThemeProvider,
  rpxTransformers,
  th,
  defaultTheme,
} from '@xstyled/styled-components'
import { transparentize } from 'polished'

const theme = {
  ...defaultTheme,
  colors: {
    primary: '#8aa5ff',
    accent: '#FFCA81',
    success: '#54C76D',
    light100: '#16171B',
    darker: '#000',
    lighter: '#fff',
    bg: th.color('light100'),
    'card-bg': '#292B33',
    text: '#959cb1',
    'readme-text': '#C6CFEB',
    'navbar-bg': (p) => transparentize(0.7, th.color('darker')(p)),
  },
  fonts: {
    'sans-serif':
      '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
  },
  transitions: {
    base: '.2s ease-in-out all',
  },
  shadows: {
    soft: (p) => `0 ${th.px(2)(p)} ${th.px(6)(p)} 0 rgba(0, 0, 0, 0.1)`,
  },
  space: [0, 4, 8, 16, 24, 48, 96, 144, 192, 240],
  radii: {
    base: 4,
  },
  sizes: {
    'container-base': 1200,
    'container-lg': 1280,
  },
  transformers: {
    ...rpxTransformers,
  },
}

export function ThemeInitializer({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}
