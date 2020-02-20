import 'lazysizes'
import 'simplebar'
import plugins from '../components'
import createInstances from '../components/createInstances'

const app = Object.assign(
    { plugins },
    createInstances('.js-slider', 'Slider'),
    createInstances('.js-card-cruise-availability', 'CardCruiseAvailability'),
    createInstances('.js-selectize-input', 'SelectizeInput'),
    createInstances('.js-selectize-select', 'SelectizeSelect'),
    createInstances('.js-header', 'Header'),
    createInstances('.js-tabs', 'Tabs'),
    createInstances('.js-search-summary', 'SearchSummary'),
    createInstances('.js-search-summary', 'SearchSummary'),
    createInstances('.js-modal', 'Modal'),
)

window.app = app
export default app