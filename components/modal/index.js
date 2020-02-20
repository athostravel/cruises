import { ModalTemplate } from './tpl/modalTemplate';

export default class Modal {

    constructor(container) {
        this.el = container;
        this.init();
    };


    renderFetchedContent (data) {
        const modalTemplate = ModalTemplate(data);
        let parser = new DOMParser();
        let doc = parser.parseFromString(modalTemplate, 'text/html');
        let modal = doc.body.firstChild;
        document.body.appendChild(modal);
        setTimeout(() => {
            modal.classList.add('is-active');
        },100);
        this.bindModalEvents();
    }

    bindModalEvents () {

        const closeModal = ({target}) => {
            if (target.hasAttribute('data-close')) {
                const modal = document.querySelector('.at-modal');
                modal.classList.remove('is-active');
                setTimeout(() => {
                    modal.remove();
                },300);
                removeClickListener();
                document.body.classList.remove('modal-is-active');
            }
        }

        const removeClickListener = () => {
            document.removeEventListener('click', closeModal);
        }

        const addClickListener = () => {
            document.addEventListener('click', closeModal);
        }

        addClickListener();

    }

    fetchContent (url) {
        const headers = new Headers({
            'Content-Type': 'text/html'
        });
        fetch(url, headers)
        .then(response => {
            return response.text()
        }).then (html => {
            this.renderFetchedContent(html)
        })
    }

    openModal() {
        document.body.classList.add('modal-is-active');
        if (this.el.dataset.url) {
            this.fetchContent(this.el.dataset.url);
        }
    };

    bindEvents() {
        this.el.addEventListener('click', this.openModal.bind(this));
    };

    init() {
        this.bindEvents();
    };
}

