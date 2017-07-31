'use strict';

let Direction = require('./model/Direction.js');

let prefilledDirections,
    testsForFilter1PHP,
    testsForFilter2PHP,
    testsForFilter1Go,
    testsForFilter2Go,
    testsForFilter1JS,
    testsForFilter2JS;

prefilledDirections = [new Direction('PHP'), new Direction('Go'), new Direction('Web UI')];

prefilledDirections[0].addTest('English 1', 100);
prefilledDirections[0].addTest('English 2', 100);
prefilledDirections[0].addTest('English 3', 100);
prefilledDirections[0].addTest('English 4', 100);
prefilledDirections[0].addTest('Tech PHP', 400);
prefilledDirections[0].addTest('Essay PHP', 600);

prefilledDirections[1].addTest('English 1', 100);
prefilledDirections[1].addTest('English 2', 100);
prefilledDirections[1].addTest('English 3', 100);
prefilledDirections[1].addTest('English 4', 100);
prefilledDirections[1].addTest('Tech Go', 400);
prefilledDirections[1].addTest('Essay Go', 600);

prefilledDirections[2].addTest('English 1', 100);
prefilledDirections[2].addTest('English 2', 100);
prefilledDirections[2].addTest('English 3', 100);
prefilledDirections[2].addTest('English 4', 100);
prefilledDirections[2].addTest('Tech UI', 400);
prefilledDirections[2].addTest('Essay JS', 600);

testsForFilter1PHP = [
    prefilledDirections[0].testList[0],
    prefilledDirections[0].testList[1],
    prefilledDirections[0].testList[2],
    prefilledDirections[0].testList[3]
];

testsForFilter2PHP = [
    prefilledDirections[0].testList[4]
];

testsForFilter1Go = [
    prefilledDirections[1].testList[0],
    prefilledDirections[1].testList[1],
    prefilledDirections[1].testList[2],
    prefilledDirections[1].testList[3]
];

testsForFilter2Go = [
    prefilledDirections[1].testList[4]
];

testsForFilter1JS = [
    prefilledDirections[2].testList[0],
    prefilledDirections[2].testList[1],
    prefilledDirections[2].testList[2],
    prefilledDirections[2].testList[3]
];

testsForFilter2JS = [
    prefilledDirections[2].testList[4]
];

prefilledDirections[0].addFilter(testsForFilter1PHP, 'AVG', '>', 60, 'English tests');
prefilledDirections[0].addFilter(testsForFilter2PHP, 'SUM', '>', 80, 'Technical tests');

prefilledDirections[1].addFilter(testsForFilter1Go, 'AVG', '>', 50, 'English tests');
prefilledDirections[1].addFilter(testsForFilter2Go, 'SUM', '>', 75, 'Technical tests');

prefilledDirections[2].addFilter(testsForFilter1JS, 'AVG', '>', 80, 'English tests');
prefilledDirections[2].addFilter(testsForFilter2JS, 'SUM', '>', 70, 'Technical tests');

module.exports = prefilledDirections;