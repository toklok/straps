import { sync as task } from 'gulp.config'
import shopifysync from 'shopify-sync'
import cli from '@bundle/plugins/cli'
import { bs } from '@bundle/server'

export function sync (cb) {

  shopifysync(
    'watch',
    {
      target: cli.prod ? 'production' : 'development',
      forceIgnore: true,
      ignore: task.ignore
    },
    function () {

      if (cli.dev && /(\.liquid)/.test(this.file.ext)) {

        return bs.reload()

      }

    }
  )

  cb()

}
