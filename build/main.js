'use strict';

let Group = require('../project/js/model/Group.js'),
    Settings = require('../project/js/model/Settings.js'),
    Event = require('../project/js/Event.js'),
    App = require('../project/js/model/App.js'),
    Direction = require('../project/js/model/Direction.js'),
    Filter = require('../project/js/model/Filter.js'),
    Test = require('../project/js/model/Test.js'),

    GroupController = require('../project/js/controller/groupController.js'),
    SettingsController = require('../project/js/controller/settingsController.js'),
    TestListController = require('../project/js/controller/testListController.js'),
    FilterController = require('../project/js/controller/filterController.js'),

    EditGroupView = require('../project/js/view/modal/editGroupView.js'),
    AddGroupView = require('../project/js/view/modal/addGroupView.js'),
    AddFilterView = require('../project/js/view/modal/addFilterView.js'),
    ContextMenuGroupView = require('../project/js/view/modal/contextMenuGroupView.js'),
    AddExamModalView = require('../project/js/view/modal/addTestModalView.js'),

    TestListView = require('../project/js/view/testListView.js'),
    SettingsView = require('../project/js/view/settingsView.js'),
    GroupListView = require('../project/js/view/groupListView.js'),
    GroupItemView = require('../project/js/view/groupListView.js'),
    TestItemView = require('../project/js/view/testItemView.js'),
    FilterItemView = require('../project/js/view/filterItemView.js'),
    FilterListView = require('../project/js/view/filterListView.js'),

    prefilledGroups = require('../project/js/prefilledGroups.js'),
    prefilledDirection = require('../project/js/prefilledDirection.js'),
    mediator = require('../project/js/Mediator.js'),
    tpl = require('../project/js/view/tpl/tplModalSettings.js'),
    init = require('../project/js/main.js');