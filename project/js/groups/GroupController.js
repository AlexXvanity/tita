'use strict';

let GroupItemView = require('./view/GroupItemView.js'),
    EditGroupView = require('./view/modal/EditGroupView.js'),
    AddGroupView = require('./view/modal/AddGroupView.js'),
    GroupContextMenuView = require('./view/modal/ContextMenuGroupView.js'),
    Group = require('./model/Group.js'),
    mediator = require('../Mediator.js'),
    AddTestModalView = require('./view/modal/AddTestModalView.js');

class GroupController {
    constructor(groups, settings, groupListView) {
        this.groupListView = groupListView;
        this.settings = settings;
        this.groups = groups;
        this.selectedGroup = null;
        this.activate();
    }

    renderGroupList() {
        this.groupListView.clearContainer();
        this.groups.forEach((group) => {
            let view = new GroupItemView(group);
            view.render();
        });
    }

    addNewGroup(group) {
        let result = 0;

        result = this.groups.find((currentGroup) => {
            return currentGroup.name === group.name;
        });

        if (!result) {
            this.groups.push(group);
            let view = new GroupItemView(group);
            view.render();
        }

    }

    activate() {
        mediator.sub('addGroupdDialog:open', this.showAddGroupHandler.bind(this));
        mediator.sub('group:saved', this.addNewGroupHandler.bind(this));
        mediator.sub('group:deleted', this.deleteGroupHandler.bind(this));
        mediator.sub('groupContextMenu:show', this.contextMenuHandler.bind(this));
        mediator.sub('group:selected', this.selectGroupHandler.bind(this));
        mediator.sub('editGroup:show', this.showEditGroupHadnler.bind(this));
        mediator.sub('examModel:open', this.showEditExamModalHandler.bind(this));
        mediator.sub('testModal:added', this.addTestHandler.bind(this));
    }

    deleteGroupHandler(group) {
        let index = this.groups.indexOf(group);

        if (index !== -1) {
            this.groups.splice(index, 1);
            this.renderGroupList();
        }
    }

    selectGroupHandler(group) {
        this.selectedGroup = group;
    }

    showAddGroupHandler() {
        let addGroupModalView = new AddGroupView(this.settings);
        addGroupModalView.show();
    }

    addNewGroupHandler(group) {
        this.addNewGroup(group);
    }

    contextMenuHandler(group) {
        let contextMenuView = new GroupContextMenuView(group);
        contextMenuView.show();
    }

    showEditGroupHadnler(model) {
        let editGroupView = new EditGroupView(this.settings, model);
        editGroupView.show();
    }

    showEditExamModalHandler(group) {
        let addTestModalView = new AddTestModalView(group);
        addTestModalView.show();
    }

    addTestHandler(data) {
        data.group.addTests(data.addedTests);
    };
}

module.exports = GroupController;