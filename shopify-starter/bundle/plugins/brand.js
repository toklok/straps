import { shop } from 'gulp.config'
import figlet from 'figlet'
import chalk from 'chalk'

export default function () {

  const ascii = figlet.textSync(shop.toUpperCase(), {
    font: 'Speed',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })

  return console.log(chalk`{cyanBright ${ascii}}`)

}
