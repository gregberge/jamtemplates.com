import React from 'react'
import styled, { th, up, css } from '@xstyled/styled-components'

const StyledBurger = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20;
  height: 18;
  appearance: none;
  background: transparent;
  border: 0;
  padding: 0;
  transition: base;
  transition-property: opacity;

  &:focus {
    opacity: 0.5;
    outline: none;
  }

  span {
    width: 20;
    height: 2;
    background-color: lighter;
    transition: base;
    transition-property: all;
    position: relative;

    :nth-child(2) {
      opacity: 1;
    }
  }

  &[aria-expanded='true'] {
    span {
      :first-child {
        transform: translateY(${th.px('6rpx')}) rotate(45deg);
      }
      :nth-child(2) {
        opacity: 0;
        transform: translateX(${th.px(10)});
      }
      :nth-child(3) {
        transform: translateY(${th.px('-6rpx')}) rotate(-45deg);
      }
    }
  }

  ${up(
    'md',
    css`
      display: none;
    `,
  )}
`

export const Burger = React.forwardRef((props, ref) => {
  return (
    <StyledBurger ref={ref} {...props}>
      <span />
      <span />
      <span />
    </StyledBurger>
  )
})
