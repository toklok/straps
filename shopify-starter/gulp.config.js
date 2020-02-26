export const shop = 'Example'
export const input = 'source'
export const output = 'theme'
export const bundles = 'bundle'

/**
 * @task `gulp server`
 * @implements Browser Sync
 */
export const server = {
  files: [ `${output}/assets/**` ],
  serveStatic: [ `${output}/assets` ],
  https: {
    key: `${bundles}/ssl/localhost.key`,
    cert: `${bundles}/ssl/localhost.crt`
  }
}

/**
 * @task `gulp sync`
 * @implements Shopify Sync
 */
export const sync = {
  ignore: [
    `${output}/assets/*.map`,
    `${output}/assets/*.js`
  ]
}

/**
 * @task `gulp scripts`
 * @implements Rollup
 */
export const scripts = {
  esm: {
    input: `${input}/scripts/bundle.js`,
    external: [
      'mithril',
      'stimulus',
      'turbolinks',
      'stickybits',
      'photoswipe',
      'siema'
    ],
    output: {
      name: 'App',
      format: 'iife',
      dir: `${output}/assets`,
      sourcemap: true,
      globals: {
        mithril: 'm',
        turbolinks: 'Turbolinks',
        stimulus: 'Stimulus',
        stickybits: 'stickybits',
        photoswipe: 'Photoswipe',
        siema: 'Siema'
      }
    },
    plugins: {
      depinject: {
        index: `${output}/layout/theme.liquid`,
        attr: 'defer'
      }
    },
    watch: [
      `!${input}/scripts/modules`,
      `${input}/scripts/**/*.js`
    ]
  },
  iife: {
    input: [
      `${input}/scripts/index.js`,
      `${input}/scripts/modules/redirect.js`,
      `${input}/scripts/modules/system.js`
    ],
    output: {
      format: 'es',
      entryFileNames: '[name].js.liquid',
      dir: `${output}/snippets`,
      sourcemap: false
    },
    watch: [
      `${input}/scripts/index.js`,
      `${input}/scripts/modules`
    ]
  }
}

/**
 * @task `gulp styles`
 */
export const styles = {
  stylesheet: {
    input: `${input}/styles/stylesheet.scss`,
    output: `${output}/assets/`,
    watch: `${input}/styles/**/*.scss`,
    include: [
      'node_modules/',
      'node_modules/bootstrap/scss/'
    ]
  }
}

/**
 * @task `gulp images`
 */
export const images = {
  input: `${input}/images/**/**`,
  output: `${output}/assets/`,
  watch: `${input}/images/**/**`
}

/**
 * @task `gulp icons`
 */
export const icons = {
  inline: {
    input: `${input}/icons/inline/*.svg`,
    output: `${output}/snippets`,
    watch: 'icons/inline/*.svg'
  },
  sprite: {
    input: `${input}/icons/inline/*.svg`,
    output: `${output}/snippets`,
    sprite: `${input}/icons/sprite/*.svg`,
    watch: 'icons/sprite/*.svg'
  }
}

/**
 * @task `gulp schema`
 */
export const json = {
  schema: {
    input: `${input}/schema/**/*.json`,
    output: `${output}`,
    watch: [
      `${input}/schema/config`,
      `${input}/schema/locales`
    ]
  }
}

/**
 * @task `gulp views`
 */
export const views = {
  input: `${input}/views/**/*.liquid`,
  output: `${output}`,
  watch: `${input}/views/**/*.liquid`,
  paths: {
    dest: {
      layout: [ 'theme.liquid' ]
    }
  }
}

/**
 * @task `gulp clean`
 */
export const clean = {
  directory: `${output}`,
  structure: [
    'assets',
    'config',
    'layout',
    'locales',
    'sections',
    'snippets',
    'templates'
  ]
}

/**
 * @task `gulp export`
 */
export const compress = {
  input: `${input}`,
  output: 'export'
}
