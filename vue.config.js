// 全局参数
const path = require('path')
const resolve = dir => path.join(__dirname, dir)

// 引入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

module.exports = {
  publicPath: '/',
  lintOnSave: true,
  productionSourceMap: false,
  configureWebpack: config => {
    const plugins = []
    plugins.push(
      // gzip压缩
      new CompressionWebpackPlugin({
        // filename: '[path].gz[query]',
        deleteOriginalAssets: true,
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240, // 10k以下不压缩
        minRatio: 0.8
      })
    )
    config.plugins = [...config.plugins, ...plugins]
  },
  chainWebpack: config => {
    // 依赖分析
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
  }
}
