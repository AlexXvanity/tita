'use strict';

let settingsDropDown = (directionList) => {
    let optionList = '';

    directionList.forEach((direction, i) => {
        optionList += `
            <option ${(i === directionList.length - 1) ? 'selected' : ''} value="${direction.name}">
                ${direction.name}
            </option>
        `;
    });

    return `
            <select class="settings-directions-select direction"> 
                ${optionList}
            </select>
    `;
};

module.exports = settingsDropDown;
