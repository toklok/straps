import { views as task } from 'gulp.config'
import { src, dest, lastRun } from 'gulp'
import { pipeline } from 'stream'
import changed from 'gulp-changed'
import gulpif from 'gulp-if'
import size from 'gulp-size'
import htmlmin from 'gulp-htmlmin'
import print from '@bundle/plugins/print'
import paths from '@bundle/plugins/paths'
import log from '@bundle/logs/gulp-errors'
import cli from '@bundle/plugins/cli'

export function views () {

  return pipeline([
    src(task.input, {
      since: lastRun(views),
      sourcemaps: true
    }),
    paths(task.paths),
    gulpif(cli.prod,
      htmlmin({
        minifyJS: true,
        collapseWhitespace: true,
        processScripts: 'text/template',
        removeComments: true,
        ignoreCustomFragments: [
          /<=\s*\d+\s*/,
          /-?%}/
        ]
      })),
    gulpif(!cli.force,
      changed(task.output, {
        hasChanged: changed.compareContents
      })),
    print(),
    gulpif(cli.prod || cli.verbose, size()),
    dest(task.output)
  ],
  log)

}
