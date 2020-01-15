import wordpressLogo from '../images/cms/wordpress.svg'
import datoCMSLogo from '../images/cms/dato-cms.svg'
import netlifyCMSLogo from '../images/cms/netlify-cms.svg'
import contentfulLogo from '../images/cms/contentful.svg'
import markdownLogo from '../images/cms/markdown.svg'

export function getCMSInfos(name) {
  switch (name) {
    case 'Markdown':
      return {
        logo: markdownLogo,
        website: 'https://daringfireball.net/projects/markdown/syntax',
        title: 'Compatible with Markdown',
        features: ['This template uses only local files'],
      }
    case 'Wordpress':
      return {
        logo: wordpressLogo,
        website: 'https://www.wordpress.com/',
        title: 'Compatible with Wordpress',
        features: ['This template pulls content from Wordpress'],
      }
    case 'DatoCMS':
      return {
        logo: datoCMSLogo,
        website: 'https://www.datocms.com/',
        title: 'Compatible with DatoCMS',
        features: ['This template pulls content from DatoCMS'],
      }
    case 'NetlifyCMS':
      return {
        logo: netlifyCMSLogo,
        website: 'https://www.netlifycms.org/',
        title: 'Compatible with NetlifyCMS',
        features: ['This template pulls content from NetlifyCMS'],
      }
    case 'Contentful':
      return {
        logo: contentfulLogo,
        website: 'https://www.contentful.com/',
        title: 'Compatible with Contentful',
        features: ['This template pulls content from Contentful'],
      }
    default:
      return null
  }
}
