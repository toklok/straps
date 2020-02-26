import { styles as task } from 'gulp.config'
import { src, dest } from 'gulp'
import { pipeline } from 'stream'
import sass from 'gulp-sass'
import gulpif from 'gulp-if'
import size from 'gulp-size'
import cssnano from 'gulp-cssnano'
import log from '@bundle/logs/gulp-errors'
import print from '@bundle/plugins/print'
import cli from '@bundle/plugins/cli'
import { bs } from '@bundle/server'

export function stylesheet () {

  return pipeline([
    src(task.stylesheet.input, {
      sourcemaps: true
    }),
    sass({
      outputStyle: 'compact',
      includePaths: task.stylesheet.include
    }),
    gulpif(cli.prod,
      cssnano({
        autoprefixer: {
          add: true,
          browsers: []
        }
      })),
    dest(task.stylesheet.output, {
      sourcemaps: '.'
    }),
    print(),
    gulpif(cli.prod || cli.verbose,
      size({
        gzip: true
      })),
    gulpif(cli.dev, bs.stream())
  ],
  log)

}
