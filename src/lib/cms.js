import wordpressLogo from '../images/cms/wordpress.svg'
import datoCMSLogo from '../images/cms/dato-cms.svg'
import netlifyCMSLogo from '../images/cms/netlify-cms.svg'
import contentfulLogo from '../images/cms/contentful.svg'
import noCMSLogo from '../images/cms/no-cms.svg'

export function getCMSInfos(name) {
  switch (name) {
    case 'No CMS':
      return {
        logo: noCMSLogo,
        title: 'No CMS required',
        features: ['This template use only local files'],
      }
    case 'Wordpress':
      return {
        logo: wordpressLogo,
        website: 'https://www.wordpress.com/',
        title: 'Compatible with Wordpress',
      }
    case 'DatoCMS':
      return {
        logo: datoCMSLogo,
        website: 'https://www.datocms.com/',
        title: 'Compatible with DatoCMS',
      }
    case 'NetlifyCMS':
      return {
        logo: netlifyCMSLogo,
        website: 'https://www.netlifycms.org/',
        title: 'Compatible with NetlifyCMS',
      }
    case 'Contentful':
      return {
        logo: contentfulLogo,
        website: 'https://www.contentful.com/',
        title: 'Compatible with Contentful',
      }
    default:
      return null
  }
}
