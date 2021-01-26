import React from 'react'
import styled, { Box } from '@xstyled/styled-components'
import { FiStar } from 'react-icons/fi'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { Card, CardBody, CardTitle } from '../components/Card'
import { Container } from '../components/Container'
import { Seo } from '../components/Seo'
import { Button } from '../components/Button'
import { Readme } from '../components/Readme'
import { trackLink } from '../components/Analytics'
import { getSSGInfos } from '../lib/ssg'
import { getCMSInfos } from '../lib/cms'

const Title = styled.h1`
  color: lighter;
  margin: 0;
`

const Author = styled.p`
  font-size: 16;
  margin: 0;
`

const Image = styled(Img)`
  margin: 3 0;
  width: 100%;
`

const SettingsList = styled.ul`
  padding: 0;
  margin: 2 0;
  list-style-type: none;
  font-size: 14;

  li {
    &:before {
      content: '✓';
      margin-right: 1;
    }
  }
`

const Counter = styled.div`
  text-align: center;
  padding: 3;
  font-size: 22;
  color: lighter;
`

const Price = styled.div`
  margin-bottom: 4;
  text-align: right;
  font-weight: 700;
  color: lighter;
  font-size: 22;
`

const License = styled.div`
  margin-bottom: 4;
  text-align: left;
  font-weight: 500;
  color: lighter;
  font-size: 20;
`

const Description = styled.p`
  font-size: 18;
  margin: 3 0;
`

export default function TemplateDetail({ data: { template } }) {
  return (
    <Container py={5}>
      <Seo
        title={`${template.title} - Free theme for Gatsby`}
        description={template.description}
        image={template.fields.screenshot.childImageSharp.social.src}
      />
      <Box row m={-3}>
        <Box col={{ xs: 1, md: 2 / 3 }} p={3}>
          <Title>{template.title}</Title>
          <Author>by {template.author}</Author>
          <Description>{template.description}</Description>
          <Image
            fluid={template.fields.screenshot.childImageSharp.fluid}
            alt={template.title}
          />
          <Readme template={template} />
        </Box>
        <Box col={{ xs: 1, md: 1 / 3 }} p={3}>
          <Box row m={-2}>
            <Box col={1} p={2}>
              <Card>
                <CardBody>
                  <Box row alignItems="center" m={-1}>
                    <Box col p={1}>
                      <License>{template.license} License</License>
                    </Box>
                    <Box col="auto" p={1}>
                      <Price>Free</Price>
                    </Box>
                  </Box>
                  <Button
                    as="a"
                    href={template.demoUrl}
                    my={2}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
                    onClick={trackLink(
                      'template',
                      'preview',
                      template.fields.slug,
                    )}
                  >
                    Preview
                  </Button>
                  <Button
                    as="a"
                    href={template.repoUrl}
                    my={2}
                    variant="accent"
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
                    onClick={trackLink('template', 'get', template.fields.slug)}
                  >
                    Get
                  </Button>
                </CardBody>
              </Card>
            </Box>
            <Box col={1} p={2}>
              <Card>
                <a
                  href={template.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Counter>
                    <FiStar style={{ fontSize: '0.8em' }} />{' '}
                    {template.starsCount} stars
                  </Counter>
                </a>
              </Card>
            </Box>
            <Box col={1} p={2}>
              <Card>
                <CardBody textAlign="center">
                  <CardTitle mb={3}>Deploy theme in one click</CardTitle>
                  <a
                    href={`https://app.netlify.com/start/deploy?repository=${template.repoUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      alt="Deploy to netlify"
                      src="https://www.netlify.com/img/deploy/button.svg"
                      width={146}
                      height={32}
                    />
                  </a>
                </CardBody>
              </Card>
            </Box>
            {template.ssg.map((name, index) => {
              const infos = getSSGInfos(name, template)
              if (!infos) return null
              return (
                <Box key={index} col={1} p={2}>
                  <Card>
                    <CardBody>
                      <Box textAlign="center" mb={2}>
                        <a href={infos.website} rel="noopener noreferrer">
                          <img src={infos.logo} alt={name} width={72} />
                        </a>
                      </Box>
                      <CardTitle textAlign="center">{name} template</CardTitle>
                      <SettingsList>
                        {infos.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </SettingsList>
                    </CardBody>
                  </Card>
                </Box>
              )
            })}
            {template.cms.map((name, index) => {
              const infos = getCMSInfos(name, template)
              if (!infos) return null
              return (
                <Box key={index} col={1} p={2}>
                  <Card>
                    <CardBody>
                      <Box textAlign="center" mb={2}>
                        <a href={infos.website} rel="noopener noreferrer">
                          <img src={infos.logo} alt={name} width={72} />
                        </a>
                      </Box>
                      <CardTitle textAlign="center">{infos.title}</CardTitle>
                      {infos.features && infos.features.length > 0 && (
                        <SettingsList>
                          {infos.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </SettingsList>
                      )}
                    </CardBody>
                  </Card>
                </Box>
              )
            })}
          </Box>
        </Box>
      </Box>
    </Container>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    template(fields: { slug: { eq: $path } }) {
      id
      title
      author
      description
      starsCount
      demoUrl
      repoUrl
      license
      ssg
      cms
      gatsby {
        version
        type
      }
      github {
        owner
        repo
        branch
        readmeContent
      }
      fields {
        slug
        screenshot {
          childImageSharp {
            social: fixed(width: 1280, height: 640) {
              src
            }
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`
