import SelectizeToggle from '../selectizeToggle';
import SelectizeDropdown from "../selectizeDropdown";

export default class SelectizeSelect {
    constructor (container) {
        this.el = container;
        this.isOpened = false;
        this.selectizeToggle = new SelectizeToggle(this.el);
        this.selectizeDropdown = new SelectizeDropdown(this.el.querySelector('.js-selectize-dropdown'),this.el.id);
        this.defaultValue = this.el.querySelector('[data-default-value]');
        this.defaultValueText = this.defaultValue.innerHTML;
        this.removeFilters = this.el.querySelector('[data-remove-all]');
        this.selectedFilters = [];
        return this.init();
    }

    getFiltersLength (){
        return this.selectedFilters.length
    }

    renderActiveFiltersOnLoad () {
        if (this.selectizeDropdown.selectedFilters.length > 0) {
            this.selectedFilters = this.selectizeDropdown.selectedFilters;
            this.changeDefaultValue();
            this.addClassIfIsFilled();
         }
    }

    changeDefaultValue () {
        if (this.getFiltersLength() > 0) {
            if (this.getFiltersLength() > 1) {
                this.defaultValue.innerHTML = this.defaultValueText + `<span>${this.getFiltersLength()}</span>`;
            } else {
                this.defaultValue.innerHTML = this.selectedFilters[this.getFiltersLength() - 1].text;
            }
        } else {
            this.defaultValue.innerHTML = this.defaultValueText;
        }
    }

    addClassIfIsFilled () {
        this.el.classList.toggle('is-filled', this.getFiltersLength() > 0);
    }

    bind () {
        this.el.addEventListener('selectize::filter', ({detail}) => {
            this.selectedFilters = detail.filters;
            this.changeDefaultValue();
            this.addClassIfIsFilled();
        }, true);

        this.el.addEventListener('selectize::toggle', ({isOpened}) => {
            this.isOpened = isOpened;
            this.selectizeDropdown.toogle();
         }, true);

         this.el.addEventListener('click', ({target}) => {
            if(target.closest('[data-remove-all]')) {
                this.selectizeDropdown.selectedFilters.forEach(filter => {
                    this.selectizeDropdown.toggleFilter(filter.node);
                });
            }
         })
    }

    init () {
        this.bind();
        this.renderActiveFiltersOnLoad();
    }
}