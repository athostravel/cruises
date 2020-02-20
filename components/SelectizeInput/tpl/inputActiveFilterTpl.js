export const inputActiveFilterTpl = data => `
    <div
        data-code="${data.code}"
        data-remove-filter
        class="at-tag at-tag--filter">
            ${data.text}
            <div class="at-tag__close c-icon c-icon-close"></div>
    </div>
`;
