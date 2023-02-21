const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      cards: './src/js/cards.js'
    },

    // TODO: Add the correct output
    //this name of the file and wich directory you wanted to put it in 
    output: {
      filename: '[name].bundle.js', //[name]. generates a bundle for each entry
      path: path.resolve(__dirname, 'dist'),
      
    },

    // TODO: Add the correct plugins
    //processing modules after they have been loaded 
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js'
      })
     
    ],

    // TODO: Add the correct modules
    module: {
      rules: [
        {
          test: /\.css$/i,
          //This ones are npm packages that need to be installed
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          //this is part of webpack no need to install new dependencies
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components])/,
          // We use babel-loader in order to use ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ]

    }
  };
};
