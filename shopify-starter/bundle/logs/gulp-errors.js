import chalk from 'chalk'
import notify, { logLevel } from 'gulp-notify'
import { sep } from 'path'
import PluginError from 'plugin-error'
import { stack } from '@bundle/plugins/cli'

export default error => {

  // Skip error CLI out if argument is undefined
  if (typeof error === 'undefined') return

  let title = ''
  let message = ''
  let report = ''

  /* -------------------------------------------- */
  /*                 JEKYLL ERRORS                */
  /* -------------------------------------------- */

  if (error.plugin === 'jekyll') {

    title = 'Jekyll'
    message = `${error.info} on line ${error.line}`
    report = chalk`\n{red ${error.info}}

      {dim Plugin}: ${error.plugin}
        {dim File}: ${error.file}
        {dim Line}: ${error.line}
        {dim Code}: ${error.messageOriginal}

    `

  }

  /* -------------------------------------------- */
  /*                  SASS ERRORS                 */
  /* -------------------------------------------- */

  if (error.plugin === 'gulp-sass') {

    title = 'CSS'
    message = `Error on line ${error.line} in ${error.relativePath} `
    report = chalk`\n{red ${error.messageOriginal}}

      {dim Plugin}: ${error.plugin}
        {dim File}: ${error.relativePath}
        {dim Line}: ${error.line}
      {dim Column}: ${error.column}

    `

  }

  /* -------------------------------------------- */
  /*                 ROLLUP ERRORS                */
  /* -------------------------------------------- */

  if (error.plugin === 'commonjs') {

    const filename = error.loc.file
    .split(sep)
    .slice(1)
    .slice(-3)
    .join('/')

    title = 'JavaScript'
    message = `Error on line ${error.loc.line} in ${filename}`
    report = chalk`\n{red ${error.message}}
      \n{yellow ${error.frame}}

      {dim Plugin}: ${error.plugin}
        {dim File}: ${filename}
        {dim Line}: ${error.loc.line}
      {dim Column}: ${error.loc.column}

    `

  }

  /* -------------------------------------------- */
  /*                  ICON ERRORS                 */
  /* -------------------------------------------- */

  if (error.plugin === 'gulp-svgmin') {

    title = 'SVG Icons'
    message = `${error.message}`
    report = chalk`\n{red ${error.message}}

      {dim Plugin}: ${error.plugin}

    `

  }

  /* -------------------------------------------- */
  /*                 NOTIFICATION                 */
  /* -------------------------------------------- */

  logLevel(0)
  notify({
    title: title,
    message: message,
    sound: 'Pop'
  }).write(error)

  report = report || chalk`\n{red ${error}}\n`

  const customError = new PluginError(
    error.plugin || '?', report, {
      error: error,
      showStack: stack,
      showProperties: stack
    }
  )

  throw customError

}
