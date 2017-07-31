'use strict';

let settingsFilters = (filterList) => {
    let tpl = '';

    filterList.forEach((filter) => tpl += `<li><a>${filter.name}</a></li>`);

    return `
        <div class="wrapper-list">Filters
            <ul class="t-f-list">
                ${tpl}
            </ul>
            <button class="add-filter">Add filter </button>
        </div>
    `; 
};

module.exports = settingsFilters;


/*<i class="fa fa-plus-circle add-filter" aria-hidden="true"></i>*/