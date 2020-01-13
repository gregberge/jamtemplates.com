import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import socialImage from '../assets/images/social.jpg'

const canonicalUrl = 'https://jamtemplates.com'
const defaultTitle = 'Free themes for Gatsby - Jamtemplates'
const defaultDescription =
  'Discover free curated Gatsby themes, starters and templates to build awesome Jamstack websites.'
const defaultImage = socialImage

export function Seo({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
}) {
  const router = useRouter()
  const url = `${canonicalUrl}${router.pathname}`
  return (
    <>
      <Head>
        {/* General tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="image" content={`${canonicalUrl}${image}`} />
        <link rel="canonical" href={url} />

        {/* OpenGraph tags */}
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={`${canonicalUrl}${image}`} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${canonicalUrl}${image}`} />
      </Head>
    </>
  )
}
