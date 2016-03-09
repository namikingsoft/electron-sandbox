const dir = {
  src: './src',
  dist: './dist',
  server: './.server',
}

const src = {
  script: `${dir.src}/**/*.{js,jsx,ts,tsx}`,
  style: `${dir.src}/**/*.styl`,
  image: `${dir.src}/**/*.png`,
  html: `${dir.src}/**/*.html`,
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
