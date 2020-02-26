const minimist = require('minimist')

/**
 * CLI Arguments
 *
 * - `--dev`
 *    - Development Bundle - The default bundle
 * - `--prod`
 *    - Production Bundle - Minfies and compresses
 * - `--force`
 *    - Forceful Bundle – ignores hasChanged and/or lastRun
 * - `--verbose`
 *    - Verbose Logging – Detailed logging when bundling
 * - `--stack`
 *    - Trace Errors – Helpful for error logs
 *
 */

const cli = minimist(process.argv.slice(2), {
  boolean: [
    'prod',
    'dev',
    'force',
    'verbose',
    'stack'
  ],
  alias: {
    prod: 'production',
    dev: 'development'
  }
})

cli.dev = !cli.prod

export default cli
