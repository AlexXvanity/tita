'use srtict';
let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js'),
    Direction = require('../../model/Direction.js'),
    Group = require('../../model/Group.js'),
    BaseModalView = require('../../view/modal/baseModalView.js');

class AddGroupView extends BaseModalView {
    constructor (settings) {
        super(settings, tpl.addGroupModal);
    }

    get selectors () {
        return {
            directionDropDown: '.direction-dropdown',
            closeButton: '.close-group-btn',
            groupNameInput: '#group-name',
            save: '.save-group-btn'
        };
    }

    collectSelectors () {
        this.save = this.modalContainer.querySelector(this.selectors.save);
        this.closeButton = this.modalContainer.querySelector(this.selectors.closeButton);
    }

    initControls () {
        this.fillDirectionDropDown();
    }

    saveGroup (event) {
        event.preventDefault();

        let directionValue = this.getDropDownValue(this.selectors.directionDropDown),
            groupNameValue = this.modalContainer.querySelector(this.selectors.groupNameInput).value,
            selectedDirection = directionValue !== 'Other' ? this.model.directionList.find((value) => {
                return value.name === directionValue;
            }) : new Direction('Other');

        mediator.pub('group:saved', new Group(groupNameValue, selectedDirection));

        this.hide();
    }

    activate () {
        this.save.addEventListener('click', this.saveGroup.bind(this));
        this.closeButton.addEventListener('click', this.hide.bind(this));
    }

    diactivate () {
        this.save.removeEventListener('click', this.saveGroup.bind(this));
        this.closeButton.removeEventListener('click', this.hide.bind(this));
    }

    fillDirectionDropDown () {
        let options = '',
            directionDropDown = this.modalContainer.querySelector(this.selectors.directionDropDown);

        this.model.directionList.forEach((direction) => {
            options += `<option>${direction.name}</option>`;
        });
        directionDropDown.insertAdjacentHTML('afterbegin', options);
    }
}

module.exports = AddGroupView;