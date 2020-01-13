/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')

module.exports = {
  webpack(config, { isServer }) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'frontmatter-markdown-loader',
    })
    config.module.rules.push({
      test: /\.(jpe?g|png|svg|gif|ico|webp)$/,
      exclude: [path.resolve(__dirname, './assets/images/capture')],
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: `/_next/static/images/`,
          outputPath: `${isServer ? '../' : ''}static/images/`,
          name: '[name]-[hash].[ext]',
        },
      },
    })
    config.module.rules.push({
      test: /\.(jpe?g|png)$/i,
      loader: 'responsive-loader',
      include: [path.resolve(__dirname, './assets/images/capture')],
      options: {
        adapter: require('responsive-loader/sharp'),
        name: '[name]-[width]-[hash].[ext]',
        publicPath: `/_next/static/images/`,
        outputPath: `${isServer ? '../' : ''}static/images/`,
        sizes: [800, 1600],
      },
    })
    config.optimization.sideEffects = true
    return config
  },
}
