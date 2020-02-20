export const ModalTemplate = data => `
    <div class="at-modal">
        <div class="at-modal__inner">
            <div class="at-modal__content">
                <div class="at-modal__close c-icon c-icon-close" data-close></div>
                ${data}
            </div>
        </div>
        <div data-close class="at-modal__overlay"></div>
    </div>
`;