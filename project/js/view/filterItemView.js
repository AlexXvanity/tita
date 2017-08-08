'use strict';

let mediator = require('../Mediator.js'),
    tpl = require('./tpl/tplModalSettings.js');

class FilterItemView {
    constructor (filter) {
        this.container = document.querySelector(this.selectors.filterList);
        this.filter = filter;
    }

    get selectors () {
        return {
            rejectedBtn: '.btn-toggle.rejected',
            activeBtn: '.btn-toggle.active',
            filterList: '.filter-list'
        };
    }

    render () {
        let filterTitle = this.filter.filterName + ' ' + this.filter.action.toString() + ' ' + this.filter.condition + ' ' + this.filter.grade + '%',
            filterItemTemplate = document.createElement('div');

        filterItemTemplate.innerHTML = tpl.filterItem.replace('{filterTitle}', filterTitle);
        this.activate(filterItemTemplate);
        this.container.appendChild(filterItemTemplate);
    }

    activate (template) {
        let activeBtn = template.querySelector(this.selectors.activeBtn),
            rejectedBtn = template.querySelector(this.selectors.rejectedBtn);

        activeBtn.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.activeBtn);
            this.selectFilterItemHandler();
        });

        rejectedBtn.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.rejectedBtn);
        });
    }

    toogleSwithBtn (template, selector) {
        let buttons = template.querySelectorAll(selector + ' .btn');

        buttons.forEach((button) => {
            button.classList.toggle('active');
            button.classList.toggle('btn-primary');
            button.classList.toggle('btn-default');
        });
    }
    selectFilterItemHandler () {
        mediator.pub('filter:selected', this.filter);
    }
}

module.exports = FilterItemView;