import SelectizeToggle from '../selectizeToggle';
import SelectizeDropdown from '../selectizeDropdown';
import {inputActiveFilterTpl} from './tpl/inputActiveFilterTpl';
// import events from '../../utils/events';

export default class SelectizeInput {
    constructor (container) {
        this.el = container;
        this.isOpened = false;
        this.selectizeToggle = new SelectizeToggle(this.el);
        this.selectizeDropdown = new SelectizeDropdown(this.el.querySelector('.js-selectize-dropdown'), this.el.id);
        this.filtersPlaceholder = this.el.querySelector('[data-current-filters]');
        this.defaultValue = this.el.querySelector('[data-default-value]');
        this.input = this.el.querySelector('[data-input]');
        this.filters = [];
        return this.init();
    }

    resetFilters () {
        this.filtersPlaceholder.innerHTML = '';
    }

    renderActiveFilters () {
        let filters = '';
        this.resetFilters();

        this.filters.forEach(filter => {
            filters += inputActiveFilterTpl(filter);
        });

        this.filtersPlaceholder.innerHTML = filters;
    }

    toggleDefaultValueVisibility () {
        if(this.selectizeDropdown.getSelectedFiltersLength() > 0 || this.isOpened) {
            this.defaultValue.style.display = "none";
        } else {
            this.defaultValue.style.display = "block";
        }
    }

    focusToInput () {
        this.input.focus();
    }

    renderActiveFiltersOnLoad () {
        if (this.selectizeDropdown.selectedFilters.length > 0) {
            this.filters = this.selectizeDropdown.selectedFilters;
            this.renderActiveFilters();
            this.toggleDefaultValueVisibility();
         }
    }

    bind () {
        this.el.addEventListener ('click', ({target}) => {
            if (target.closest('[data-remove-filter]')) {
                this.selectizeDropdown.toggleFilter(target.closest('[data-remove-filter]'));
            }
        }, false);


        this.el.addEventListener('selectize::filter', ({detail}) => {
            this.filters = detail.filters;
            this.renderActiveFilters();
            this.toggleDefaultValueVisibility();
            this.focusToInput();
         }, true);

         this.el.addEventListener('selectize::toggle', ({detail}) => {
             this.isOpened = detail;
             this.focusToInput();
             this.toggleDefaultValueVisibility();
             this.selectizeDropdown.toogle();
         }, true)
    }

    init () {
        this.bind();
        this.renderActiveFiltersOnLoad();
    }
}