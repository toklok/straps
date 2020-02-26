import { server as task } from 'gulp.config'
import browsersync from 'browser-sync'
import fs from 'fs'
import print from '@bundle/plugins/print'

const sync = fs.readFileSync('.shopifysync.json')
const { targets } = JSON.parse(sync)
const shop = targets.filter(({ target_name }) => target_name === 'development')

export const bs = browsersync.create()
export function server (cb) {

  bs.init({
    proxy: `${shop[0].primary_domain}/?preview_theme_id=${shop[0].theme_id}`,
    logPrefix: print({
      timestamp: true
    }),
    files: task.files,
    serveStatic: task.serveStatic,
    notify: false,
    open: false,
    https: task.https,
    reloadOnRestart: true,
    ui: {
      port: 4000
    },
    snippetOptions: {
      rule: {
        match: /<\/head>/,
        fn: (snippet, match) => snippet + match
      }
    },
    rewriteRules: [
      {
        match: /(<link href=)(.*?)\/\/(cdn.shopify.com)(.*?)(stylesheet.css)/,
        fn: () => '<link href="/stylesheet.css'
      },
      {
        match: /(?:<script async src="\/\/cdn.shopify.com.*?\/assets\/.*?.js)/,
        fn: () => '<script async src="/bundle.js'
      }
    ]
  })

  cb()

}
