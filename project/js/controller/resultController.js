'use strict';

let Person = require('../model/Person.js'),
    ResultPeopleView = require('../view/resultPeopleView.js'),
    // ResultTestsView = require('../view/resultTestsView.js'),
    mediator = require('../Mediator.js'),
    Test = require('../model/Test.js');

class ResultController {
	constructor () {
        this.activate();
        this.resultPeopleView = new ResultPeopleView();
	}

	activate () {
        mediator.sub('group:selected', this.setGroup.bind(this));
        mediator.sub('peopleInTimeSlot:added', this.renderAddedPeople.bind(this));
        mediator.sub('peopleInTimeSlotWere:added', this.renderExistPeople.bind(this));
        mediator.sub('testResult:added', this.renderTestResult.bind(this));
        mediator.sub('error:addedPerson', this.renderTestError.bind(this));
	}

    renderAddedPeople (people) {
        this.resultPeopleView.showResult(people, 'peopleAdded');
    }

    renderExistPeople (people) {
        this.resultPeopleView.showResult(people, 'errorExistPerson');
    }

    renderTestResult (people) {
        this.resultPeopleView.showResult(people, 'testResultsAdded');
    }

    renderTestError (people) {
        this.resultPeopleView.showResult(people, 'errorNotExistPerson');
    }

    setGroup (group) {
        this.group = group;
    }
}

module.exports = ResultController;
