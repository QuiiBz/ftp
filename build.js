// eslint-disable-next-line import/no-extraneous-dependencies
const { build, glob, cliopts } = require('estrella');

build({
  entry: glob('src/**/*.ts'),
  outdir: 'dist',
  format: 'cjs',
  watch: cliopts.watch,
});
