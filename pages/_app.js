/* eslint-disable react/no-danger */
/* eslint-env browser */
import App from 'next/app'
import React from 'react'
import Router from 'next/router'
import Head from 'next/head'
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
          <Head>
            <link
              rel="apple-touch-icon"
              sizes="57x57"
              href="/apple-icon-57x57.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="60x60"
              href="/apple-icon-60x60.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="72x72"
              href="/apple-icon-72x72.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="76x76"
              href="/apple-icon-76x76.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="114x114"
              href="/apple-icon-114x114.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="120x120"
              href="/apple-icon-120x120.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="144x144"
              href="/apple-icon-144x144.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="152x152"
              href="/apple-icon-152x152.png"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-icon-180x180.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="192x192"
              href="/android-icon-192x192.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="96x96"
              href="/favicon-96x96.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon-16x16.png"
            />
            <link rel="manifest" href="/manifest.json" />
            <meta name="msapplication-TileColor" content="#000" />
            <meta
              name="msapplication-TileImage"
              content="/ms-icon-144x144.png"
            />
            <meta name="theme-color" content="#000" />
          </Head>
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
