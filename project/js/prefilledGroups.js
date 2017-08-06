'use strict';

let Group = require('./model/Group.js'),
    Test = require('./model/Test.js'),
    Day = require('./model/Day.js'),
    prefilledDirection = require('./prefilledDirection.js');

let prefilledGroups;




prefilledGroups = [
    new Group('Dp-120', prefilledDirection[0]),
    new Group('Dp-112', prefilledDirection[1]),
    new Group('Dp-117', prefilledDirection[2])
];

prefilledGroups[0].days.push( new Day('2017/08/02', ['12:30']));
prefilledGroups[1].days.push( new Day('2017/09/07', ['13:30']));
prefilledGroups[2].days.push( new Day('2017/11/22', ['14:30']));

module.exports = prefilledGroups;

