const path = require('path');

module.exports = function override(webpackConfig) {
  webpackConfig.resolve.alias['@'] = path.resolve(__dirname, 'src');
  return webpackConfig;
};
