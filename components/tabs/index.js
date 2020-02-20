export default class Tabs {
    constructor (container, trigger) {
        this.container = container
        this.trigger = trigger ? trigger : '.js-tabs'
        this.closeTabs = this.resetTabs()
        return this.init()
    }

    resetTabs () {
        this.container.querySelectorAll('[data-tab], [data-tab-content]').forEach(tab => {
            tab.classList.remove('is-active')
        });
    }

    openTab (tab) {
        this.resetTabs()
        tab.classList.add('is-active')
        this.container.querySelector(`[data-tab-content="${tab.dataset.tab}"]`).classList.add('is-active')
    }

    bindEvents() {
        this.container.addEventListener('click', (event) => {
            const element = event.target.closest('[data-tab]')

            if (element && element.closest(this.trigger) === this.container.closest(this.trigger)) {
                this.openTab(element)
            }
        });
    }

    init () {
        this.bindEvents()
    }
}