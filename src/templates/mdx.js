import React from 'react'
import { graphql } from 'gatsby'
import MDXRenderer from 'gatsby-plugin-mdx/mdx-renderer'
import styled from '@xstyled/styled-components'
import { Container } from '../components/Container'

const Content = styled(Container)`
  color: readme-text;
  font-size: 1.2em;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: lighter;
  }
`

export default function StaticPage({ data: { mdx } }) {
  return (
    <Content py={5} maxWidth={800}>
      <MDXRenderer>{mdx.body}</MDXRenderer>
    </Content>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    mdx(fields: { slug: { eq: $path } }) {
      body
    }
  }
`
