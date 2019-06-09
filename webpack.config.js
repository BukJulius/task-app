const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StylelintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const output = {
  path: path.resolve(__dirname, './dist'),
  publicPath: '/',
  filename: `build.[hash:7].js`
}

const resolve = {
  alias: {
    'vue$': 'vue/dist/vue.esm.js',
    '@src': path.resolve(__dirname, 'src')
  },
  extensions: ['*', '.js', '.vue', '.json']
}

const devServer = {
  host: 'localhost',
  port: 4000,
  historyApiFallback: true,
  overlay: true
}

const vueRules = [
  {
    enforce: 'pre',
    test: /\.vue$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  },
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  }
]

const jsRules = [
  {
    enforce: 'pre',
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'eslint-loader'
  },
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-transform-runtime']
    }
  }
]

const cssRules = [
  {
    test: /\.css$/,
    use: [
      'vue-style-loader',
      'css-loader'
    ]
  }
]

const imgRules = [
  {
    test: /\.(png|jpg|svg|gif)$/,
    loader: 'file-loader',
    options: {
      name: 'images/[name].[hash:7].[ext]'
    }
  }
]

const fontRules = [
  {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000,
      name: 'fonts/[name].[hash:7].[ext]'
    }
  }
]

const plugins = () => {
  return [
    new HtmlWebpackPlugin({
      template: `index.html?v=[hash:7]`,
      minify: { collapseWhitespace: true },
      title: 'Task App'
    }),
    new VueLoaderPlugin(),
    new StylelintPlugin({
      files: ['src/**/*.vue']
    })
  ]
}

module.exports = () => ({
  entry: './src/app.js',
  output,
  resolve,
  devServer,
  plugins: plugins(),
  module: {
    rules: [
      ...vueRules,
      ...jsRules,
      ...cssRules,
      ...imgRules,
      ...fontRules
    ]
  },
  performance: {
    hints: false
  },
  devtool: '#source-map'
})
