const dir = {
  src: './src',
  test: './test',
  dist: './dist',
  release: './release',
  work: {
    server: './.server',
    test: './.test',
  },
}

const src = {
  script: `${dir.src}/**/*.{js,jsx,ts,tsx}`,
  style: [
    `${dir.src}/**/styles/index.styl`,
    `./node_modules/purecss/build/pure.css`,
  ],
  asset: `${dir.src}/**/*.{json,png}`,
  html: `${dir.src}/**/*.html`,
  test: `${dir.test}/**/*.spec.{js,jsx,ts,tsx}`,
  styleWatch: `${dir.src}/**/*.styl`,
}

const server= {
  coolDownMsec: 1000,
  restartDelayMsec: 325,
  restart: [
    `${dir.src}/app.ts`,
    `${dir.src}/windows/*.ts`,
  ],
}

const watch = {
  verbose: true,
}

const browserify = {
  app: {
    entry: `${dir.dist}/app.js`,
    output: `${dir.dist}/app.js`,
    tmpfile: `${dir.dist}/app.src.js`,
  },
  front: {
    entry: `${dir.dist}/front.js`,
    output: `${dir.dist}/front.js`,
    tmpfile: `${dir.dist}/front.src.js`,
  },
  removes: [
    `${dir.dist}/app.src.js`,
    `${dir.dist}/front.src.js`,
    `${dir.dist}/app.const.js`,
    `${dir.dist}/actions`,
    `${dir.dist}/components`,
    `${dir.dist}/containers`,
    `${dir.dist}/decorators`,
    `${dir.dist}/domains`,
    `${dir.dist}/reducers`,
    `${dir.dist}/windows`,
  ],
}

const package = {
  name: 'ElectronApp',
  platforms: ['win32', 'darwin', 'linux'],
  arch: 'x64',        // x64 or ia32
  version: '0.37.2', // electron version
}

module.exports = {dir, src, server, watch, browserify, package}
