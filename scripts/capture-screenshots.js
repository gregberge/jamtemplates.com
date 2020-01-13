#!/usr/bin/env node

/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const Pageres = require('pageres')
const fs = require('fs')
const path = require('path')
const yamlFront = require('yaml-front-matter')
const gh = require('parse-github-url')

// Increase listeners limit
process.setMaxListeners(1000)

const THEME_FOLDER = path.join(__dirname, '../content/theme')
const DEST_FOLDER = path.join(__dirname, '../assets/images/capture')
const THEME_FILES = fs.readdirSync(THEME_FOLDER)

console.log('******************')
console.log('Taking Screenshots')
console.log('******************')

function captureTheme(pageRes, theme) {
  const data = fs.readFileSync(path.join(THEME_FOLDER, theme))
  const frontmatter = yamlFront.loadFront(data)
  const github = gh(frontmatter.github)
  const branch = frontmatter.github_branch

  if (frontmatter.disabled || !github) {
    return pageRes
  }

  const themeKey = `${github.repo.replace('/', '-').toLowerCase()}-${branch}`
  const filename = `${themeKey}.jpg`

  if (fs.existsSync(path.join(DEST_FOLDER, filename))) {
    console.log(`${theme} skipped`)
    return pageRes
  }

  console.log(`${theme} capturing`)
  return pageRes.src(frontmatter.demo, ['1024x768'], {
    crop: true,
    scale: 2,
    filename: themeKey,
  })
}

async function captureAll() {
  return THEME_FILES.reduce(
    captureTheme,
    new Pageres({
      delay: 2,
      format: 'jpg',
    }),
  )
    .dest(DEST_FOLDER)
    .run()
}

captureAll().catch(error => {
  setTimeout(() => {
    throw error
  })
})
