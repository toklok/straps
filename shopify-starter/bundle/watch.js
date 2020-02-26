import { watch } from 'gulp'
import { styles, json, views, images, scripts, icons } from 'gulp.config'
import { inline, sprite } from '@bundle/icons'
import { schema } from '@bundle/schema'
import { images as image } from '@bundle/images'
import { views as view } from '@bundle/views'
import { stylesheet } from '@bundle/styles'
import { esm, iife } from '@bundle/scripts'
import brand from '@bundle/plugins/brand'

/* -------------------------------------------- */
/*                     WATCH                    */
/* -------------------------------------------- */

export default function Watch (cb) {

  brand()

  watch(styles.stylesheet.watch, stylesheet)
  watch(json.schema.watch, schema)
  watch(views.watch, view)
  watch(images.watch, image)
  watch(scripts.esm.watch, esm)
  watch(scripts.iife.watch, iife)
  watch(icons.inline.watch, inline)
  watch(icons.sprite.watch, sprite)

  cb()

}
