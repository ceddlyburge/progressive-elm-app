var path = require("path");
var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
var WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  entry: {
    app: [
      './src/index.js'
    ]
  },

  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test:    /\.html$/,
        exclude: /node_modules/,
        loader:  'file-loader?name=[name].[ext]',
      },
      {
        test:    /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        loader:  'elm-webpack-loader?verbose=true&warn=true',
      }
    ],

    noParse: /\.elm$/,
  },

  plugins: [
	new SWPrecacheWebpackPlugin(
      {
        cacheId: 'ceddlyburge/progressive-elm',
        dontCacheBustUrlsMatching: /\.\w{8}\./,
        filename: 'service-worker.js',
        minify: false,
        navigateFallback: 'index.html',
        staticFileGlobsIgnorePatterns: [/\.map$/, /manifest\.json$/]
      }
    )
    , new WebpackPwaManifest({
      name: 'Minimal progressive Elm App, to demonstrate the steps involved',
      short_name: 'Progessive Elm',
      description: 'Minimal progressive Elm App. There is a Hello World page, with no images or css, so that there is less noise to detract from the code that is required to make it progressive.',
      background_color: '#ffffff',
      theme_color: '#000000',
      start_url: '/',
      icons: [
        {
          src: path.resolve('src/static/img/icon.png'),
          sizes: [192],
          destination: path.join('static', 'img')
        }
      ]
	})
  ],

  devServer: {
    inline: true,
    stats: { colors: true },
  },
  
};