import { obj } from 'through2'
import has from 'has'

/**
 * Paths
 * Re-routes destination output paths
 *
 * @param {Object} options - The path re-router
 * @param {Object} options.dest - Applies a different directory output
 * @param {Object} options.skip - List of directories to Skip
 *
 */
export default function paths (options) {

  return obj((
    file, encoding, callback
  ) => {

    if (file.isNull()) {

      return callback(null, file)

    } else if (file.isStream()) {

      return callback()

    }

    const split = file.path.split('/')

    has(options, 'dest') &&
      Object.keys(options.dest).forEach(prop => {

        if (Array.isArray(options.dest[prop])) {

          if (options.dest[prop].includes(file.basename)) {

            const uri = options.dest[prop]
            .map(dir =>
              split.includes(dir) && split.filter(value => value !== dir))
            .filter(url => url || url)[0]
            .join('/')

            file.path = `${uri}/${prop}/${file.basename}`

          }

        }

      })

    has(options, 'skip') &&
      Object.keys(options.skip).forEach(prop => {

        if (Array.isArray(options.skip[prop])) {

          if (file.relative.split('/').includes(prop)) {

            file.path = options.skip[prop]
            .map(dir =>
              split.includes(dir) && split.filter(value => value !== dir))
            .filter(url => url || url)[0]
            .join('/')

          }

        }

      })

    return callback(null, file)

  })

}
