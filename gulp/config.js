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
  asset: `${dir.src}/**/*.{json,png,env}`,
  html: `${dir.src}/**/*.html`,
  test: `${dir.test}/**/*.spec.{js,jsx,ts,tsx}`,
  styleWatch: `${dir.src}/**/*.styl`,
}

const server= {
  coolDownMsec: 1000,
}

const watch = {
  verbose: true,
}

const browserify = {
  entry: `${dir.dist}/front.js`,
  output: `${dir.dist}/front.js`,
  tmpfile: `${dir.dist}/front.src.js`,
  removes: [
    `${dir.dist}/front.src.js`,
    `${dir.dist}/actions`,
    `${dir.dist}/components`,
    `${dir.dist}/containers`,
    `${dir.dist}/decorators`,
    `${dir.dist}/domains`,
    `${dir.dist}/reducers`,
  ],
}

const package = {
  name: 'ElectronApp',
  platforms: ['win32', 'darwin', 'linux'],
  arch: 'x64',        // x64 or ia32
  version: '0.36.11', // electron version
}

module.exports = {dir, src, server, watch, browserify, package}
