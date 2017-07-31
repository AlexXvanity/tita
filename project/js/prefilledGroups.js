'use strict';

let Group = require('./model/Group.js'),
    Test = require('./model/Test.js'),
    Day = require('./model/Day.js'),
    prefilledDirection = require('./prefilledDirection.js');

let prefilledGroups,
    prefilledDay;

prefilledDay = [
    new Day('07/09/2017', ['12:30']), 
    new Day('08/04/2017', ['13:30']), 
    new Day('06/05/2017', ['14:30'])
];

prefilledGroups = [
    new Group('Dp-120', prefilledDirection[0], prefilledDay[0]),
    new Group('Dp-112', prefilledDirection[1], prefilledDay[1]),
    new Group('Dp-117', prefilledDirection[2], prefilledDay[2])
];

module.exports = prefilledGroups;
