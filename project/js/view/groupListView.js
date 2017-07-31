'use strict';

let mediator = require('../Mediator.js'),
    tpl = require('./tpl/tplModalSettings.js');

class GroupListView {
    constructor (settings) {
        this.groupSection = document.querySelector(this.selectors.modalGroupListView);
        this.render();

        this.groupContainer = document.querySelector(this.selectors.groupContainer);
        this.settings = settings;
    }

    get selectors () {
        return {
            modalGroupListView: '#group-section',
            addGroupButton: '#add-group',
            config: '#config',
            groupContainer: '#group-container',
            groupItem: '.group-item'
        };
    }

    activate () {
        let addGroupButton = document.querySelector(this.selectors.addGroupButton),
            config = document.querySelector(this.selectors.config);

        addGroupButton.addEventListener('click', () => {
            mediator.pub('addGroupdDialog:open');
        });

        config.addEventListener('click', () => {
            mediator.pub('OpenSettings');
        }, false);
    }


    render () {
        let modalGroupListView = tpl.modalGroupListViev;
        this.groupSection.innerHTML = modalGroupListView;
        this.activate();
    }

    clearContainer () {
        let groupItems = document.querySelectorAll(this.selectors.groupItem);

        if (groupItems.length > 0) {
            groupItems.forEach((item) => {
                item.parentElement.remove();
            });
        }
    }
}

module.exports = GroupListView;