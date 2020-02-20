export default class SelectizeToggle {
    constructor (container) {
        this.el = container;
        this.isOpened = false;
        this.handler = this.el.querySelector('[data-handler]');
        return this.init();
    }

    // TODO: Review event delegation
    hideOnClickOutside (element) {
        const outsideClickListener = event => {
            if (!element.contains(event.target) && this.isOpened && event.target.closest(['[data-remove-filter]']) === null && event.target.closest(['[data-filter]']) === null) {
                this.toggle();
                removeClickListener();
            }
            if(!event.target.closest('.js-selectize-input') && event.target.closest('[data-filter]') === null && event.target.closest(['[data-remove-filter]']) === null) {
                // document.body.classList.remove('searcher-is-active');
            }
        }
        const removeClickListener = () => {
            document.removeEventListener('click', outsideClickListener)
        }
        const addClickListener = () => {
            document.addEventListener('click', outsideClickListener)
        }
        addClickListener();
    }

    toggle () {
        this.isOpened = !this.isOpened;

        this.el.classList.toggle('is-active', this.isOpened);
        let event = new CustomEvent('selectize::toggle', {'detail': this.isOpened});
        this.el.dispatchEvent(event);
    }

    bindEvents () {
        this.el.addEventListener('click', (e) => {
            this.hideOnClickOutside(this.el);
             //document.body.classList.add('searcher-is-active');
            if ((e.target.closest('[data-handler]') || e.target.closest(['[data-dismiss]'])) && !e.target.closest('[data-remove-filter]')) {
                this.toggle();
          }
        }, false);
    }

    init () {
        this.bindEvents();
    }
}