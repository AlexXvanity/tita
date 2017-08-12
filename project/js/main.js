'use strict';

let App = require('./app/App.js'),

    prefilledGroups = require('./prefilledGroups.js'),
    prefilledDirection = require('./prefilledDirection.js');
    
document.addEventListener('DOMContentLoaded', init, false);

function init () {
    let app = new App();
    
    app.groupList = prefilledGroups;
    app.settings.directionList = prefilledDirection;

    app.start();
}

module.exports = init;