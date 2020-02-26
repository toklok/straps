import { scripts as task } from 'gulp.config'
import { parallel } from 'gulp'
import { rollup } from 'rollup'
// import includepaths from 'rollup-plugin-includepaths'
import buble from 'rollup-plugin-buble'
import babel from 'rollup-plugin-babel'
// import url from 'rollup-plugin-url'
import noderesolve from 'rollup-plugin-node-resolve'
import depinject from 'rollup-plugin-dep-inject'
import commonjs from 'rollup-plugin-commonjs'
import esiife from 'rollup-plugin-iife'
import filesize from 'rollup-plugin-filesize'
import logs from '@bundle/logs/rollup-errors'
import print from '@bundle/plugins/print'
import cli from '@bundle/plugins/cli'
import inline from '@bundle/plugins/inline'
import { bs } from '@bundle/server'

let cache
let injected = false

export async function esm () {

  console.log('here')
  const bundle = await rollup({
    input: task.esm.input,
    external: task.esm.external || [],
    cache,
    plugins: [
      cli.dev && !injected && depinject(task.esm.plugins.depinject),
      noderesolve(),
      babel({
        runtimeHelpers: true,
        exclude: 'node_modules/**'
      }),
      commonjs(),
      buble({
        transforms: {
          forOf: false
        }
      }),
      cli.prod && (await import('rollup-plugin-terser')).terser(),
      (cli.prod || cli.verbose) && filesize()
    ],
    onwarn (warning) {

      if (warning.code === 'THIS_IS_UNDEFINED') {

        return

      }

      console.error(warning.message)

    }
  })

  await bundle
  .write(task.esm.output)
  .then(data => {

    if (!injected) {

      injected = true

    }

    return data.output.map(value => {

      print({
        filename: value.fileName,
        through2: false
      })

    })

  })
  .then(() => bs.reload())

}

/**
 * IIFE Bundle
 *
 * Scripts are exported as IIFE functions
 * using `rollup-plugin-iife`.
 *
 */
export async function iife () {

  let cache

  const bundle = await rollup({
    cache,
    input: task.iife.input,
    watch: task.iife.watch,
    plugins: [
      noderesolve(),
      commonjs(),
      buble({
        transforms: {
          forOf: false
        }
      }),
      cli.prod && (await import('rollup-plugin-terser')).terser(),
      esiife({
        prefix: 'init'
      }),
      (cli.prod || cli.verbose) && filesize(),
      inline()
    ],
    onwarn (warning) {

      if (warning.code === 'THIS_IS_UNDEFINED') {

        return

      }

      console.error(warning.message)

    }
  }).catch(logs)

  await bundle
  .write(task.iife.output)
  .then(data => {

    data.output.map(value =>
      print({
        filename: value.fileName,
        through2: false
      }))

  })
  .then(() => bs.reload())

}

export default parallel(esm, iife)
