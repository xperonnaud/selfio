
module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  outputDir: 'dist/',
  publicPath: '/',
  indexPath: 'index.html',
  assetsDir: 'assets/',
    pages: {
        index: {
            // entry for the page
            entry: 'src/main.js',
            // the source template
            template: 'public/index.html',
            // output as dist/index.html
            filename: 'index.html',
            // when using title option,
            // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'PackHub',
            // chunks to include on this page, by default includes
            // extracted common chunks and vendor chunks.
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
  css: {
    // Enable CSS source maps.
    sourceMap: true
  }
};