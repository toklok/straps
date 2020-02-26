import { json } from 'gulp.config'
import { src, dest, lastRun } from 'gulp'
import { pipeline } from 'stream'
import changed from 'gulp-changed'
import gulpif from 'gulp-if'
import size from 'gulp-size'
import print from '@bundle/plugins/print'
import log from '@bundle/logs/gulp-errors'
import cli from '@bundle/plugins/cli'

export function schema () {

  return pipeline([
    src(json.schema.input, {
      since: lastRun(schema)
    }),
    gulpif(!cli.force,
      changed(json.schema.output, {
        hasChanged: changed.compareContents
      })),
    print(),
    gulpif(cli.prod || cli.verbose, size()),
    dest(json.schema.output)
  ],
  log)

}
