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
            unApply: '.btn-toggle.active .un-apply',
            apply: '.btn-toggle.active .apply',
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
        let unApply = template.querySelector(this.selectors.unApply),
            apply = template.querySelector(this.selectors.apply),
            rejectedBtn = template.querySelector(this.selectors.rejectedBtn);

        apply.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.activeBtn);
            this.selectFilterItemHandler();
        });

        unApply.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.activeBtn);
            this.unSelectFilterItemHandler();
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
    unSelectFilterItemHandler () {
        mediator.pub('filter:unSelected', this.filter);
    }
}

module.exports = FilterItemView;