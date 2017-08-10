'use strict';
let Observer = require('../Event.js');

class Group {
    constructor (name, direction) {
        this.name = name;
        this.direction = direction.name;
        this.testList = direction.testList;
        this.filterList = direction.filterList;
        this.days = [];
        this.people = [];
        
        this.testAdded = new Observer(this);
        this.editGroup = new Observer(this);
    }

    addTests(tests) {
    	this.testList = this.testList.concat(tests);
    	this.testAdded.notify(tests);
    }

    editGroupInfo (groupInfo) {
        this.name = groupInfo.groupName;
        this.direction = groupInfo.direction.name;
        this.testList = groupInfo.direction.testList;
        this.filterList = groupInfo.direction.filterList;
        this.editGroup.notify(groupInfo.clickedGroupName);
    }
}

module.exports = Group;
