const { VueLoaderPlugin } = require("vue-loader");
import path from 'path';

const nodeEnv = process.env.NODE_ENV || 'development';
const isDev = nodeEnv === 'development';
console.log('nodeEnv ==> ', nodeEnv);
console.log('isDev ==> ', isDev);

const src = path.resolve(__dirname, './src');
const dist = path.resolve(__dirname, './public');

const config = {
  mode: nodeEnv,
  devtool: isDev ? 'source-map' : 'eval',
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      Components: path.resolve(__dirname, 'src/components'),//webpack.config.babel.jsと同じ階層までのパスを__dirname（絶対パスが格納されている）で取ってきていてそこからのsrc/componentsを指定している。
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [new VueLoaderPlugin()],
  // webpack-dev-server
  devServer: {
    open: true,
    inline: true,
    port: 8080,
    watchContentBase: true,
    contentBase: path.join(__dirname, 'public'),
  },
  entry: {
    index: [
      './src/index.js'
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                require('autoprefixer')({
                  grid: true,
                  browsers: [
                    'IE >= 9',
                    'last 2 versions'
                  ]
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            }
          }
        ]
      }
    ]
  }
}

export default config;