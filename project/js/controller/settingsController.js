'use strict';

let SettingsView = require('../view/settingsView.js'),
    SettingsAddFilterView = require('../view/SettingsAddFilterView.js'),
    mediator = require('../Mediator.js');

class SettingsController {
    constructor (settings) {
        this.view = new SettingsView(settings);
        this.activate();
    }

    activate () {
        mediator.sub('OpenSettings', () => this.showSettings());
        mediator.sub('test:created', (directionName) => {
            this.view.renderTests(directionName);
        });
        mediator.sub('direction:created', () => {
            this.view.renderDirectionNames();
            this.view.activate();
        });
        mediator.sub('open:add-filter-modal', (direction) => {
            this.showAddFilterModal(direction);
        });
        mediator.sub('filter:created', () => this.showSettings());
    }

    showSettings () {
        this.view.showSettingsWindow();
        this.view.renderDirectionNames();
        this.view.activate();
    }

    showAddFilterModal (direction) {
        console.log(direction);
        let viewAddFilter = new SettingsAddFilterView(direction);
    }
}

module.exports = SettingsController;