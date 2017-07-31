'use srtict';
let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js'),
    FilterAction = require('../../model/FilterAction.js'),
    FilterCondition = require('../../model/FilterCondition.js'),
    Filter = require('../../model/Filter.js'),
    BaseModalView = require('../../view/modal/baseModalView.js');

class AddFilterView extends BaseModalView {
    constructor (group) {
        super(group, tpl.addFilterModal);
    }

    get selectors () {
        return {
            conditionDropDown: '.condition-dropdown',
            actionDropDown: '.action-dropdown',
            testDropDown: '.test-dropdown',
            cancelFilterBtn: '.cancel-filter-btn',
            saveFilterBtn: '.save-filter-btn',
            filterName: '.filter-name-input',
            gradeInput: '.grade-input'
        };
    }

    collectSelectors () {
        this.saveFilterBtn = this.modalContainer.querySelector(this.selectors.saveFilterBtn);
        this.cancelFilterBtn = this.modalContainer.querySelector(this.selectors.cancelFilterBtn);
    }

    initControls () {
        this.initTestDropDown();
        this.initActionDrowDown();
        this.initConditionDropDown();
    }

    activate () {
        this.saveFilterBtn.addEventListener('click', this.saveFilter.bind(this));
        this.cancelFilterBtn.addEventListener('click', this.hide.bind(this));
    }

    diactivate () {
        this.saveFilterBtn.removeEventListener('click', this.saveFilter);
        this.cancelFilterBtn.removeEventListener('click', this.hide);
    }

    saveFilter (event) {
        event.preventDefault();

        let conditionDropDownValue = this.getDropDownValue(this.selectors.conditionDropDown),
            actionDropDownValue = this.getDropDownValue(this.selectors.actionDropDown),
            testDropDown = this.modalContainer.querySelector(this.selectors.testDropDown),
            testDropDownValues = this.getMultipleDropDownValues(testDropDown),
            filterName = document.querySelector(this.selectors.filterName).value,
            grade = this.modalContainer.querySelector(this.selectors.gradeInput).value,
            selectedTests,
            filter;

        selectedTests = this.model.testList.filter((test) => {
            return testDropDownValues.indexOf(test.name) !== -1;
        });

        filter = new Filter(selectedTests, FilterAction[actionDropDownValue], FilterCondition[conditionDropDownValue], grade, filterName);

        mediator.pub('filter:added', filter);
        this.hide();
    }

    initTestDropDown () {
        let options = '';
        this.testDropDown = this.modalContainer.querySelector(this.selectors.testDropDown);

        this.model.testList.forEach((test) => {
            options += `<option>${test.name}</option>`;
        });

        this.testDropDown.innerHTML = options;
    }

    initActionDrowDown () {
        let options = '';
        this.actionDropDown = this.modalContainer.querySelector(this.selectors.actionDropDown);

        for (let prop in FilterAction) {
            options += `<option>${prop}</option>`;
        }

        this.actionDropDown.innerHTML = options;
    }

    initConditionDropDown () {
        let options = '';
        this.conditionDropDown = this.modalContainer.querySelector(this.selectors.conditionDropDown);

        for (let prop in FilterCondition) {
            options += `<option>${FilterCondition[prop]}</option>`;
        }

        this.conditionDropDown.innerHTML = options;
    }
}

module.exports = AddFilterView;