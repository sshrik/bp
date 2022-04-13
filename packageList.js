export const dependencies = [
  {
    name: 'react',
    version: '^17.0.2',
  },
  {
    name: 'react-dom',
    version: '^17.0.2',
  },
  {
    name: 'react-router-dom',
    version: '^6.0.2',
  },
  {
    name: 'styled-components',
    version: '^5.3.3',
  },
  {
    name: 'styled-normalize',
    version: '^8.0.7',
  },
  {
    name: 'i18next',
    version: '^21.6.6',
  },
  {
    name: 'react-i18next',
    version: '^11.15.3',
  },
  {
    name: '@babel/runtime',
    version: '^7.16.7',
  },
];

export const scripts = [
  {
    alias: 'lint',
    script: 'eslint .',
  },
  {
    alias: 'lint:fix',
    script: 'tsc --noEmit; eslint --fix "src/**/*.{ts,tsx}"',
  },
  {
    alias: 'run:dev',
    script: 'NODE_ENV=local webpack serve --mode=development',
  },
  {
    alias: 'build',
    script: 'NODE_ENV=development webpack --mode=production',
  },
];

export const typeList = ['module'];

export const devDependencies = [
  {
    name: '@babel/core',
    version: '^7.16.0',
  },
  {
    name: '@babel/plugin-transform-runtime',
    version: '^7.16.8',
  },
  {
    name: '@babel/preset-env',
    version: '^7.16.0',
  },
  {
    name: '@babel/preset-react',
    version: '^7.16.0',
  },
  {
    name: '@babel/preset-typescript',
    version: '^7.16.0',
  },
  {
    name: '@types/node',
    version: '^16.11.6',
  },
  {
    name: '@types/react',
    version: '^17.0.34',
  },
  {
    name: '@types/react-dom',
    version: '^17.0.11',
  },
  {
    name: '@types/react-router-dom',
    version: '^5.3.2',
  },
  {
    name: '@types/styled-components',
    version: '^5.1.15',
  },
  {
    name: '@typescript-eslint/eslint-plugin',
    version: '^5.3.0',
  },
  {
    name: '@typescript-eslint/parser',
    version: '^5.3.0',
  },
  {
    name: 'babel-loader',
    version: '^8.2.3',
  },
  {
    name: 'clean-webpack-plugin',
    version: '^4.0.0',
  },
  {
    name: 'css-loader',
    version: '^6.5.1',
  },
  {
    name: 'eslint',
    version: '^8.2.0',
  },
  {
    name: 'eslint-config-airbnb',
    version: '^18.2.1',
  },
  {
    name: 'eslint-config-prettier',
    version: '^8.3.0',
  },
  {
    name: 'eslint-plugin-import',
    version: '^2.25.2',
  },
  {
    name: 'eslint-plugin-jsx-a11y',
    version: '^6.4.1',
  },
  {
    name: 'eslint-plugin-prettier',
    version: '^4.0.0',
  },
  {
    name: 'eslint-plugin-react',
    version: '^7.26.1',
  },
  {
    name: 'eslint-plugin-react-hooks',
    version: '^4.2.0',
  },
  {
    name: 'file-loader',
    version: '^6.2.0',
  },
  {
    name: 'html-loader',
    version: '^3.0.1',
  },
  {
    name: 'html-webpack-plugin',
    version: '^5.5.0',
  },
  {
    name: 'mini-css-extract-plugin',
    version: '^2.4.5',
  },
  {
    name: 'prettier',
    version: '^2.4.1',
  },
  {
    name: 'style-loader',
    version: '^3.3.1',
  },
  {
    name: 'svg-react-loader',
    version: '^0.4.6',
  },
  {
    name: 'tsconfig-paths-webpack-plugin',
    version: '^3.5.1',
  },
  {
    name: 'typescript',
    version: '^4.4.4',
  },
  {
    name: 'webpack',
    version: '^5.62.1',
  },
  {
    name: 'webpack-cli',
    version: '^4.9.1',
  },
  {
    name: 'webpack-dev-server',
    version: '^4.4.0',
  },
];
