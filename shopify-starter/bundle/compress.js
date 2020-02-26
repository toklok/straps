import { compress as task } from 'gulp.config'
import { src, dest } from 'gulp'
import { pipeline } from 'stream'
import zip from 'gulp-zip'
import log from '@bundle/logs/gulp-errors'
import cli from '@bundle/plugins/cli'
import print from '@bundle/plugins/print'

/* -------------------------------------------- */
/*                  EXPORT TASK                 */
/* -------------------------------------------- */

export function compress () {

  return pipeline([
    src(`${task.input}/**/**`),
    zip(cli.prod ? 'production.zip' : 'development.zip'),
    dest(`${task.output}`),
    print({
      color: 'blue'
    })
  ],
  log)

}
