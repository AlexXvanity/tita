'use strict';

let tplSettings = require('./tpl.settings.js'),
    settingsTestsForFilter = require('./settingsTestsForFilter.tpl.js');


let settingsAddFilter = (direction) => {
    return `
        <div class="settings-add-filter"> 
            <div class="add-filter-containerA">
                <div> Direction: ${direction.name} </div>
                <div class="tests-container">
                    ${settingsTestsForFilter(direction.testList)}
                </div>
            </div>
            <div class="add-filter-containerA tests-container">
                <input type="text" class="new-filter-name" placeholder="New filter name" size="10">
                <p> Selected tests: </p>
                <ul class="selected-tests"></ul>
            </div>
            <div class="add-filter-containerA tests-container">
                <select class="filter-action">
                    <option selected value="AVG"> average </option>
                    <option value="SUM"> sum </option>
                    <option value="EQUAL"> equal </option>
                </select>
                <select class="filter-condition">
                    <option selected value=">"> greater </option>
                    <option value="<"> less </option>
                    <option value="="> equal </option>
                </select>
                <input type="text" class="filter-grade" placeholder="Grade" size="2">
                <button class="save-new-filter">save</button>
            </div>
        </div>
    `;
};

module.exports = settingsAddFilter;