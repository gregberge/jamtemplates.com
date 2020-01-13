import React from 'react'
import styled, { Box, up, css } from '@xstyled/styled-components'
import { FiStar } from 'react-icons/fi'
import ReactGA from 'react-ga'
import { Card, CardBody, CardTitle } from '../../components/Card'
import { Container } from '../../components/Container'
import { Seo } from '../../components/Seo'
import { SSGLogo } from '../../components/SSGLogo'
import { Button } from '../../components/Button'
import { Readme } from '../../components/Readme'
import { getTemplateImageSrc } from '../../components/TemplateImage'

const Title = styled.h1`
  color: lighter;
  margin: 0;
`

const Author = styled.p`
  font-size: 16;
  margin: 0;
`

const Image = styled.img`
  margin: 3 0;
  width: 100%;
  height: 200;
  object-fit: cover;
  object-position: top;

  ${up(
    'md',
    css`
      height: 400;
    `,
  )}
`

const SettingsList = styled.ul`
  padding: 0;
  margin: 2 0;
  list-style-type: none;
  font-size: 14;

  li {
    &:before {
      content: '✔';
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

export default function TemplateDetail({ template }) {
  return (
    <Container py={5}>
      <Seo
        title={`${template.title} - Free theme for Gatsby`}
        description={template.description}
        image={getTemplateImageSrc(template, 'xl')}
      />
      <Box row m={-3}>
        <Box col={{ xs: 1, md: 2 / 3 }} p={3}>
          <Title>{template.title}</Title>
          <Author>by {template.author}</Author>
          <Description>{template.description}</Description>
          <Image
            src={getTemplateImageSrc(template, 'xl')}
            alt={template.title}
          />
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
                    forwardedAs="a"
                    href={template.demo}
                    my={2}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
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
                  <Button
                    forwardedAs="a"
                    href={template.repoUrl}
                    my={2}
                    variant="accent"
                    target="_blank"
                    rel="noopener noreferrer"
                    display="block"
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
                    <FiStar style={{ fontSize: '0.8em' }} /> {template.stars}{' '}
                    stars
                  </Counter>
                </a>
              </Card>
            </Box>
            {template.gatsby && (
              <Box col={1} p={2}>
                <Card>
                  <CardBody>
                    <Box textAlign="center" mb={2}>
                      <SSGLogo name="Gatsby" width={72} />
                    </Box>
                    <CardTitle>Features</CardTitle>
                    <SettingsList>
                      <li>Compatible with Gatsby v{template.gatsby.version}</li>
                      <li>Gatsby {template.gatsby.type}</li>
                    </SettingsList>
                  </CardBody>
                </Card>
              </Box>
            )}
          </Box>
        </Box>
        <Box col={{ xs: 1, md: 2 / 3 }} p={3}>
          <Readme template={template} />
        </Box>
      </Box>
    </Container>
  )
}

// eslint-disable-next-line camelcase
export async function unstable_getStaticProps({ params: { slug } }) {
  const { getTheme } = await import('../../lib/themes')
  return { props: { template: getTheme(slug) } }
}
