'use strict';

let Settings = require('../settings/model/Settings.js'),
    FilterListView = require('../view/filterListView.js'),
    DayListView = require('../view/dayListView.js'),

    GroupListView = require('../groups/view/GroupListView.js'),
    GroupController = require('../groups/GroupController.js'),
    SettingsController = require('../settings/SettingsController.js'),

    DayController = require('../controller/dayController.js'),
    TestListController = require('../controller/testListController.js'),
    FilterController = require('../controller/filterController.js'),
    TestListView = require('../view/testListView.js'),
    mediator = require('../Mediator.js'),
    ResultController = require('../controller/resultController.js');

class App {
    constructor() {
        this.groupList = [];
        this.settings = new Settings();
    }

    addGroup() {
        this.groupList.push(new Group());
    }

    start() {
        let groupListView = new GroupListView(this.settings),
			dayListView = new DayListView(),
            groupController = new GroupController(this.groupList, this.settings, groupListView),
            filterListView = new FilterListView(),
            filterController = new FilterController(),
            dayController = new DayController(dayListView),
            testListView = new TestListView(),
            testListController = new TestListController(testListView),
            settingsController = new SettingsController(this.settings),
            resultController = new ResultController();

        groupController.renderGroupList();
        this.activate();
    }

    activate() {
        mediator.sub('addSelectedGroup', (group) => {
            this.groupList.push(group);
        });
    }
}

module.exports = App;
