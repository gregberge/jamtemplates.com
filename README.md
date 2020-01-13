# JamTemplates

A curated list of beautiful & ready-to-use themes for Gatsby.

## Submit A Theme

Anyone can submit a theme to the gallery.

- Fork this repo and create a new markdown `.md` file in `content/theme` folder.
- The markdown filename is typically named after your theme or repo, for example `hugo-air.md`
- Submit a pull-request with the title **Theme Submission: theme-name**

The markdown file should contain the following front-matter.

```yaml
---
title: 'My Theme Name'
github: https://github.com/username/repo
demo: https://www.demo.com
author: Github Author
date: 2019-08-20 # This is the date you submitted the theme YYYY-MM-DD
github_branch: master # This is the repos default branch
ssg:
  - Gatsby
cms:
  - NetlifyCMS
css:
  - Theme UI
archetype:
  - Blog
  - Portfolio
services:
  - Snipcart
  - Formstack
gatsby:
  version: 2
  type: theme
license: MIT
description: This theme is a lightweight Gridsome starter kit which is perfect for a blog or a portfolio.
---

```

## Contribution Guidelines

Any open source themes with a public github repo can be submitted.

For now only Gatsby theme are supported, but we plan to support Next.js soon. If you want to submit a Next.js theme, please open an issue.

If you want to submit a paid theme, please [contact me](https://gregberge.com).
