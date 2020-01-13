import React from 'react'
import styled, { css } from '@xstyled/styled-components'

export function container() {
  return css`
    width: 100%;
    max-width: container-base;
    padding-left: 4;
    padding-right: 4;
    margin: 0 auto;
  `
}

export const Container = styled.box(container)

export function PageContainer(props) {
  return <Container pt={{ xs: 120, md: 8 }} pb={5} {...props} />
}
