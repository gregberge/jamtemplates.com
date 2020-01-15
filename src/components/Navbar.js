import React from 'react'
import styled, { css, up } from '@xstyled/styled-components'
import { useDialogState, Dialog, DialogDisclosure } from 'reakit/Dialog'
import { Container } from './Container'
import { Burger } from './Burger'

export const Nav = styled.nav`
  padding: 3 0;
  margin: 0 auto;
  position: fixed;
  background-color: navbar-bg;
  box-shadow: soft;
  top: 0;
  left: 0;
  right: 0;
  height: 60;
  z-index: 200;
  backdrop-filter: blur(8px);

  ${up(
    'md',
    css`
      position: initial;
      height: 100;
      display: flex;
      align-items: center;
      background-color: transparent;
      box-shadow: none;
      backdrop-filter: none;
    `,
  )}
`

export const NavbarBrandLink = styled.a`
  flex: 0 0 auto;
  cursor: pointer;
  transition: base;
  color: white;

  &:hover,
  &:focus {
    color: accent;
    outline: none;
  }
`

export const NavbarBrand = styled.div`
  margin: 0;

  > svg {
    width: 220;
  }
`

export const NavbarSecondary = styled.div`
  display: none;

  ${up(
    'md',
    css`
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    `,
  )}
`

export const NavbarLink = styled.a`
  display: block;
  margin: 3 3;
  font-size: 20;
  font-weight: 500;
  color: white;
  transition: base;

  &:focus,
  &:hover {
    color: accent;
    outline: none;
  }

  ${up(
    'md',
    css`
      margin: 0 3;
      font-size: 18;
    `,
  )}
`

const MobileMenuContainer = styled.div`
  position: fixed;
  background-color: navbar-bg;
  backdrop-filter: blur(8px);
  top: 60;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 3 0;
  overflow: auto;

  &:focus {
    outline: none;
  }

  &[data-animated] {
    transition: 300ms ease-out;
    transition-property: opacity, transform;

    &[data-animating='true'] {
      opacity: 1;
      transform: translateY(0);

      &.hidden {
        opacity: 0;
        transform: translateX(-30vw);
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

function MobileMenu({ children, ...props }) {
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    setShow(true)
  }, [])
  const handleClick = event => {
    if (event.target.tagName === 'A') {
      props.hide()
    }
  }

  if (!show) return null
  return (
    <Dialog
      onClick={handleClick}
      aria-label="Menu"
      data-animated={props.unstable_animated}
      data-animating={props.unstable_animating}
      {...props}
    >
      {dialogProps => (
        <MobileMenuContainer
          {...dialogProps}
          onTransitionEnd={event => {
            if (
              event.target &&
              event.target.dataset &&
              event.target.dataset.animated
            ) {
              dialogProps.onTransitionEnd(event)
            }
          }}
        >
          <Container height="100%" display="flex" flexDirection="column">
            {children}
          </Container>
        </MobileMenuContainer>
      )}
    </Dialog>
  )
}

function MobileMenuDisclosure(props) {
  return <DialogDisclosure aria-label="Toggle menu" as={Burger} {...props} />
}

export function Navbar({ children }) {
  const dialog = useDialogState({ unstable_animated: true, visible: false })
  const childrenArray = React.Children.toArray(children)
  const secondary = childrenArray.find(child => child.type === NavbarSecondary)
  return (
    <Nav>
      <MobileMenu {...dialog}>{secondary.props.children}</MobileMenu>
      <Container
        display="flex"
        alignItems="center"
        justifyContent={{ xs: 'space-between', md: 'flex-start' }}
      >
        {children}
        <MobileMenuDisclosure {...dialog} />
      </Container>
    </Nav>
  )
}
