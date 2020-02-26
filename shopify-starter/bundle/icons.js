import { icons as task } from 'gulp.config'
import { src, dest, lastRun, series } from 'gulp'
import { pipeline } from 'stream'
import changed from 'gulp-changed'
import gulpif from 'gulp-if'
import size from 'gulp-size'
import rename from 'gulp-rename'
import svgsprite from 'gulp-svg-sprite'
import print from '@bundle/plugins/print'
import icons from '@bundle/plugins/icons'
import log from '@bundle/logs/gulp-errors'
import cli from '@bundle/plugins/cli'

/* -------------------------------------------- */
/*                 INLINE ICONS                 */
/* -------------------------------------------- */

export function inline () {

  return pipeline([
    src([
      task.inline.input,
      task.sprite.input
    ], {
      since: lastRun(inline)
    }),
    icons({
      class: 'icon',
      classPrefix: 'icon-'
    },
    {
      plugins: [
        {
          removeUnknownsAndDefaults: {
            keepDataAttrs: false
          }
        },
        {
          addClassesToSVGElement: {
            className: 'icon'
          }
        }
      ]
    }),
    rename({
      prefix: 'icon.',
      extname: '.liquid'
    }),
    gulpif(!cli.force,
      changed(task.inline.output, {
        hasChanged: changed.compareContents
      })),
    print(),
    gulpif(cli.prod || cli.verbose,
      size({
        gzip: true
      })),
    dest(task.inline.output)
  ],
  log)

}

/* -------------------------------------------- */
/*                  ICON SPRITE                 */
/* -------------------------------------------- */

export function sprite () {

  return pipeline([
    src(task.sprite.input, {
      since: lastRun(sprite)
    }),
    icons({
      task: 'sprite',
      class: 'icon',
      classPrefix: 'icon-'
    },
    {
      plugins: [
        {
          removeUnknownsAndDefaults: {
            keepDataAttrs: false
          }
        }
      ]
    }),
    svgsprite({
      svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceIDs: false,
        dimensionAttributes: false,
        rootAttributes: {
          id: 'icons',
          class: 'd-none'
        },
        transform: [
          function (svg) {

            const attr = 'data-turbolinks-permanent'
            const match = 'id="icons"'
            const string = `${match} ${attr}`
            const regex = new RegExp(match, 'gi')

            svg = svg.replace(regex, string)

            return svg

          }
        ]
      },
      mode: {
        shape: {
          dimension: {
            precision: 2,
            attributes: false
          }
        },
        symbol: {
          inline: true,
          dest: '.',
          sprite: 'icons.liquid',
          example: false
        }
      }
    }),
    gulpif(!cli.force,
      changed(task.sprite.output, {
        hasChanged: changed.compareContents
      })),
    print(),
    gulpif(cli.prod || cli.verbose, size()),
    dest(task.sprite.output)
  ],
  log)

}

export default series(sprite, inline)
