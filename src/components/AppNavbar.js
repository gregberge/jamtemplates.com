import React from 'react'
import { Link } from 'gatsby'
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
        </NavbarBrand>
      </NavbarBrandLink>
      <NavbarSecondary>
        <NavbarLink href="https://github.com/gregberge/jamtemplates.com#submit-a-theme">
          Submit theme
        </NavbarLink>
      </NavbarSecondary>
    </Navbar>
  )
}
