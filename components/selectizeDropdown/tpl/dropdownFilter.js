export const dropdownFilter = data => `
    <div class="at-selectize-dropdown__filter is-active" data-filter data-code="${data.code}">
        <div class="at-checkbox">
            <label class="at-checkbox__label">
                <span>${data.text}</span>
            </label>
        </div>
    </div>
`;
