import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';

const __dirname = path.resolve();

const commonConfigs = {
  target: 'web',
  context: path.resolve(__dirname, '.'),
  entry: {
    index: [path.resolve(__dirname, './src/index.tsx')],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      path.resolve(__dirname, './node_modules'),
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json'),
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            cacheDirectory: true,
            cacheCompression: false,
          },
        },
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
    strictExportPresence: false,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      minify: true,
      showErrors: false,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
  ],
};

const getDeployConfigs = ({ mode = 'development' }) => ({
  ...commonConfigs,
  mode,
  devtool: mode === 'development' ? 'source-map' : false,
  plugins: [
    ...commonConfigs.plugins,
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      favicon: './public/favicon.ico',
      minify: true,
      showErrors: false,
    }),
  ],
  optimization: {
    minimize: mode === 'production',
  },
});

const getLocalConfigs = () => ({
  ...commonConfigs,
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8000,
    historyApiFallback: true,
    hot: true,
    open: false,
    client: {
      overlay: true,
      progress: true,
    },
  },
  optimization: {
    minimize: false,
  },
  plugins: [...commonConfigs.plugins, new webpack.SourceMapDevToolPlugin({})],
  devtool: 'eval-source-map',
});

export default (env, argument) => {
  const { mode } = argument;

  if (typeof mode === 'undefined') {
    console.warn(
      '\x1b[1m\x1b[33m%s\x1b[0m',
      'script 에서 mode 값이 지정되지 않았습니다.(기본값: development)'
    );
  }

  const { WEBPACK_SERVE, ENVIRONMENT } = env;

  const config = WEBPACK_SERVE ? getLocalConfigs() : getDeployConfigs(mode);

  const environment = ENVIRONMENT
    ? JSON.stringify(ENVIRONMENT)
    : JSON.stringify(process.env.NODE_ENV);

  config.plugins.push(
    new webpack.DefinePlugin({
      __ENVIRONMENT__: environment,
    })
  );

  return config;
};
