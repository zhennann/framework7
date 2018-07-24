/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-console: ["error", { allow: ["log"] }] */
const gulp = require('gulp');
const modifyFile = require('gulp-modify-file');
const path = require('path');
const rollup = require('rollup');
const buble = require('rollup-plugin-buble');
const replace = require('rollup-plugin-replace');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');

// let cache;

function buildKs(cb) {
  const env = process.env.NODE_ENV || 'development';
  const target = process.env.TARGET || 'universal';
  const buildPath = env === 'development' ? './build' : './packages';

  let f7ReactPath = path.resolve(__dirname, `../${buildPath}/react/framework7-react.esm.js`);
  let f7Path = path.resolve(__dirname, `../${buildPath}/core/framework7.esm.bundle`);
  if (process.platform.indexOf('win') === 0) {
    f7ReactPath = f7ReactPath.replace(/\\/g, '/');
    f7Path = f7Path.replace(/\\/g, '/');
  }

  gulp.src('./kitchen-sink/react/index.html')
    .pipe(modifyFile((content) => {
      if (env === 'development') {
        return content
          .replace('../../packages/core/css/framework7.min.css', '../../build/core/css/framework7.css')
          .replace('../../packages/core/js/framework7.min.js', '../../build/core/js/framework7.js');
      }
      return content
        .replace('../../build/core/css/framework7.css', '../../packages/core/css/framework7.min.css')
        .replace('../../build/core/js/framework7.js', '../../packages/core/js/framework7.min.js');
    }))
    .pipe(gulp.dest('./kitchen-sink/react'))
    .on('error', (err) => {
      console.log(err);
    });

  rollup.rollup({
    input: './kitchen-sink/react/src/app.js',
    // cache,
    plugins: [
      replace({
        delimiters: ['', ''],
        'process.env.NODE_ENV': JSON.stringify(env),
        'process.env.TARGET': JSON.stringify(target),
        "'framework7-react'": () => `'${f7ReactPath}'`,
        "'framework7/framework7.esm.bundle'": () => `'${f7Path}'`,
      }),
      resolve({ jsnext: true }),
      commonjs(),
      buble({
        objectAssign: 'Object.assign',
      }),
    ],
  }).then(bundle => bundle.write({
    format: 'umd',
    name: 'app',
    strict: true,
    sourcemap: false,
    // cache,
    file: './kitchen-sink/react/js/app.js',
  })).then(() => {
    if (cb) cb();
  }).catch((err) => {
    console.log(err);
    if (cb) cb();
  });
}

module.exports = buildKs;
