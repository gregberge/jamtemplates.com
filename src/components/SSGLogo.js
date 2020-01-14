import React from 'react'
import { Box } from '@xstyled/styled-components'
import gatsbyLogo from '../images/ssg/gatsby.svg'
import nextjsLogo from '../images/ssg/next-js.svg'

function getSrc(name) {
  switch (name) {
    case 'Gatsby':
      return gatsbyLogo
    case 'Next.js':
      return nextjsLogo
    default:
      return null
  }
}

export function SSGLogo({ name, ...props }) {
  const src = getSrc(name)
  if (!src) return null
  return <Box forwardedAs="img" src={getSrc(name)} {...props} />
}
