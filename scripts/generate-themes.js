#!/usr/bin/env node
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */

const fs = require('fs')
const path = require('path')
const yamlFront = require('yaml-front-matter')
const gh = require('parse-github-url')
const axios = require('axios')
const allSettled = require('promise.allsettled')
const rateLimit = require('axios-rate-limit')
// const isBefore = require('date-fns/isBefore')
// const parseISO = require('date-fns/parseISO')
// const subYears = require('date-fns/subYears')
const { argv } = require('yargs')

const themesDataFile = path.join(__dirname, '../data/themes.json')
const themesContentFolder = path.join(__dirname, '../content/theme')

const themesFiles = fs
  .readdirSync(themesContentFolder)
  .filter(file => file.match(/\.md$/))
const themesData = fs.existsSync(themesDataFile)
  ? JSON.parse(fs.readFileSync(themesDataFile))
  : {}
const githubErrors = {}

const token = process.env.GITHUB_TOKEN
const axiosLimit = rateLimit(axios.create(), {
  maxRequests: 2,
  perMilliseconds: 100,
})

// Set this to the date you want to consider themes stale if there have
// been no commits since.
// const staleBeforeDate = subYears(new Date(), 1)

console.log('***********************************')
console.log('fetching Github data for each theme')
console.log('***********************************')
console.log(`themesDataFile ${themesDataFile}`)
console.log(`themesContentFolder ${themesContentFolder}\n`)

const loadThemeFrontMatter = file => {
  const fileData = fs.readFileSync(path.join(themesContentFolder, file))
  const frontmatter = yamlFront.loadFront(fileData)

  try {
    const {
      draft,
      disabled,
      title,
      demo,
      author,
      ssg,
      cms,
      gatsby,
      license,
      description,
    } = frontmatter
    const repoUrl = frontmatter.github
    const repoName = gh(frontmatter.github).repo // stackbithq/stackbit-theme-fresh
    const branch = frontmatter.github_branch
    const themeKey = `${repoName.replace('/', '-').toLowerCase()}-${branch}`
    return {
      file,
      repoUrl,
      repoName,
      branch,
      themeKey,
      disabled,
      draft,
      title,
      demo,
      author,
      ssg,
      cms,
      gatsby,
      license,
      description,
    }
  } catch (error) {
    console.error(error)
    throw new Error(`${file} invalid github frontmatter`)
  }
}

// const getBranchCommit = theme => {
//   return axiosLimit
//     .get(
//       `https://api.github.com/repos/${theme.repoName}/branches/${theme.branch}`,
//       {
//         headers: {
//           Authorization: `Token ${token}`,
//         },
//       },
//     )
//     .then(res => {
//       const lastCommit = res.data.commit.commit.author.date
//       console.log(`${theme.file} => last commit ${theme.branch} ${lastCommit}`)
//       themesData[theme.themeKey].last_commit = lastCommit
//       themesData[theme.themeKey].stale = isBefore(
//         parseISO(lastCommit),
//         staleBeforeDate,
//       )
//       return lastCommit
//     })
//     .catch(err => {
//       console.log(theme.file, err.message)
//       githubErrors[theme.repo] = {
//         file: theme.file,
//         repoUrl: theme.repoUrl,
//         error: err.response.data,
//       }
//       throw err
//     })
// }

async function getThemeGithubData(theme) {
  try {
    const [{ data: repo }, { data: readme }] = await Promise.all([
      axiosLimit.get(`https://api.github.com/repos/${theme.repoName}`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      axiosLimit.get(`https://api.github.com/repos/${theme.repoName}/readme`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    ])
    const readmeContent = Buffer.from(readme.content, 'base64').toString(
      'utf-8',
    )
    console.log(`${theme.file} => ${repo.html_url} - OK`)
    const defaultBranch = theme.branch ? theme.branch : repo.default_branch
    const themeKey = `${theme.repoName
      .replace('/', '-')
      .toLowerCase()}-${defaultBranch}`
    themesData[themeKey] = {
      ...theme,
      theme_key: themeKey,
      file: theme.file,
      name: repo.name,
      github_username: repo.owner.login,
      repo: repo.full_name,
      branch: defaultBranch,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      open_issues: repo.open_issues_count,
      last_commit: repo.updated_at,
      created_at: repo.created_at,
      description: theme.description,
      readmeContent,
    }
    return themesData[themeKey]
  } catch (err) {
    console.log(theme.file, err.message)
    githubErrors[theme.repoName] = {
      file: theme.file,
      repoUrl: theme.repoUrl,
      error: err.response.data,
    }
    throw err
  }
}

const getThemes = async () => {
  const themesFrontMatter = themesFiles.map(file => {
    return loadThemeFrontMatter(file)
  })

  const filter = {
    draft: true,
    disabled: true,
  }

  const filterCounts = {
    draft: 0,
    disabled: 0,
    latest: 0,
    skipped: 0,
  }

  // Filter out themes which will not be fetched from Github
  const filteredThemesFrontMatter = themesFrontMatter.filter(theme => {
    // Don't fetch themes with draft or disabled in the frontmatter
    for (const key in filter) {
      if (theme[key]) {
        filterCounts[key] += 1
        return false
      }
    }
    // if the cli command --latest is used, only fetch themes which do exist in `data/themes.json`
    if (argv.latest) {
      if (themesData[theme.themeKey]) {
        filterCounts.latest += 1
        return false
      }
    }
    // if the cli command --file=hugo-swift-theme.md is used, only fetch that specific theme
    if (argv.file) {
      if (argv.file !== themesData[theme.themeKey].file) {
        filterCounts.skipped += 1
        return false
      }
    }
    return true
  })

  console.log(
    `Loading (${filteredThemesFrontMatter.length}/${themesFrontMatter.length}) theme files from ${themesContentFolder}`,
  )
  console.log(
    'Disabled ',
    themesFrontMatter.filter(theme => theme.disabled).length,
  )
  console.log('Drafts ', themesFrontMatter.filter(theme => theme.draft).length)
  console.log('Latest ', filterCounts.latest)
  console.log('Skipped ', filterCounts.skipped)

  const results = await allSettled(
    filteredThemesFrontMatter.map(getThemeGithubData),
  )

  // if (!argv.skipBranchCommits) {
  //   const lastCommits = await allSettled(
  //     filteredThemesFrontMatter.map(theme => {
  //       return getBranchCommit(theme)
  //     }),
  //   )
  // }

  // Check if any of the allSettled promises failed.
  const errors = results.filter(error => error.status === 'rejected')

  if (errors.length) {
    console.log(`${Object.keys(errors).length} Errors Founds`)
    console.log(githubErrors)
    throw new Error('Error fetching github data...')
  }

  // Sort data
  const sortedThemesData = {}
  Object.keys(themesData)
    .sort()
    .forEach(key => {
      sortedThemesData[key] = themesData[key]
    })

  return sortedThemesData
}

getThemes()
  .then(res => {
    console.log('Success')
    console.log('Writing data/themes.json...')
    fs.writeFileSync(themesDataFile, JSON.stringify(res, null, 2))
  })
  .catch(err => {
    console.log(err)
  })
