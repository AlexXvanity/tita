'use srtict';
let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js');

class EditGroupView {
    constructor (settings) {
        this.body = document.body;
        this.settings = settings;
    }

    get selectors () {
        return {
            directionDropDown: '.add-group-modal .direction-dropdown',
            closeButton: '.edit-group-modal .close-group-btn',
            save: '.edit-group-modal .save-group-btn',
            modalBackdrop: '.modal-backdrop',
            groupNameInput: '#group-name',
            modal: '.edit-group-modal'
        };
    }

    collectSelectors () {
        this.modal = document.querySelector(this.selectors.modal);
        this.save = document.querySelector(this.selectors.save);
        this.closeButton = document.querySelector(this.selectors.closeButton);
    }

    show () {
        this.addLayover();
        this.body.insertAdjacentHTML('beforeEnd', tpl.addGroupModal);
        this.fillDirectionDropDown();
        this.activate();
    }

    saveGroup (event) {
        event.preventDefault();

        let directionDropDown = document.querySelector(this.selectors.directionDropDown),
            directionValue = directionDropDown.options[directionDropDown.selectedIndex].text,
            groupNameValue = document.querySelector(this.selectors.groupNameInput).value,
            selectedDirection = this.settings.directionList.find((value) => {
                return value.name === directionValue;
            });

        mediator.pub('group:saved', {
            groupdName: groupNameValue,
            direction: selectedDirection
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