import React from 'react'
import { graphql, Link } from 'gatsby'
import { x } from '@xstyled/styled-components'
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
      <Container as="section" my={5}>
        <x.div row m={-3}>
          {data.allTemplate.edges.map(({ node: template }) => (
            <x.div key={template.id} col={{ xs: 1, md: 1 / 3 }} p={3}>
              <Card>
                <Link to={template.fields.slug}>
                  <CardImg
                    as={Img}
                    fluid={template.fields.screenshot.childImageSharp.fluid}
                    alt={template.title}
                  />
                </Link>
                <CardBody>
                  <x.div row>
                    <x.div col>
                      <Link to={template.fields.slug}>
                        <CardTitle>{template.title}</CardTitle>
                      </Link>
                      <x.p m={0} fontSize={14}>
                        by {template.author}
                      </x.p>
                    </x.div>
                    <x.div col="auto" color="lighter" fontSize={18}>
                      <FiStar style={{ fontSize: '0.8em' }} />{' '}
                      {template.starsCount}
                    </x.div>
                  </x.div>
                  <x.div row mx={-1} my={2}>
                    {template.ssg.map((name) => {
                      const infos = getSSGInfos(name, template)
                      if (!infos) return null
                      return (
                        <x.img
                          key={name}
                          col="auto"
                          px={1}
                          height={24}
                          src={infos.logo}
                          alt={name}
                          title={name}
                        />
                      )
                    })}
                    {template.cms.map((name) => {
                      const infos = getCMSInfos(name, template)
                      if (!infos) return null
                      return (
                        <x.img
                          key={name}
                          col="auto"
                          px={1}
                          height={24}
                          src={infos.logo}
                          alt={name}
                          title={name}
                        />
                      )
                    })}
                  </x.div>

                  <x.div row mt={3}>
                    <x.div col fontSize={20} fontWeight={500} color="lighter">
                      Free
                    </x.div>
                    <x.div col="auto">
                      <x.div row mx={-1}>
                        <x.div col="auto" px={1}>
                          <Button
                            as="a"
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
                        </x.div>
                        <x.div col="auto" px={1}>
                          <Button
                            as="a"
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
                        </x.div>
                      </x.div>
                    </x.div>
                  </x.div>
                </CardBody>
              </Card>
            </x.div>
          ))}
        </x.div>
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
