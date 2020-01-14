import React from 'react'
import { Helmet } from 'react-helmet'
import { GlobalStyle } from './GlobalStyle'
import { ThemeInitializer } from './Theme'
import { Layout, LayoutHeader, LayoutMain, LayoutFooter } from './Layout'
import { AppNavbar } from './AppNavbar'
import { AppFooter } from './AppFooter'
import { Seo } from './Seo'

export function AppLayout({ children }) {
  return (
    <ThemeInitializer>
      <Helmet>
        <html lang="en" />
      </Helmet>
      <Seo />
      <GlobalStyle />
      <Layout>
        <LayoutHeader>
          <AppNavbar />
        </LayoutHeader>
        <LayoutMain>{children}</LayoutMain>
        <LayoutFooter>
          <AppFooter />
        </LayoutFooter>
      </Layout>
    </ThemeInitializer>
  )
}
