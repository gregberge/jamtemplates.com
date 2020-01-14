import styled from '@xstyled/styled-components'
import { container } from './Container'
import bgImage from '../images/bg-image.svg'

export const Hero = styled.section`
  ${container()}

  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500;
  z-index: 1;

  h1 {
    max-width: 500;
    color: lighter;
    font-size: 48;
    margin: 0;
  }

  p {
    max-width: 500;
    font-size: 24;
  }

  &:after {
    content: '';
    position: absolute;
    width: 100%;
    max-width: 100%;
    height: 612;
    background-image: url(${bgImage});
    background-repeat: no-repeat;
    background-size: auto;
    left: 50%;
    top: 0;
    background-position: 60% top;
    transform: translate(-50%);
    z-index: -1;
  }
`
