import { orderBy } from 'lodash'
import themes from '../data/themes.json'

export function getFeaturedThemes() {
  return orderBy(Object.values(themes), ['stars'], ['desc'])
}

export function getTheme(slug) {
  return themes[slug]
}
