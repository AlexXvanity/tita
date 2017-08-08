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
        mediator.sub('group:selected', this.renderPeopleWithMarks.bind(this));
        mediator.sub('filter:on', this.renderPeopleWithMarks.bind(this));
        mediator.sub('peopleInTimeSlot:added', this.renderAddedPeople.bind(this));
        mediator.sub('peopleInTimeSlotWere:added', this.renderExistPeople.bind(this));
        mediator.sub('testResult:added', this.renderTestResult.bind(this));
        mediator.sub('error:addedPerson', this.renderTestError.bind(this));
        mediator.sub('timeSlotPeople:formed', this.renderTimeSlotPeople.bind(this));
	}

    renderPeopleWithMarks (group) {
        let people = group.people;

        this.resultPeopleView.showResult(people, 'peopleWithMarks');
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

    renderTimeSlotPeople (people) {
        this.resultPeopleView.showResult(people, 'peopleAdded');
    }

}

module.exports = ResultController;
