/* eslint-env node */
const fs = require('fs')
const path = require('path')
const util = require('util')
const glob = require('tiny-glob')
const yamlFront = require('yaml-front-matter')
const { Octokit } = require('@octokit/rest')
const gh = require('parse-github-url')
const outputFile = require('output-file')
const Pageres = require('pageres')
const splitInChunks = require('chunk')
const pathExists = require('path-exists')
const { argv } = require('yargs')

const readFile = util.promisify(fs.readFile)

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN })

function getId({ owner, repo, branch }) {
  return `${owner.toLowerCase()}-${repo.toLowerCase()}-${branch.toLowerCase()}`
}

async function getGithubInfos({ owner, repo }) {
  const [{ data: repoInfos }, { data: readme }] = await Promise.all([
    octokit.repos.get({
      owner,
      repo,
    }),
    octokit.repos.getReadme({
      owner,
      repo,
    }),
  ])
  const readmeContent = Buffer.from(readme.content, 'base64').toString('utf-8')
  return { ...repoInfos, readmeContent }
}

async function capture(template) {
  const dest = `generated/templates/${template.id}`
  const screenshotExist = await pathExists(path.join(dest, 'screenshot.jpg'))
  if (screenshotExist) return null
  return new Pageres({
    delay: 2,
    format: 'jpg',
  })
    .src(template.demoUrl, ['1024x768'], {
      crop: true,
      scale: 2,
      filename: 'screenshot',
    })
    .dest(dest)
    .run()
}

async function generateFromFile(file) {
  const content = await readFile(file, 'utf-8')
  const {
    github,
    title,
    description,
    demo,
    author,
    ssg,
    cms,
    gatsby,
    license,
    github_branch: specifiedBranch,
  } = yamlFront.loadFront(content)
  const { owner, name: repo } = gh(github)
  const branch = specifiedBranch || 'master'
  const id = getId({ owner, repo, branch })
  const manifest = `generated/templates/${id}/template.json`

  const manifestExists = await pathExists(manifest)
  const name = path.basename(file, '.md')
  if (manifestExists && argv.name !== name && !argv.force) {
    console.log(id, '-- skipped')
    return
  }

  const ghInfos = await getGithubInfos({ owner, repo })
  const template = {
    id,
    title,
    description,
    author,
    ssg,
    cms,
    gatsby,
    license,
    github: {
      branch,
      owner,
      repo,
      readmeContent: ghInfos.readmeContent,
    },
    demoUrl: demo,
    repoUrl: ghInfos.html_url,
    starsCount: ghInfos.stargazers_count,
    forksCount: ghInfos.forks_count,
    openIssuesCount: ghInfos.open_issues_count,
    lastCommitDate: ghInfos.updated_at,
    createdAt: ghInfos.created_at,
  }

  await outputFile(manifest, JSON.stringify(template))
  await capture(template)
  console.log(id, '-- OK')
}

async function generateAll() {
  const files = await glob('content/templates/*.md')
  const chunks = splitInChunks(files, 5)
  // eslint-disable-next-line no-restricted-syntax
  for (const chunkFiles of chunks) {
    // eslint-disable-next-line no-await-in-loop
    await Promise.all(chunkFiles.map(generateFromFile))
  }
}

generateAll().catch((error) => {
  setTimeout(() => {
    throw error
  })
})
