'use strict';

let settingsFilters = (filterList) => {
    let tpl = '';

    filterList.forEach((filter) => tpl += `<li><a>${filter.name}</a></li>`);

    return `
        <div class="wrapper-list">
            <h4>Filters</h4>
            <ul class="t-f-list">
                ${tpl}
            </ul>
            <button class="add-filter btn btn-primary">Add filter </button>
        </div>
    `;
};

module.exports = settingsFilters;