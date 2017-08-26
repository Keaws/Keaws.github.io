const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src',

  plugins: [
    new HtmlWebpackPlugin({
      title: 'GitHub API',
      template: 'src/index.html'
    })
  ],

  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/i,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'es2015', 'stage-0'],
          plugins: [
            ['transform-react-jsx', { pragma: 'h' }],
            ["transform-object-rest-spread"]
          ]
        }
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          'css-loader'
        ] 
      }
    ]
  },

  devtool: 'eval-source-map',

  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    historyApiFallback: true
  }
}
