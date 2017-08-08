'use strict';

let Group = require('./model/Group.js'),
    UserTest = require('./model/UserTest.js'),
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
    grade: 84,
});
testPeople.push( {
    name: 'English 2',
    grade: 45,
});
testPeople.push( {
    name: 'English 3',
    grade: 38,
});
testPeople.push( {
    name: 'English 4',
    grade: 87,
});
testPeople.push( {
    name: 'Tech PHP',
    grade: 214,
});
testPeople.push( {
    name: 'Essay PHP',
    grade: 178,
});
prefilledGroups[0].people.push( new Person('Igor', 'Pavlenko', 'mail@mail.com', {
    date: '2017/08/02',
    time: '12:30'
}));
prefilledGroups[0].people[0].testList = testPeople;

let testPeople1 = [];
testPeople1.push( {
    name: 'English 1',
    grade: 22,
});
testPeople1.push( {
    name: 'English 2',
    grade: 45,
});
testPeople1.push( {
    name: 'English 3',
    grade: 59,
});
testPeople1.push( {
    name: 'English 4',
    grade: 65,
});
testPeople1.push( {
    name: 'Tech PHP',
    grade: 390,
});
testPeople1.push( {
    name: 'Essay PHP',
    grade: 178,
});
prefilledGroups[0].people.push( new Person('Alex', 'Korzh', 'alex@mail.com', {
    date: '2017/08/02',
    time: '12:30'
}));
prefilledGroups[0].people[1].testList = testPeople1;

module.exports = prefilledGroups;
