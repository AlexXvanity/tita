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
            // apply.classList.add('disable-btn');
            // unApply.classList.remove('disable-btn');
            // rejectedBtn.classList.remove('disable-btn');
        });

        unApply.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.activeBtn);
            this.unSelectFilterItemHandler();
            // unApply.classList.add('disable-btn');
            // apply.classList.remove('disable-btn');
            // rejectedBtn.classList.add('disable-btn');

        });
        rejectedBtn.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.rejectedBtn);
            this.rejectedFilterItemHandler();
        });
        unRejectedBtn.addEventListener('click', () => {
            this.toogleSwithBtn(template, this.selectors.rejectedBtn);
            this.rejectedFilterItemHandler();
        });
    }

    toogleSwithBtn (template, selector) {
        let buttons = template.querySelectorAll(selector + ' .btn');

        buttons.forEach((button) => {
            button.classList.toggle('btn-primary');
            button.classList.toggle('btn-default');

        });
    }
    classRemove(elem,cls){

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