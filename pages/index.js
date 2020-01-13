import React from 'react'
import { Box } from '@xstyled/styled-components'
import { FiStar } from 'react-icons/fi'
import ReactGA from 'react-ga'
import Link from 'next/link'
import { Card, CardImg, CardBody, CardTitle } from '../components/Card'
import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Button } from '../components/Button'
import { getTemplateImageSrc } from '../components/TemplateImage'

export default function IndexPage({ featuredTemplates }) {
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
        <Box row m={-3} justifyContent="center">
          {featuredTemplates.map(template => (
            <Box key={template.theme_key} col={{ xs: 1, md: 1 / 3 }} p={3}>
              <Card>
                <Link
                  passHref
                  href="/themes/[slug]"
                  as={`/themes/${template.theme_key}`}
                >
                  <a>
                    <CardImg
                      height={200}
                      src={getTemplateImageSrc(template, 'sm')}
                      alt={template.title}
                    />
                  </a>
                </Link>
                <CardBody>
                  <Box row>
                    <Box col>
                      <Link
                        passHref
                        href="/themes/[slug]"
                        as={`/themes/${template.theme_key}`}
                      >
                        <a>
                          <CardTitle>{template.title}</CardTitle>
                        </a>
                      </Link>
                      <Box forwardedAs="p" m={0} fontSize={14}>
                        by {template.author}
                      </Box>
                    </Box>
                    <Box col="auto" color="lighter" fontSize={18}>
                      <FiStar style={{ fontSize: '0.8em' }} /> {template.stars}
                    </Box>
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
                            href={template.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              ReactGA.event({
                                category: 'theme',
                                action: 'preview',
                                label: template.theme_key,
                              })
                            }
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
                            onClick={() =>
                              ReactGA.event({
                                category: 'theme',
                                action: 'get',
                                label: template.theme_key,
                              })
                            }
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

// eslint-disable-next-line camelcase
export async function unstable_getStaticProps() {
  const { getFeaturedThemes } = await import('../lib/themes')
  return { props: { featuredTemplates: getFeaturedThemes() } }
}
