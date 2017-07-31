'use strict';

let Direction = require('./Direction.js');

class Settings {
    constructor () {
        this.directionList = [];  
    }

    addDirection (name) {
        this.directionList.push(new Direction(name));
    }
}     

module.exports = Settings;
