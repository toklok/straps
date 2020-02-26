import { series, parallel } from 'gulp'
import { server } from '@bundle/server'
import { clean } from '@bundle/clean'
import { compress } from '@bundle/compress'
import icons from '@bundle/icons'
import { images } from '@bundle/images'
import scripts from '@bundle/scripts'
import { stylesheet } from '@bundle/styles'
import { schema } from '@bundle/schema'
import { views } from '@bundle/views'
import { sync } from '@bundle/shopify'
import watch from '@bundle/watch'

/* -------------------------------------------- */
/*                    EXPORT                    */
/* -------------------------------------------- */

exports.clean = clean
exports.export = compress
exports.views = views
exports.styles = stylesheet
exports.scripts = scripts
exports.schema = schema
exports.images = images
exports.icons = icons
exports.sync = sync
exports.server = server
exports.watch = watch
exports.live = parallel(watch, sync)
exports.local = parallel(watch, server)
exports.default = parallel(watch, server, sync)
exports.build = series(
  clean,
  views,
  icons,
  images,
  stylesheet,
  scripts,
  schema,
  compress
)
