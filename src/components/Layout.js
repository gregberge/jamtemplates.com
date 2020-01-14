import styled, { up, css } from '@xstyled/styled-components'

export const Layout = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

export const LayoutHeader = styled.header`
  z-index: 10;
  position: absolute;
  top: 0;
  width: 100%;
`

export const LayoutMain = styled.mainBox`
  flex: 1 1 auto;
  padding-top: 60;

  ${up(
    'md',
    css`
      padding-top: 100;
    `,
  )}
`

export const LayoutFooter = styled.footer`
  flex: 0 0 auto;
`
