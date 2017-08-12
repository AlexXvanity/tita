'use strict';

let Test = require('../../test/model/Test.js'),
    Filter = require('../../filter/model/Filter.js');

class Direction {
    constructor (name) {
        this.name = name;
        this.testList = [];
        this.filterList = [];
    }

    addTest (name, maxGrade) {
        this.testList.push(new Test(name, maxGrade));
    }

    addFilter(tests, action, condition, grade, name) {
        this.filterList.push(new Filter(tests, action, condition, grade, name));
    }
}

module.exports = Direction;