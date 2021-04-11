/* eslint-env node */

const defaultSiteUrl = 'https://jamtemplates.com'

const {
  NODE_ENV,
  URL: NETLIFY_SITE_URL = defaultSiteUrl,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env

const isNetlifyProduction = NETLIFY_ENV === 'production'

const siteUrl = isNetlifyProduction ? NETLIFY_SITE_URL : NETLIFY_DEPLOY_URL

const description =
  'Discover free curated Gatsby themes, starters and templates to build awesome Jamstack websites.'

module.exports = {
  siteMetadata: {
    siteUrl,
    canonicalUrl: siteUrl,
    description,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        resolveEnv: () => NETLIFY_ENV,
        env: {
          production: {
            policy: [{ userAgent: '*' }],
          },
          'branch-deploy': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
          'deploy-preview': {
            policy: [{ userAgent: '*', disallow: ['/'] }],
            sitemap: null,
            host: null,
          },
        },
      },
    },
    'gatsby-plugin-sitemap',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: { typeName: 'Template' },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `templates`,
        path: `${__dirname}/generated/templates`,
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md', '.markdown'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800,
              disableBgImageOnAlpha: true,
            },
          },
          { resolve: 'gatsby-remark-embedder' },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `mdxPages`,
        path: `${__dirname}/src/mdxPages`,
      },
    },
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        topLevelImportPaths: ['@xstyled/styled-components'],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        start_url: `/`,
        name: `JamTemplates`,
        short_name: `JamTemplates`,
        description,
        background_color: `#16171B`,
        theme_color: `#8aa5ff`,
        display: `standalone`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-154496255-4',
        anonymize: true,
      },
    },
  ],
}
