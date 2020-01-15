import styled from '@xstyled/styled-components'
import ReactMarkdown from 'react-markdown'

export const Markdown = styled(ReactMarkdown)`
  color: readme-text;
  line-height: 1.6;

  h1 {
    display: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: lighter;
  }

  img {
    max-width: 100%;
  }
`
