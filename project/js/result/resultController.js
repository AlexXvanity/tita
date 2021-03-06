'use strict';

let Person = require('../app/Person.js'),
    ResultPeopleView = require('./view/resultPeopleView.js'),
    mediator = require('../Mediator.js'),
    Test = require('../test/model/Test.js');

class ResultController {
    constructor() {
        this.activate();
        this.resultPeopleView = new ResultPeopleView();
        this.currentList = '';
    }

    activate() {
        mediator.sub('group:selected', this.renderPeopleWithMarks.bind(this));
        mediator.sub('filter:on', this.renderPeopleWithMarks.bind(this));
        mediator.sub('peopleInTimeSlot:added', this.renderAddedPeople.bind(this));
        mediator.sub('peopleInTimeSlotWere:added', this.renderExistPeople.bind(this));
        mediator.sub('testResult:added', this.renderTestResult.bind(this));
        mediator.sub('error:addedPerson', this.renderTestError.bind(this));
        mediator.sub('timeSlotPeople:formed', this.renderTimeSlotPeople.bind(this));
        mediator.sub('filteredPeople:on', this.renderFilteredPeople.bind(this));
        mediator.sub('rejectedPeople:on', this.renderRejectedPeople.bind(this));
        mediator.sub('unRejectedPeople:on', this.renderUnRejectedPeople.bind(this));
    }

    renderRejectedPeople(people) {
        this.currentList = document.querySelector('.result-wrap').innerHTML;
        this.resultPeopleView.showRejectedPeople(people, 'rejectedPeople');
    }

    renderUnRejectedPeople() {
        document.querySelector('.result-wrap').innerHTML = this.currentList;
    }

    renderFilteredPeople(people) {
        this.resultPeopleView.showFilteredPeople(people, 'filteredPeople');
    }

    renderPeopleWithMarks(group) {
        let people = group.people;

        this.resultPeopleView.showResult(people, 'peopleWithMarks');
    }

    renderAddedPeople(people) {
        this.resultPeopleView.showResult(people, 'peopleAdded');
    }

    renderExistPeople(people) {
        this.resultPeopleView.showResult(people, 'errorExistPerson');
    }

    renderTestResult(people) {
        this.resultPeopleView.showResult(people, 'testResultsAdded');
    }

    renderTestError(people) {
        this.resultPeopleView.showResult(people, 'errorNotExistPerson');
    }

    renderTimeSlotPeople(people) {
        this.resultPeopleView.showResult(people, 'peopleAdded');
    }

}

module.exports = ResultController;
