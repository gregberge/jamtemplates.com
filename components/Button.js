import styled, { css, th } from '@xstyled/styled-components'

export const Button = styled.buttonBox(p => {
  const color = th.color(p.variant || 'primary')
  return css`
    appearance: none;
    display: inline-block;
    border: 1px solid;
    border-color: ${color};
    background-color: transparent;
    color: ${color};
    text-align: center;
    cursor: pointer;
    padding: 2 3;
    margin: 0;
    font-size: 12;
    line-height: 1.4;
    font-weight: 700;
    text-decoration: none;
    border-radius: base;
    transition: base;

    &:hover {
      background-color: ${color};
      color: darker;
    }
  `
})
