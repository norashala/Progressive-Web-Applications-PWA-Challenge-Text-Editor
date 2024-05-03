const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // Generates an HTML file from a template
      new HtmlWebpackPlugin({
        title: 'JATE',
        template: path.join(__dirname, 'index.html'), // Correct path to your HTML template
        filename: 'index.html' // Output file name
      }),
      // Generates a 'manifest.json' for your Progressive Web App
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'JATE',
        description: 'A text editor that works like a PWA.',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
          }
        ]
      }),
      // Workbox plugin to generate a service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js'
      })
    ],

    module: {
      rules: [
        {
          test: /\.css$/, // This regex identifies files ending in .css
          use: ['style-loader', 'css-loader'] // Loaders for CSS files
        },
        {
          test: /\.js$/, // This regex identifies files ending in .js
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-object-rest-spread']
            }
          }
        }
      ],
    },
  };
};
