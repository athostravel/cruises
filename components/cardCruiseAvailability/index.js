import Slider from '../slider'
import Tabs from '../tabs'
import Modal from '../modal'
import GLightbox from 'glightbox'

export default class CardCruiseAvailability {
    constructor (container) {
        this.container = container
        this.monthTrigger = '.js-card-cruise-availability__month'
        this.gallerySliderTrigger = '.js-card-cruise-availability__gallery-slider'
        this.monthsSliderTrigger = '.js-card-cruise-availability__slider-months'
        this.daysSliderTrigger = '.js-card-cruise-availability__days-slider'
        this.togglePricesBtn = '.js-card-cruise-availability__toggle-prices'
        this.togglePricesBox = '.js-card-cruise-availability__toggle-prices-box'
        this.mapBox = '.js-card-cruise-availability__map-box'
        this.map = '.js-card-cruise-availability__map'
        this.tabsTrigger = '.js-card-cruise-availability__tabs'
        this.closeTabsTrigger = '.js-card-cruise-availability__close-tabs'
        this.galleryPhoto = 'js-card-cruise-availability__gallery'
        this.modalTrigger = '.js-card-cruise-availability__modal'
        this.tabs = this.initTabs()
        this.gallerySlider = this.initGallerySlider()
        this.monthsSlider = this.initMonthsSlider()
        this.daysSlider = this.initDaysSlider()
        this.gallery = this.initLightBox()
        this.clonedMap = false
        return this.init()
    }

    init () {
        this.initDates()
        this.togglePrices()
        this.toggleMapListener()
        this.closeTabsListener()
        this.initModals()
    }

    initModals () {
        this.container.querySelectorAll(this.modalTrigger).forEach((modal) => {
            new Modal(modal)
        })
    }

    initLightBox () {
        return GLightbox({
            selector: this.galleryPhoto
        })
    }

    closeTabsListener () {
        this.container.querySelectorAll(this.closeTabsTrigger).forEach((btn) => {
            btn.addEventListener('click', () => {
                this.tabs.resetTabs()
            })
        })
    }

    initTabs () {
        return new Tabs(this.container.querySelector(this.tabsTrigger))
    }

    toggleMapListener () {
        this.toggleMapToSlider(this.container.querySelector(this.mapBox))

        window.addEventListener('resize', () => {
            this.toggleMapToSlider(this.container.querySelector(this.mapBox))
        }, { passive:true })
    }

    toggleMapToSlider (mapBox) {
        if (this.gallerySlider && !this.clonedMap && getComputedStyle(mapBox).display == 'none') {
            this.appendMapToSlider(mapBox)
        } else if (this.gallerySlider && this.clonedMap && getComputedStyle(mapBox).display == 'block') {
            this.removeMapToSlider(mapBox)
        }
    }

    appendMapToSlider (mapBox) {
        this.gallerySlider.destroy()
        this.container.querySelector(this.gallerySliderTrigger).insertAdjacentHTML('afterbegin', `
            <div class="at-slider__item cloned-map">
                ${mapBox.innerHTML}
            </div>
        `)
        this.gallerySlider = this.gallerySlider.rebuild()
        this.clonedMap = true
    }

    removeMapToSlider () {
        this.gallerySlider.destroy()
        this.container.querySelector('.cloned-map').remove()
        this.gallerySlider = this.gallerySlider.rebuild()
        this.clonedMap = false
    }

    setOverflowBody (element, activeClass) {
        if (element.classList.contains(activeClass)) {
            document.querySelector('body').style.overflowY = 'hidden'
        } else {
            document.querySelector('body').style.overflowY = 'auto'
        }
    }

    toggleBox (btn, box) {
        this.container.querySelectorAll(btn).forEach((item) => {
            item.addEventListener('click', (e) => {
                const currentBox = this.container.querySelector(box)
                currentBox.classList.toggle('is-active')
                this.setOverflowBody(currentBox, 'is-active')
                this.rebuildPriceSlider()
            })
        })

    }

