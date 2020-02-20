export default class Header {
    constructor (container) {
        this.el = container;
        this.isActive = false;
        this.ham = this.el.querySelector('.at-header__ham');
        this.mobileNav = document.querySelector('.at-mobile-nav');
        return this.init();
    }

    toggleNavigation () {
        this.isActive = !this.isActive;
        document.body.classList.toggle('menu-is-open', this.isActive)
    }

    removeBoxShadow () {

    }

    setMobileNavigationPosition () {
        const headerHeight = this.el.getBoundingClientRect().height;
        this.mobileNav.style.height = `calc(100vh - ${headerHeight}px)`;
        this.mobileNav.style.top = `${headerHeight}px`;
    }

    bind () {
        this.setMobileNavigationPosition();
        window.addEventListener('resize', () => {
            this.setMobileNavigationPosition();
        }, {passive: true})
        this.ham.addEventListener('click', ({target}) => {
            this.toggleNavigation()
        })
    }

    init () {
        this.bind();
    }
}