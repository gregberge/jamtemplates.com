import React from 'react'
import Link from 'next/link'
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
      <Link passHref href="/">
        <NavbarBrandLink>
          <NavbarBrand>
            <BrandLogo />
          </NavbarBrand>
        </NavbarBrandLink>
      </Link>
      <NavbarSecondary>
        <NavbarLink href="https://github.com/gregberge/jamtemplates.com#submit-a-theme">
          Submit theme
        </NavbarLink>
      </NavbarSecondary>
    </Navbar>
  )
}
