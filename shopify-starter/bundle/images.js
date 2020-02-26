import { images as task } from 'gulp.config'
import { src, dest, lastRun } from 'gulp'
import { pipeline } from 'stream'
import changed from 'gulp-changed'
import imagemin from 'gulp-imagemin'
import flatten from 'gulp-flatten'
import gulpif from 'gulp-if'
import log from '@bundle/logs/gulp-errors'
import cli from '@bundle/plugins/cli'

/* -------------------------------------------- */
/*                    IMAGES                    */
/* -------------------------------------------- */

export function images () {

  return pipeline([
    src(task.input, {
      since: lastRun(images)
    }),
    flatten(),
    changed(task.input),
    imagemin(),
    gulpif(!cli.force,
      changed(task.output, {
        hasChanged: changed.compareContents
      })),
    dest(task.output)
  ],
  log)

}

export default images
