'use strict';

let mediator = require('../Mediator.js'),
    tpl = require('./tplModalSettings.js'),
    BaseModalView = require('./BaseModalView.js');

class ContextMenuView extends BaseModalView {
    constructor (day) {
        super(day, tpl.contextMenu);
    }

    get selectors () {
        return {
            closeButton: '.close-context-menu',
            deleteBtn: '.delete-btn'
        };
    }

    collectSelectors () {
        this.deleteBtn = this.modalContainer.querySelector(this.selectors.deleteBtn);
        this.closeButton = this.modalContainer.querySelector(this.selectors.closeButton);
    }

    activate () {
        this.deleteBtn.addEventListener('click', this.deleteHandler.bind(this));
        this.deleteBtn.addEventListener('click', this.deleteTimeHandler.bind(this));
        this.closeButton.addEventListener('click', this.hide.bind(this));
    }

    diactivate () {
        this.closeButton.removeEventListener('click', this.hide.bind(this));
    }

    deleteHandler (event) {
        mediator.pub('day:deleted', this.model);
        this.hide();
    }
    deleteTimeHandler (event) {
        mediator.pub('time:deleted', this.model);
        this.hide();
    }
}

module.exports = ContextMenuView;