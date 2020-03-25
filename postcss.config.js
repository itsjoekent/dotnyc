const plugins = [
  require('precss'),
  require('autoprefixer'),
];

if (process.env.PRODUCTION) {
  plugins.push(require('cssnano'));
}

module.exports = {
  plugins,
};
