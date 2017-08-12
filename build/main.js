'use strict';

let Group = require('../project/js/groups/model/Group.js'),
    Settings = require('../project/js/settings/model/Settings.js'),
    Event = require('../project/js/Event.js'),
    App = require('../project/js/model/App.js'),
    Direction = require('../project/js/settings/model/Direction.js'),
    Filter = require('../project/js/filter/model/Filter.js'),
    Test = require('../project/js/test/model/Test.js'),

    // GroupController = require('../project/js/groups/GroupController.js'),

    SettingsController = require('../project/js/settings/SettingsController.js'),
    TestListController = require('../project/js/controller/testListController.js'),
    FilterController = require('../project/js/controller/filterController.js'),

    // EditGroupView = require('../project/js/groups/view/modal/EditGroupView.js'),

    // AddGroupView = require('../project/js/view/modal/addGroupView.js'),

    AddFilterView = require('../project/js/view/modal/addFilterView.js'),
    // ContextMenuGroupView = require('../project/js/view/modal/contextMenuGroupView.js'),
    // AddExamModalView = require('../project/js/view/modal/addTestModalView.js'),

    TestListView = require('../project/js/view/testListView.js'),
    SettingsView = require('../project/js/settings/view/SettingsView.js'),


    // GroupListView = require('../project/js/groups/view/GroupListView.js'),
    // GroupItemView = require('../project/js/groups/view/GroupItemView.js'),


    TestItemView = require('../project/js/view/testItemView.js'),
    FilterItemView = require('../project/js/view/filterItemView.js'),
    FilterListView = require('../project/js/view/filterListView.js'),

    prefilledGroups = require('../project/js/prefilledGroups.js'),
    prefilledDirection = require('../project/js/prefilledDirection.js'),
    mediator = require('../project/js/Mediator.js'),
    tpl = require('../project/js/view/tpl/tplModalSettings.js'),
    init = require('../project/js/main.js');