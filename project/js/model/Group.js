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
    }

    addTests(tests){
    	this.testList = this.testList.concat(tests);
    	this.testAdded.notify(tests);
    }
}

module.exports = Group;
