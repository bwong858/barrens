const path = require('path');
const srcDir = path.join(__dirname, '/client/src');
const distDir = path.join(__dirname, '/client/dist');

module.exports = {
  entry: `${srcDir}/index.js`,
  output: {
    filename: 'bundle.js',
    path: distDir
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: srcDir,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react']
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: distDir,
    compress: true,
    port: 9000
  }
};
