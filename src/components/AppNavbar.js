import React from 'react'
import { Link } from 'gatsby'
import { VisuallyHidden } from 'reakit/VisuallyHidden'
import {
  Navbar,
  NavbarBrand,
  NavbarBrandLink,
  NavbarSecondary,
  NavbarLink,
} from './Navbar'
import { BrandLogo } from './BrandLogo'

export function AppNavbar() {
  return (
    <Navbar>
      <NavbarBrandLink as={Link} to="/">
        <NavbarBrand>
          <BrandLogo />
          <VisuallyHidden>JamTemplates</VisuallyHidden>
        </NavbarBrand>
      </NavbarBrandLink>
      <NavbarSecondary>
        <NavbarLink as={Link} to="/about">
          About
        </NavbarLink>
        <NavbarLink href="https://github.com/gregberge/jamtemplates.com#submit-a-theme">
          Submit theme
        </NavbarLink>
      </NavbarSecondary>
    </Navbar>
  )
}
