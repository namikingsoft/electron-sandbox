const dir = {
  src: './src',
  dist: './dist',
  test: './test',
  work: {
    server: './.server',
    test: './.test',
  },
}

const src = {
  script: `${dir.src}/**/*.{js,jsx,ts,tsx}`,
  style: `${dir.src}/**/*.styl`,
  asset: `${dir.src}/**/*.{json,png,env}`,
  html: `${dir.src}/**/*.html`,
  test: `${dir.test}/**/*.spec.{js,jsx,ts,tsx}`,
}

const server= {
  restart: [
    `${dir.src}/app.ts`,
  ],
}

const watch = {
  verbose: true,
}

module.exports = {dir, src, server, watch}
