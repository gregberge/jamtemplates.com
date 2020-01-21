import React from 'react'
import { graphql, Link } from 'gatsby'
import { Box } from '@xstyled/styled-components'
import { FiStar } from 'react-icons/fi'
import Img from 'gatsby-image'
import { Card, CardImg, CardBody, CardTitle } from '../components/Card'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { trackLink } from '../components/Analytics'
import { getSSGInfos } from '../lib/ssg'
import { getCMSInfos } from '../lib/cms'

export default function IndexPage({ data }) {
  return (
    <>
      <Hero>
        <h1>
          Beautiful Themes <br />
          for Gatsby
        </h1>
        <p>
          A curated collection of free templates to build applications using{' '}
          <a href="http://gatsbyjs.com/">Gatsby</a> and{' '}
          <a href="https://jamstack.org/">JamStack</a>.
        </p>
      </Hero>
      <Container forwardedAs="section" my={5}>
        <Box row m={-3} justifyContent="left">
          {data.allTemplate.edges.map(({ node: template }) => (
            <Box key={template.id} col={{ xs: 1, md: 1 / 3 }} p={3}>
              <Card>
                <Link to={template.fields.slug}>
                  <CardImg
                    as={Img}
                    fluid={template.fields.screenshot.childImageSharp.fluid}
                    alt={template.title}
                  />
                </Link>
                <CardBody>
                  <Box row>
                    <Box col>
                      <Link to={template.fields.slug}>
                        <CardTitle>{template.title}</CardTitle>
                      </Link>
                      <Box forwardedAs="p" m={0} fontSize={14}>
                        by {template.author}
                      </Box>
                    </Box>
                    <Box col="auto" color="lighter" fontSize={18}>
                      <FiStar style={{ fontSize: '0.8em' }} />{' '}
                      {template.starsCount}
                    </Box>
                  </Box>
                  <Box row mx={-1} my={2}>
                    {template.ssg.map(name => {
                      const infos = getSSGInfos(name, template)
                      if (!infos) return null
                      return (
                        <Box
                          col="auto"
                          px={1}
                          forwardedAs="img"
                          height={24}
                          src={infos.logo}
                          alt={name}
                          title={name}
                        />
                      )
                    })}
                    {template.cms.map(name => {
                      const infos = getCMSInfos(name, template)
                      if (!infos) return null
                      return (
                        <Box
                          col="auto"
                          px={1}
                          forwardedAs="img"
                          height={24}
                          src={infos.logo}
                          alt={name}
                          title={name}
                        />
                      )
                    })}
                  </Box>

                  <Box row mt={3}>
                    <Box col fontSize={20} fontWeight={500} color="lighter">
                      Free
                    </Box>
                    <Box col="auto">
                      <Box row mx={-1}>
                        <Box col="auto" px={1}>
                          <Button
                            forwardedAs="a"
                            href={template.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={trackLink(
                              'template',
                              'preview',
                              template.fields.slug,
                            )}
                          >
                            Preview
                          </Button>
                        </Box>
                        <Box col="auto" px={1}>
                          <Button
                            forwardedAs="a"
                            variant="accent"
                            href={template.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={trackLink(
                              'theme',
                              'get',
                              template.fields.slug,
                            )}
                          >
                            Get
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </CardBody>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  )
}

export const pageQuery = graphql`
  query {
    allTemplate(sort: { fields: [starsCount], order: DESC }) {
      edges {
        node {
          id
          title
          author
          starsCount
          demoUrl
          repoUrl
          ssg
          cms
          gatsby {
            version
            type
          }
          fields {
            slug
            screenshot {
              childImageSharp {
                fluid(maxWidth: 370) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`
