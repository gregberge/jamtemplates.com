import React from 'react'
import styled from '@xstyled/styled-components'
import Markdown from 'react-markdown'
import remarkEmoji from 'remark-emoji'
import remarkSlug from 'remark-slug'
import GithubSlugger from 'github-slugger'
import { Card, CardBody } from './Card'
import { Code } from './Code'

const StyledMarkdown = styled(Markdown)`
  color: readme-text;
  line-height: 1.6;

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

const InlineCode = styled.code`
  background-color: rgba(0, 0, 0, 0.2);
  padding: 2rpx 4rpx;
  border-radius: base;
  line-height: 1.4;
`

function linkTarget(url) {
  if (url.startsWith('#')) return null
  return '_blank'
}

const plugins = [remarkEmoji, remarkSlug]

export function Readme({ template }) {
  const slugger = new GithubSlugger()
  const renderers = {
    code: ({ language, value }) => <Code language={language}>{value}</Code>,
    inlineCode: ({ children }) => <InlineCode>{children}</InlineCode>,
    heading: props => {
      if (props.level === 1) return null
      const text = props.children
        .map(child => child.props.children)
        .filter(x => typeof x === 'string')
        .join('')
      const id = slugger.slug(text)
      const Tag = `h${props.level}`
      return <Tag id={id}>{props.children}</Tag>
    },
  }
  function transformImageUri(uri) {
    if (uri.startsWith(template.repoUrl)) {
      return uri
        .replace('https://github.com', 'https://raw.githubusercontent.com')
        .replace('/blob/', '/')
    }
    if (!uri.startsWith('/') && !uri.startsWith('http')) {
      return `https://raw.githubusercontent.com/${template.github.owner}/${template.github.repo}/${template.github.branch}/${uri}`
    }
    if (uri.startsWith('http://')) {
      return uri.replace('http://', 'https://')
    }
    return uri
  }
  return (
    <Card>
      <CardBody>
        <StyledMarkdown
          skipHtml
          linkTarget={linkTarget}
          renderers={renderers}
          transformImageUri={transformImageUri}
          plugins={plugins}
        >
          {template.github.readmeContent}
        </StyledMarkdown>
      </CardBody>
    </Card>
  )
}
