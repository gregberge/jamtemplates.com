import styled, { th } from '@xstyled/styled-components'

export const Card = styled.box`
  background-color: card-bg;
  /* box-shadow: ${th.px(5)} ${th.px(5)} ${th.px(
  15,
)} rgba(255, 255, 255, 0.12); */
  border-radius: base;
  overflow: hidden;
`

export const CardLink = styled.a`
  ${Card} {
    transition: base;
  }

  &:focus {
    outline: none;
  }

  &:focus > ${Card}, &:hover > ${Card} {
    transform: translateY(${th.px(-3)}) scale(1.03);
    box-shadow: ${th.px(7)} ${th.px(7)} ${th.px(36)} rgba(0, 0, 0, 0.12);
    border-color: card-border-hover;
    outline: 0;
  }
`

export const CardImg = styled.img`
  display: block;
  object-fit: cover;
  width: 100%;
`

export const CardBody = styled.box`
  padding: 3;
`

export const CardTitle = styled.h3Box`
  font-size: 18;
  margin: 0;
  color: lighter;
`
