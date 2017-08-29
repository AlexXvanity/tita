'use strict';

let settingsTests = (testList) => {
    let tpl = '';

    testList.forEach((test) => tpl += `<li><a>${test.name}</a></li>`);

    return `
        <div class="wrapper-list" >
           <h4>Tests</h4>
            <ul class="t-f-list">
                ${tpl}
            </ul>
            <div class="new-test-input"> 
                <input type="text" class="new-test-name input" placeholder="test name" size="8">
                <input type="text" class="new-test-grade input" placeholder="test grade" size="8">
                <button disabled class="save-new-test btn btn-primary">Add</button>
            </div>
        </div>
    `;
};

module.exports = settingsTests;

/* <i class="fa fa-plus-circle add-test" aria-hidden="true"></i>*/