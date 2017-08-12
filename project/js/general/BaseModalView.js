'use strict';

class BaseModalView {
    constructor (model, template) {
        this.model = model;
        this.body = document.body;
        this.template = this.mapTemplate(template);
    }

    get baseSelectors () {
        return {
            cancelBtn: '.cancel-btn',
            saveBtn: '.save-btn',
            layover: '.modal-backdrop'
        };
    }

    show () {
        this.addOverlay();
        this.modalContainer = document.createElement('div');
        this.modalContainer.innerHTML = this.template;
        this.body.appendChild(this.modalContainer);

        this.collectSelectors();
        this.initControls();

        this.activate();
    }

    hide () {
        this.diactivate();
        this.layover.remove();
        this.modalContainer.remove();
    }

    collectSelectors () {}

    initControls () {}

    mapTemplate (template) {
        return template;
    }

    addOverlay () {
        this.body.insertAdjacentHTML('beforeEnd', `<div class="modal-backdrop fade in"></div>`);
        this.layover = document.querySelector(this.baseSelectors.layover);
    }

    getDropDownValue (selector) {
        let dropDown = this.modalContainer.querySelector(selector);

        return dropDown.options[dropDown.selectedIndex].text;
    }

    getMultipleDropDownValues (select) {
        let result = [],
            options = select && select.options,
            length = options.length,
            opt;

        for (let i = 0; i < length; i++) {
            opt = options[i];

            if (opt.selected) {
                result.push(opt.value || opt.text);
            }
        }

        return result;
    }
}

module.exports = BaseModalView;