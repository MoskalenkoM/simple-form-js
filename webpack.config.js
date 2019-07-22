const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const eslintFriendlyFormatter = require('eslint-friendly-formatter');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter: eslintFriendlyFormatter
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.(woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [new MiniCssExtractPlugin({ filename: 'main.css' }), new OptimizeCSSAssetsPlugin({})],
  resolve: {
    alias: {
      // '~': path.resolve(__dirname, 'src/'),
      // '@img': path.resolve(__dirname, 'src/img/'),
      // '@css': path.resolve(__dirname, 'src/css/')
    },
    extensions: ['*', '.html', '.js', '.json', '.css', '.sass', '.scss', '.png', '.jpg', '.jpeg']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-sourcemap' : false
};

// if (process.env.NODE_ENV === 'development') {
//   this.plugins.push(new OptimizeCSSAssetsPlugin({}));
// }
