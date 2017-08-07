'use strict';

let Group = require('./model/Group.js'),
    Test = require('./model/Test.js'),
    Day = require('./model/Day.js'),
    Person = require('./model/Person.js'),
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
let testPeople = [];
testPeople.push( {
    name: 'English 1',
    maxGrade: 84,
});
testPeople.push( {
    name: 'English 2',
    maxGrade: 45,
});
testPeople.push( {
    name: 'English 3',
    maxGrade: 128,
});
testPeople.push( {
    name: 'English 4',
    maxGrade: 167,
});
testPeople.push( {
    name: 'Tech UI',
    maxGrade: 234,
});
testPeople.push( {
    name: 'Essay JS',
    maxGrade: 178,
});
prefilledGroups[0].people.push( new Person('Igor', 'Pavlenko', 'mail@mail.com', {
    date: '2017/08/02',
    time: ['12:30']
}));
prefilledGroups[0].people[0].testList = testPeople;
module.exports = prefilledGroups;
