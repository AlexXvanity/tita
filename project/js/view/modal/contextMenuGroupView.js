'use srtict';

let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js'),
    BaseModalView = require('../../view/modal/baseModalView.js');

class ContextMenuGroupView extends BaseModalView {
    constructor (group) {
        super(group, tpl.groupContextMenu);
    }

    get selectors () {
        return {
            closeButton: '.close-group-context-menu',
            deleteGroupBtn: '.delete-group-btn',
            editGroupBtn: '.edit-group-btn'
        };
    }

    collectSelectors () {
        this.deleteGroupBtn = this.modalContainer.querySelector(this.selectors.deleteGroupBtn);
        this.closeButton = this.modalContainer.querySelector(this.selectors.closeButton);
        this.editGroupBtn = this.modalContainer.querySelector(this.selectors.editGroupBtn);
    }

    activate () {
        this.deleteGroupBtn.addEventListener('click', this.deleteGroupHandler.bind(this));
        this.closeButton.addEventListener('click', this.hide.bind(this));
        this.editGroupBtn.addEventListener('click', this.editGroupHandler.bind(this));
    }

    diactivate () {
        this.closeButton.removeEventListener('click', this.hide.bind(this));
    }

    deleteGroupHandler (event) {
        mediator.pub('group:deleted', this.model);
        this.hide();
    }

    editGroupHandler () {
        mediator.pub('editGroup:show', this.model);
        this.hide();
    }
}

module.exports = ContextMenuGroupView;