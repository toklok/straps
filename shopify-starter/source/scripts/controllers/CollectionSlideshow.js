import { Controller } from 'stimulus'
import Siema from 'siema'

/**
 * State
 */
let startIndex = 0

export default class extends Controller {

  /**
   * Stimulus Targets
   *
   * @static
   * @memberof Slideshow
   */
  static targets = [
    'slide',
    'slides'
  ]

  /**
   * Stimulus Initialize
   */
  initialize () {

    this.slider = new Siema({
      startIndex,
      selector: this.slidesTarget,
      duration: 300,
      easing: 'ease-out',
      onChange: this.onChange.bind(this),
      perPage: {
        0: 2,
        480: 2,
        768: 3,
        1100: 5,
        1400: 6
      }
    })

  }

  /**
   * Stimulus Connect
   */
  connect () {

    this.hydrate()

  }

  /**
   * Stimulus Disconnect
   */
  disconnect () {

    this.slider.destroy()

  }

  /**
   * Reset
   * Executes on the Turbolinks `before-cache` event
   */
  reset () {

    this.slider.destroy(true)

  }

  /**
   * Hydrate
   * Modifies the SSR content
   */
  hydrate () {

    if (this.slider.selector.classList.contains('row')) {

      this.slider.selector.classList.remove('row')
      this.slideTargets.forEach(({ classList }) => classList.remove('d-none'))

    }

  }

  /**
   * Siema
   * Next Button
   */
  next () {

    this.slider.next()

  }

  /**
   * Siema
   * Previous Button
   */
  prev () {

    this.slider.prev()

  }

  /**
   * Siema
   * onChange event
   */
  onChange () {

    startIndex = this.slider.currentSlide

  }

}
