import { tns } from 'tiny-slider/src/tiny-slider.js'
import settings from './settings'


class Slider {
    constructor (container, settings) {
        this.container = container
        return this.createSlider(this.container, settings)
    }

    createSlider (container, settings) {
        return tns(Object.assign({ container }, settings || this.getSettings(container)))
    }

    getSettings (container) {
        return settings[container.dataset.settings || 'default']
    }
}

export { Slider as default, settings }


