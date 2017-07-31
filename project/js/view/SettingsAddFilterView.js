'use strict';

let tplSettings = require('./tpl/tpl.settings.js'),
    mediator = require('../Mediator.js');

class SettingsAddFilterView {
    constructor (direction) {
        this.modalContainer = document.querySelector('.modal-container');

        this.renderAddFilterModal(direction);
    }

    renderAddFilterModal (direction) {
        let testListForFilter = [],
            selectedTestsContainer,
            testListContainer,
            saveFilterButton,
            filterNameInput,
            conditionSelect,
            actionSelect,
            gradeInput;

        this.modalContainer.innerHTML = tplSettings.addFilter(direction);

        selectedTestsContainer = this.modalContainer.querySelector('.selected-tests');
        testListContainer = this.modalContainer.querySelector('.tests-for-filter');
        saveFilterButton = this.modalContainer.querySelector('.save-new-filter');
        filterNameInput = this.modalContainer.querySelector('.new-filter-name');
        conditionSelect = this.modalContainer.querySelector('.filter-condition');
        actionSelect = this.modalContainer.querySelector('.filter-action');
        gradeInput = this.modalContainer.querySelector('.filter-grade');
        
        testListContainer.addEventListener('click', (event) => {
            let testName = event.target.innerHTML,
                test = direction.testList.find((test) => testName === test.name);

            if (testListForFilter.every((test) => testName !== test.name)) {
                testListForFilter.push(test);
                selectedTestsContainer.innerHTML += `<li>${testName}</li>`;
            }
        }, false);

        saveFilterButton.addEventListener('click', () => {
            let filterName, action, condition, grade;
                //options = {};

            filterName = filterNameInput.value;
            action = actionSelect.options[actionSelect.selectedIndex].value;
            condition = conditionSelect.options[conditionSelect.selectedIndex].value;
            grade = gradeInput.value;

            direction.addFilter(testListForFilter, action, condition, grade, filterName);
            mediator.pub('filter:created');
        }, false);
    }
}

module.exports = SettingsAddFilterView;