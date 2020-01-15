import React from 'react'
import gatsbyLogo from '../images/ssg/gatsby.svg'

export function getSSGInfos(name, template) {
  switch (name) {
    case 'Gatsby':
      return {
        logo: gatsbyLogo,
        website: 'https://www.gatsbyjs.com/',
        features: [
          <>Compatible with Gatsby v{template.gatsby.version}</>,
          <>It is a Gatsby {template.gatsby.type}</>,
        ],
      }
    default:
      return null
  }
}
