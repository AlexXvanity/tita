'use strict';

let Person = require('../model/Person.js'),
    ResultPeopleView = require('../view/resultPeopleView.js'),
    ResultTestsView = require('../view/resultTestsView.js'),
    mediator = require('../Mediator.js');

class ResultController {
	constructor () {
        this.activate();
        this.resultPeopleView = new ResultPeopleView();
	}

	activate () {
        mediator.sub('assignPeople:saved', this.generatePeopleInfo.bind(this));
        mediator.sub('assignTests:saved', this.generateTestsInfo.bind(this));
        mediator.sub('group:selected', this.setGroup.bind(this));
        mediator.sub('testModal:open', this.setTestTitle.bind(this));
	}
    
    setTestTitle (title) {
        this.testTitle = title;
    }
    
    setGroup (group) {
        this.group = group;
        this.group.people = [];
    }

    generatePeopleInfo (listOfPeople) {
        let peopleList = Papa.parse(listOfPeople),
            result = [];

        peopleList.data.forEach((user) => {
            let personList = user,
                personInfo = {},
                person = {};

            personInfo.name = (this.checkNameOrSurname(personList[0])) ? personList[0] : 'no valid';
            personInfo.surname = (this.checkNameOrSurname(personList[1])) ? personList[1] : 'no valid';
            personInfo.email = (this.checkEmail(personList[2])) ? personList[2] : 'no valid';

            person = this.createPerson(personInfo);

            this.addPersonTestList(person);

            result.push(person);
        });

        if (!this.isUserExist(this.group, result)) {
            this.addPersonToGroup(result);
            this.resultPeopleView.showResult(result, 'showAddedPeople');
        } else {
            this.resultPeopleView.showResult(result, 'errorExistPeople');
        }
    }

    isUserExist (group, newPeopleList) {
        let peopleGroupList = group.people,
            peopleList = newPeopleList,
            existPersonList = [],
            result = false;

        peopleGroupList.forEach((groupPerson) => {
            peopleList.forEach((addedPerson) => {
                if (addedPerson.email === groupPerson.email) {
                    existPersonList.push(addedPerson.email);
                }
            });
        });

        if (existPersonList.length) {
            result = true;
        } else {
            result = false;
        }

        return result;
    }

    generateTestsInfo (info) {
        let peopleList = Papa.parse(info),
            result = [];

        peopleList.data.forEach((user) => {
            let personList = user,
                personInfo = {};

            personInfo.name = personList[0];
            personInfo.surname = personList[1];
            personInfo.email = personList[2];
            personInfo.grade = personList[3];

            result.push(personInfo);
        });

        this.addPersonResults(result, this.testTitle);
        this.showTestsResult(result);
    }

    createPerson (personInfo) {
        let person = new Person(personInfo.name, personInfo.surname, personInfo.email);

        return person;
    }

    addPersonTestList (person) {
        person.testList = this.group.testList;
    }

    addPersonToGroup (personList) {
        personList.forEach((person) => this.group.people.push(person));
    }

    addPersonTests (person, group) {
        let testList = group.testList;

        person.testList = testList;

    }

    checkNameOrSurname (name) {
        let validationNameOrSurname = /([a-zA-Z]){2,30}/;

        return validationNameOrSurname.test(name);
    }

    checkEmail (email) {
        let validationEmail = /\S+@\S+\.\S+/;

        return validationEmail.test(email);
    }

    showTestsResult (people) {
        let resultTestsView = new ResultTestsView(people); 
    }
}

module.exports = ResultController;
