import Turbolinks from 'turbolinks'
import { Application } from 'stimulus'
import CollectionSlideshow from './controllers/CollectionSlideshow'
import Header from './controllers/Header'

console.log('hello worldss')

Turbolinks.setProgressBarDelay(1300)

const application = Application.start()

application.register('slideshow', CollectionSlideshow)
application.register('header', Header)

export default application
