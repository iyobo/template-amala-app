const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  target: 'node',
  externals: [
    nodeExternals(),
  ],
  plugins: [],
  devtool: 'inline-source-map',
  // watch: true,
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        // exclude: /node_modules/,
      },
    ],
  },
}
