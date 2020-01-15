# JamTemplates

A curated list of beautiful & ready-to-use themes for Gatsby.

## Submit A Theme

Anyone can submit a theme to the gallery.

- Fork this repo and create a new markdown `.md` file in `content/theme` folder.
- The markdown filename is typically named after your theme or repo, for example `gatsby-blue.md`
- Submit a pull-request with the title **Theme Submission: theme-name**

The markdown file should contain the following front-matter.

```yaml
---
# The title of your theme
title: 'My Theme Name'
# Description of your theme
description: This theme is a lightweight Gridsome starter kit which is perfect for a blog or a portfolio.
# The GitHub repository of your theme
github: https://github.com/username/repo
# The online demo of your theme
demo: https://www.demo.com
# Your name
author: Github Author
# This is the date you submitted the theme YYYY-MM-DD
date: 2019-08-20
# SSG engine of your theme (currently only Gatsby is supported)
ssg:
  - Gatsby
# Specific informations relative to Gatsby
gatsby:
  version: 2 # Version of Gatsby
  type: theme # "theme" or "starter"
# Supported CMS
cms:
  - Markdown
  - NetlifyCMS
  - Contentful
  - DatoCMS
  - Wordpress
# The GitHub branch pointing to your theme (facultative)
# If not specified, we will use "master"
github_branch: master
# The CSS engine used on your theme
css:
  - Theme UI
# What is your theme used for?
archetype:
  - Blog
  - Portfolio
# License of your theme
license: MIT
---

```

## Contribution Guidelines

Any open source themes with a public github repo can be submitted.

For now only Gatsby theme are supported, but we plan to support Next.js soon. If you want to submit a Next.js theme, please open an issue.

If you want to submit a paid theme, please [contact me](https://gregberge.com).
