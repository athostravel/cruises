export default class SearchSummary {
    constructor (container) {
        this.el = container;
        this.searcherIsActive = false;
        this.toggle = this.el.querySelector('[data-toggle-searcher]');
        this.searcher = this.el.querySelector('.at-search-summary__searcher');
        return this.init();
    }

    toggleSearcher () {
        this.searcherIsActive = !this.searcherIsActive;
        document.body.style.overflow = this.searcherIsActive ? 'hidden' : 'auto';
        this.searcher.classList.toggle('is-active', this.searcherIsActive);
    }

    bind () {
        document.addEventListener('click', ({target}) => {
            if(target.closest('[data-toggle-searcher]')) {
                this.toggleSearcher();
            }
        });
    }

    init () {
        this.bind();
    }
}