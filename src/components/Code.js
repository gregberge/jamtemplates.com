/* eslint-disable react/jsx-key */
import React from 'react'
import styled, { css, up } from '@xstyled/styled-components'
import Highlight, { defaultProps } from 'prism-react-renderer'
import prismTheme from 'prism-react-renderer/themes/duotoneDark'

const Editor = styled.div`
  pre {
    padding: 3 4;
    overflow-y: auto;
    border-radius: base;
    overflow-wrap: normal;
    word-wrap: normal;
    position: relative;
  }

  > textarea:focus {
    outline: none;
  }

  ${up(
    'sm',
    css`
      border-radius: 3;
    `,
  )}
`

const globalModules = {
  react: 'React',
}

export function LiveConfig({ modules }) {
  Object.assign(globalModules, modules)
  return null
}

export function Code({ children, language = 'markup' }) {
  return (
    <Editor>
      <Highlight
        {...defaultProps}
        code={children.trim()}
        language={language}
        theme={prismTheme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Editor>
  )
}
