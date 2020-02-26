import { clean as task } from 'gulp.config'
import { promises } from 'fs'
import del from 'del'
import print from '@bundle/plugins/print'

async function mkdir (directory) {

  try {

    await promises
    .mkdir(directory, {
      recursive: true
    })
    .then(() =>
      print({
        timestamp: true,
        filename: directory,
        through2: false,
        color: 'greenBright',
        title: 'Reset'
      }))

  } catch (err) {

    if (err.code !== 'EEXIST') throw err

  }

}

export async function clean () {

  const { directory, structure } = task
  const deleted = await del(`${directory}/**/**`)

  deleted.map(dir =>
    print({
      timestamp: true,
      filename: dir,
      through2: false,
      color: 'greyBright',
      title: 'Wiped'
    }))

  structure.map(dir => mkdir(`${directory}/${dir}`))

}

export default clean
