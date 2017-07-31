'use strict';

let mediator = require('../Mediator.js'),
    tpl = require('./tpl/tplModalSettings.js');

class FilterListView {
    constructor () {
        this.selectedGroup = null;
        this.filterSection = document.querySelector(this.selectors.filterSection);
        this.render();
        this.addFilterBtn = this.filterSection.querySelector(this.selectors.addFilterBtn);
    }

    get selectors () {
        return {
            filterSection: '#filter-section',
            addFilterBtn: '.add-custom-filter',
            filterList: '.filter-list'
        };
    }

    activate () {
        let addFilterBtn = document.querySelector(this.selectors.addFilterBtn);

        mediator.sub('group:selected', this.clearFilterListHandler.bind(this));

        addFilterBtn.addEventListener('click', () => {
            mediator.pub('addFilterView:render');
        });
    }

    render () {
        this.filterSection.innerHTML = tpl.filterSection;

        this.activate();
    }

    clearFilterListHandler (group) {
        this.selectedGroup = group;
        this.addFilterBtn.classList.add('show');
        document.querySelector(this.selectors.filterList).innerHTML = '';
    }
}

module.exports = FilterListView;