    togglePrices () {
        this.toggleBox(this.togglePricesBtn, this.togglePricesBox)
    }

    rebuildPriceSlider () {
        this.monthsSlider.destroy()
        this.monthsSlider = this.monthsSlider.rebuild()
        this.daysSlider.destroy()
        this.daysSlider = this.daysSlider.rebuild()
        this.initDates()
    }

    initDates () {
        this.daysSliderListener()
        this.monthsSliderListener()
        this.selectMonth()
    }

    selectMonth () {
        const parent = this.container.querySelector(this.monthsSliderTrigger)

        if (parent) {
            parent.addEventListener('click', (e) => {
                const element = e.target.closest(this.monthTrigger)

                if (element) {
                    const firstDayOfSelectedMonth = [...this.daysSlider.getInfo().slideItems].findIndex(slide => element.dataset.month === slide.dataset.month);
                    const currentIndex = [...this.monthsSlider.getInfo().slideItems].findIndex(slide => element.parentNode === slide);
                    this.monthsSlider.goTo(currentIndex)

                    if (firstDayOfSelectedMonth > -1) {
                        this.daysSlider.goTo(firstDayOfSelectedMonth)
                    }

                    this.toggleMonthActiveClass(element)
                }
            })
        }
    }

    daysSliderListener () {
        if (this.daysSlider) {
            this.daysSlider.events.on('indexChanged', () => this.activeMonth(this.daysSlider.getInfo()))
        }
    }

    monthsSliderListener () {
        if (this.monthsSlider) {
            this.monthsSlider.events.on('indexChanged', (slider) => {
                slider.slideItems[slider.index].querySelector(this.monthTrigger).click()
            })
        }
    }

    toggleMonthActiveClass (element) {
        if (element) {
            this.container.querySelectorAll(this.monthTrigger).forEach(element => { element.classList.remove('at-price-box--border') })
            element.classList.add('at-price-box--border')
        }
    }

    activeMonth (slider) {
        if (this.monthsSlider) {
            const monthIndex = [...this.monthsSlider.getInfo().slideItems].findIndex((slide) => {
                const monthSelector = `${this.monthTrigger}[data-month="${slider.slideItems[slider.index].dataset.month}"]`
                const monthElement = slide.querySelector(monthSelector)

                if (monthElement) {
                    return slide === monthElement.parentNode
                }
            })

            this.monthsSlider.goTo(monthIndex)
        }

        this.toggleMonthActiveClass(this.container.querySelector(`${this.monthTrigger}[data-month="${slider.slideItems[slider.index].dataset.month}"]`))
    }

    getControlsContainer (selector) {
        return this.container.querySelector(selector) || false
    }

    initSlider (selector, settings) {
        const element = this.container.querySelector(selector)

        if (element) {
            return new Slider(element, settings)
        }
    }

    initGallerySlider () {
        if (this.gallerySlider) this.gallerySlider.destroy()
        return this.initSlider(this.gallerySliderTrigger, {
            items: 1,
            autoplay: false,
            loop: false,
            controls: false,
            mouseDrag: true,
            mode: 'gallery'
        })
    }

    initMonthsSlider () {
        if (this.monthsSlider) this.monthsSlider.destroy()
        return this.initSlider(this.monthsSliderTrigger, {
            items: 1,
            autoplay: false,
            loop: false,
            nav: false,
            autoWidth: true,
            controls: true,
            mouseDrag: true,
            gutter: 8,
            controlsContainer: this.getControlsContainer('.at-slider-months__controls')
        })
    }

    initDaysSlider () {
        if (this.daysSlider) this.daysSlider.destroy()
        return this.initSlider(this.daysSliderTrigger, {
            items: 1,
            controls: true,
            loop: false,
            nav: false,
            mouseDrag: true,
            controlsContainer: this.getControlsContainer('.at-slider-table-prices__controls'),
            responsive: {
                500: { items: 2 },
                700: { items: 3 },
                900: { items: 4 }
            },
            onInit: (slider) => {
                this.activeMonth(slider)
            }
        })
    }
}