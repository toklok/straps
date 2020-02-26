import { obj } from 'through2'
import Svgo from 'svgo'
import assign from 'assign-deep'
import PluginError from 'plugin-error'

const PLUGIN_NAME = 'gulp-liquid-icons'

/**
 * Bundle
 *
 *
 * @param {object} options
 *
 */
export default function (options, settings) {

  const defaults = {
    task: 'inline',
    class: 'icon',
    classPrefix: 'icon-'
  }

  const config = assign(defaults, options)
  const svgo = new Svgo(settings)

  return obj(function (
    file, encoding, callback
  ) {

    if (file.isNull()) {

      return callback(null, file)

    }

    if (file.isStream()) {

      return callback(null, file)

    }

    // File Information
    const stem = file.stem
    const dirname = file.dirname.split('/').pop()
    const match = new RegExp(`class="${config.class}"`, 'gi')

    const classvar = '{% if class -%}{{ class }}{%- endif -%}'
    const classname = `class="${config.class} ${config.classPrefix}${stem} ${classvar}"`

    svgo.optimize(String(file.contents)).then(item => {

      item.data = item.data.replace(match, classname)

      if (config.task === 'inline') {

        if (dirname === 'sprite') {

          const icon = [
            '{%- if type == \'sprite\' -%}',
            `<svg ${classname}>`,
            `<use xlink:href="#${stem}"></use>`,
            '</svg>',
            '{%- else -%}',
            `${item.data}`,
            '{%- endif -%}'
          ]

          file.contents = Buffer.from(icon.join(''), encoding)

          return callback(null, file)

        }

        file.contents = Buffer.from(item.data, encoding)

        return callback(null, file)

      } else {

        file.contents = Buffer.from(item.data, encoding)

        return callback(null, file)

      }

    },
    function (error) {

      callback(new PluginError(PLUGIN_NAME, error))

    })

  })

}
