/* config-overrides.js */

const path = require('path');
const tsImportPluginFactory = require('ts-import-plugin')
const rewireLess = require('./utils/createRewireLess');

const {
  getLoader
} = require("react-app-rewired");

module.exports = function override(config, env) {

  config.entry.unshift(
    path.resolve(__dirname, './src/i18n/en-US.ts'),
    path.resolve(__dirname, './src/i18n/zh-CN.ts'),
  );

  config.module.rules.push({
    test: /\.md$/,
    use: [
      'html-loader',
      'markdown-loader',
    ],
  });

  const fileLoader = getLoader(
    config.module.rules,
    rule =>
    rule.loader &&
    typeof rule.loader === 'string' &&
    rule.loader.includes('file-loader')
  );

  fileLoader.exclude.push(/\.md$/);


  const tsLoader = getLoader(
    config.module.rules,
    rule =>
    rule.loader &&
    typeof rule.loader === 'string' &&
    rule.loader.includes('ts-loader')
  );

  tsLoader.options = {
    getCustomTransformers: () => ({
      before: [tsImportPluginFactory({
        libraryDirectory: 'es',
        libraryName: 'antd',
        style: true,
      })]
    })
  };

  config = rewireLess.withLoaderOptions({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#1DA57A"
    },
  })(config, env);

  return config;
}