/* eslint-env node */

const slugify = require('slugify')
const { createFilePath } = require('gatsby-source-filesystem')

exports.onCreateNode = ({ getNode, node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Template') {
    createNodeField({
      name: 'screenshot',
      node,
      value: 'screenshot.jpg',
    })

    createNodeField({
      name: 'slug',
      node,
      value: `/templates/${slugify(node.title).toLowerCase()}`,
    })
  }

  if (node.internal.type === 'Mdx') {
    createNodeField({
      name: 'slug',
      node,
      value: createFilePath({ node, getNode }),
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allTemplate {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
        allMdx {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `,
  )

  // Create static pages
  result.data.allMdx.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: require.resolve('./src/templates/mdx.js'),
      context: {},
    })
  })

  // Create template pages
  result.data.allTemplate.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: require.resolve('./src/templates/template.js'),
      context: {},
    })
  })
}
