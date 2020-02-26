import chalk from 'chalk'
import notify from 'gulp-notify'
import { sep } from 'path'
import PluginError from 'plugin-error'

export default error => {

  // Skip error CLI out if argument is undefined
  if (typeof error === 'undefined') return

  let title = ''
  let message = ''
  let report = ''
  const showProperties = false

  if (!error.plugin) {

    Object.assign(error, {
      plugin: 'rollup'
    })

    title = 'JavaScript'
    message = `Error ${error.code}`
    report = chalk`\n{red ${error.code}}
      \n{yellow ${error}}

      {dim Plugin}: ${error.plugin}

    `

  }

  /* -------------------------------------------- */
  /*                COMMONJS PLUGIN               */
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
  /*                 NOTIFICATION                 */
  /* -------------------------------------------- */

  notify({
    title: title,
    message: message,
    sound: 'Pop'
  }).write(error)

  const customError = new PluginError(
    error.plugin, report, {
      error: error,
      showProperties: showProperties
    }
  )

  throw customError

}
