import plugins from '..'

export default (trigger, className, opts) => {
    const obj = {}
    const selectors = document.querySelectorAll(trigger)

    if (selectors) {
        obj[className] = {}
        selectors.forEach((element, i) => obj[className][element.id ? element.id : `${className}${i}`] = new plugins[className](element, opts))
    }

    return obj
}