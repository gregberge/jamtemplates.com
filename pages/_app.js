/* eslint-disable react/no-danger */
/* eslint-env browser */
import App from 'next/app'
import React from 'react'
import Router from 'next/router'
import withGA from 'next-ga'
import { GlobalStyle } from '../components/GlobalStyle'
import { ThemeInitializer } from '../components/Theme'
import {
  Layout,
  LayoutHeader,
  LayoutMain,
  LayoutFooter,
} from '../components/Layout'
import { AppNavbar } from '../components/AppNavbar'
import { AppFooter } from '../components/AppFooter'
import { Seo } from '../components/Seo'

export default withGA(
  'UA-154496255-4',
  Router,
)(
  class MyApp extends App {
    render() {
      const { Component, pageProps } = this.props
      return (
        <ThemeInitializer>
          <Seo />
          <GlobalStyle />
          {!Component.blank ? (
            <Layout>
              <LayoutHeader>
                <AppNavbar />
              </LayoutHeader>
              <LayoutMain>
                <Component {...pageProps} />
              </LayoutMain>
              <LayoutFooter>
                <AppFooter />
              </LayoutFooter>
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </ThemeInitializer>
      )
    }
  },
)
