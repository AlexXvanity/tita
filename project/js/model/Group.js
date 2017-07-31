'use strict';
let Observer = require('../Event.js');

class Group {
    constructor (name, direction, day) {
        this.name = name;
        this.direction = direction.name;
        this.testList = direction.testList;
        this.filterList = direction.filterList;
        this.day = day;

        this.testAdded = new Observer(this);
    }

    addTests(tests){
    	this.testList = this.testList.concat(tests);
    	this.testAdded.notify(tests);
    }
}

module.exports = Group;
