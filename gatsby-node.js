const slugify = require('slugify')

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Template`) {
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
      }
    `,
  )

  // Create blog posts pages.
  result.data.allTemplate.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: require.resolve('./src/templates/template.js'),
      context: {
        id: node.id,
      },
    })
  })
}
