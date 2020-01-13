/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
function importAll(r) {
  r.keys().forEach(r)
}

importAll(require.context('../assets/images/capture', false, /\.jpg/))

export function getTemplateImageSrc(template, size) {
  const {
    images: [sm, xl],
  } = require(`../assets/images/capture/${template.theme_key}.jpg`)
  const images = { sm, xl }
  return images[size]?.path
}
