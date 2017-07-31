'use strict';

let settingsTestsForFilter = (testList) => {
    let tpl = '';
   
    testList.forEach((test) => tpl += `<div class="test-for-filter">${test.name}</div>`);
    
    return `
        <div class="tests-for-filter">
            ${tpl}
        </div>
    `; 
};

module.exports = settingsTestsForFilter;