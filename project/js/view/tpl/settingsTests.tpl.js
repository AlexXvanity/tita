'use strict';

let settingsTests = (testList) => {
    let tpl = '';
   
    testList.forEach((test) => tpl += `<li><a>${test.name}</a></li>`);
    
    return `
        <div class="wrapper-list" >Tests
            <ul class="t-f-list">
                ${tpl}
            </ul>
            <div class="new-test-input"> </div>
            <input type="text" class="new-test-name" placeholder="New test" size="8">
            <button disabled class="save-new-test">Add</button>
        </div>
    `; 
};

module.exports = settingsTests;

/* <i class="fa fa-plus-circle add-test" aria-hidden="true"></i>*/