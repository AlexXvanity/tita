'use srtict';
let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js');

class EditGroupView {
    constructor (settings, model) {
        this.body = document.body;
        this.settings = settings;
        this.model = model;
    }

    get selectors () {
        return {
            directionDropDown: '.add-group-modal .direction-dropdown',
            closeButton: '.add-group-modal .close-group-btn',
            save: '.add-group-modal .save-group-btn',
            modalBackdrop: '.modal-backdrop',
            groupNameInput: '#group-name',
            modal: '.add-group-modal'
        };
    }

    collectSelectors () {
        this.modal = this.body.querySelector(this.selectors.modal);
        this.save = this.body.querySelector(this.selectors.save);
        this.closeButton = this.body.querySelector(this.selectors.closeButton);
    }

    show () {
        this.addLayover();
        this.body.insertAdjacentHTML('beforeEnd', tpl.addGroupModal);
        this.fillDirectionDropDown();
        this.collectSelectors();
        this.activate();
    }

    saveGroup (event) {
        event.preventDefault();

        let directionDropDown = document.querySelector(this.selectors.directionDropDown),
            directionValue = directionDropDown.options[directionDropDown.selectedIndex].text,
            groupNameValue = document.querySelector(this.selectors.groupNameInput).value,
            currentGroupName = this.model.name,
            selectedDirection = this.settings.directionList.find((value) => {
                return value.name === directionValue;
            });


        this.model.editGroupInfo({
            groupName: groupNameValue,
            direction: selectedDirection,
            clickedGroupName: currentGroupName
        });

        this.hide();
    }

    hide () {
        let modalBackdrop = document.querySelector(this.selectors.modalBackdrop);

        this.diactivate();
        modalBackdrop.remove();
        this.modal.remove();
    }

    activate () {
        this.save.addEventListener('click', this.saveGroup.bind(this));
        this.closeButton.addEventListener('click', this.hide.bind(this));
    }

    diactivate () {
        this.save.removeEventListener('click', this.saveGroup.bind(this));
        this.closeButton.removeEventListener('click', this.hide.bind(this));
    }

    addLayover () {
        let modalBackdrop = `<div id="div" class="modal-backdrop fade in"></div>`;

        this.body.insertAdjacentHTML('beforeEnd', modalBackdrop);
    }

    fillDirectionDropDown () {
        let options = '',
            directionDropDown = document.querySelector(this.selectors.directionDropDown);

        this.settings.directionList.forEach((direction) => {
            options += `<option>${direction.name}</option>`;
        });

        directionDropDown.innerHTML = options;
    }
}

module.exports = EditGroupView;