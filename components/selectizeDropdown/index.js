import {dropdownFilterWrapper} from './tpl/dropdownFilterWrapper';
import {dropdownFilter} from './tpl/dropdownFilter';

export default class SelectizeDropdown {
    constructor (container, id) {
        this.el = container;
        this.id = id;
        this.isOpened = false;
        this.filters = this.el.querySelectorAll('[data-filter]');
        this.dropdownPlaceholder = this.el.querySelector('[data-dropdown-placeholder]');
        this.dropdownPlaceholderItems = this.el.querySelector('[data-dropdown-placeholder-items]');
        this.filterGroup = this.el.querySelector('[data-filter-group]');
        this.selectedFilters = [];

        return this.init();
    }

    toogle () {
        this.isOpened = !this.isOpened;
        this.el.classList.toggle('is-active', this.isOpened)
    }

    getSelectedFiltersLength () {
        return this.selectedFilters.length
    }

    resetFilters () {
        this.dropdownPlaceholderItems.innerHTML = '';
        this.dropdownPlaceholder.classList.remove('is-active');
    }

    renderSelectedFilters () {
        let dropdownSelected = '';
        this.resetFilters();
        this.selectedFilters.forEach(option => {
            dropdownSelected += dropdownFilter(option)
        });

        if(this.getSelectedFiltersLength() > 0) {
            this.dropdownPlaceholder.classList.add('is-active');
            this.dropdownPlaceholderItems.innerHTML = dropdownFilterWrapper(dropdownSelected);
        }
    }

    removeFilter (filter) {
        this.selectedFilters = this.selectedFilters.filter(selectedFilters => selectedFilters.code !== filter.dataset.code);
        this.resetFilterActive(filter.dataset.code);
    }

    addFilter (filter) {
        this.selectedFilters.push(
                {
                    code: filter.dataset.code,
                    text: filter.dataset.text,
                    node: filter
                }
        )
    }

    filterManager (filter, filterIsSelected) {
        filter.classList.toggle('is-active', !filterIsSelected);
        if (filterIsSelected) {
            this.removeFilter(filter);
        } else {
            this.addFilter(filter);
        }
    }

    toggleFilterGroupVisibility (filter) {
        const parent = filter.closest('[data-filter-group]');
        if (parent) {
            const getTotal = parent.querySelectorAll('[data-filter]');
            const getTotalActive = [...getTotal].filter(item => item.classList.contains('is-active'));
            const allFiltersAreSelectd = getTotalActive.length === getTotal.length;
            parent.classList.toggle('is-hidden', allFiltersAreSelectd)
        }
    }

    resetFilterActive (code) {
        const active = document.querySelectorAll(`[data-code="${code}"].is-active`);
        active.forEach(filter => {
            filter.classList.remove('is-active');
            this.toggleFilterGroupVisibility(filter);
        })
    }

    filterIsSelected (filter) {
        return this.selectedFilters.some(filters => filters.code === filter.dataset.code);
    }

    toggleFilter (filter) {
        this.filterManager(filter, this.filterIsSelected(filter));
        this.renderSelectedFilters();
        this.toggleFilterGroupVisibility(filter);
        let event = new CustomEvent('selectize::filter',
            {
                'detail': {
                    'node': filter,
                    'filters': this.selectedFilters,
                    'id': this.id
                }
            }
        );
        this.el.dispatchEvent(event);
    }


    getActiveFiltersOnLoad () {
        const activeFiltersOnLoad = [...this.filters].filter(filter => filter.classList.contains('is-active'));
        activeFiltersOnLoad.forEach(el => {
            this.toggleFilter(el);
        })
    }

    bind () {
        this.el.addEventListener('click', ({target}) => {
            if (target.closest('[data-filter]')) {
                this.toggleFilter(target.closest('[data-filter]'));
           }
        })
    }

    init () {
        this.bind();
        this.getActiveFiltersOnLoad();
    }
}