'use strict';

let mediator = require('../../Mediator.js'),
    tpl = require('../../general/tplModalSettings.js');

class FilterItemView {
    constructor (filter) {
        this.container = document.querySelector(this.selectors.filterList);
        this.filter = filter;
    }

    get selectors () {
        return {
            rejectedBtn: '.btn-toggle.rejected .reject',
            unRejectedBtn: '.btn-toggle.rejected .un-reject',
            activeBtn: '.btn-toggle.active',
            unApply: '.un-apply',
            apply: '.apply',
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
            rejectedBtn = template.querySelector(this.selectors.rejectedBtn),
            unRejectedBtn = template.querySelector(this.selectors.unRejectedBtn);

        apply.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.activeBtn);
            this.selectFilterItemHandler();
            rejectedBtn.classList.remove('disable-btn');
            unRejectedBtn.classList.remove('disable-btn');
        });

        unApply.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.activeBtn);
            this.unSelectFilterItemHandler();
            rejectedBtn.classList.add('disable-btn');
            unRejectedBtn.classList.add('disable-btn');
        });

        rejectedBtn.addEventListener('click', () => {
            this.rejectedFilterItemHandler();
        });

        unRejectedBtn.addEventListener('click', () => {
            this.unRejectedFilterItemHandler();
        });
    }

    toogleSwithBtn (template, selector) {
        let buttons = template.querySelectorAll(selector + ' .btn');

        buttons.forEach((button) => {
            button.classList.toggle('btn-primary');
            button.classList.toggle('btn-default');
            button.classList.toggle('disable-btn');
            button.classList.toggle('able-btn');

        });
    }

    selectFilterItemHandler () {
        mediator.pub('filter:selected', this.filter);
    }
    unSelectFilterItemHandler () {
        mediator.pub('filter:unSelected', this.filter);
    }
    rejectedFilterItemHandler(){
        mediator.pub('filter:reject', this.filter);
    }
    unRejectedFilterItemHandler(){
        mediator.pub('filter:unReject', this.filter);
    }
}

module.exports = FilterItemView;