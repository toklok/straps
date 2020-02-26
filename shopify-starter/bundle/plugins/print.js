import { obj } from 'through2'
import log from 'fancy-log'
import chalk from 'chalk'
import timestamp from 'time-stamp'

/**
 * Print Plugin
 * Applies pretty CLI logs
 *
 * @param {Object}  options - The STDOUT log options
 * @param {boolean} options.timestamp - Should append timestamp?
 * @param {string}  options.filename - The filename
 * @param {boolean} options.through2 - Use `through2`
 * @param {string}  options.color - Accepts `Chalk` CLI colors
 * @param {string}  options.title - The title prefix, defaults to "Compiled"
 *
 */
export default function print (options) {

  const defaults = {
    timestamp: false,
    filename: null,
    through2: true,
    color: 'yellow',
    title: 'Compiled'
  }

  const config = Object.assign(
    {}, defaults, options
  )

  if (config.timestamp) {

    return chalk`{gray ${timestamp('HH:mm:ss')}}`

  }

  if (config.through2 === false) {

    const { title, color, filename } = config

    if (filename === null) {

      throw new Error(chalk`{red Filename is required}`)

    }

    return log(`${chalk[color](title)} '${chalk[`${color}Bright`](filename)}'`)

  }

  return obj((
    file, encoding, callback
  ) => {

    if (file.isNull()) {

      return callback(null, file)

    } else if (file.isStream()) {

      return callback()

    }

    const { color, title } = config

    log(`${chalk[color](title)} '${chalk[`${color}Bright`](file.basename)}'`)

    return callback(null, file)

  })

}
