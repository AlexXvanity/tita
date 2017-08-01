'use strict';

let Person = require('../model/Person.js'),
    ResultPeopleView = require('../view/resultPeopleView.js'),
    ResultTestsView = require('../view/resultTestsView.js'),
    mediator = require('../Mediator.js');

class ResultController {
	constructor () {
        this.activate();
	}

	activate () {
        mediator.sub('assignPeople:saved', this.generatePeopleInfo.bind(this));
        mediator.sub('assignTests:saved', this.generateTestsInfo.bind(this));
	}

    generatePeopleInfo (listOfPeople) {
        // Papa parses
        let peopleList = Papa.parse(listOfPeople),
            personInfo = {},
            personList = [],
            person = {},
            result = [];

        peopleList.data.forEach((user) => {
            personList = user;
            //check validation using reg exp
            personInfo.name = (this.checkNameOrSurname(personList[0])) ? personList[0] : 'no valid';
            personInfo.surname = (this.checkNameOrSurname(personList[1])) ? personList[1] : 'no valid';
            personInfo.email = (this.checkEmail(personList[2])) ? personList[2] : 'no valid';

            person = new Person(personInfo.name, personInfo.surname, personInfo.email);

            result.push(person);

            this.showResultPeople(result);
        });
    }

    generateTestsInfo (info) {
        // Papa parses
        let peopleList = Papa.parse(info),
            personInfo = {},
            personList = [],
            result = [];
        
        peopleList.data.forEach((user) => {
            personList = user;
            personInfo = {};

            personInfo.name = personList[0];
            personInfo.surname = personList[1];
            personInfo.email = personList[2];
            personInfo.grade = personList[3];

            result.push(personInfo);
        });

        this.showTestsResult(result);
    }

    checkNameOrSurname (name) {
        let validationNameOrSurname = /([a-zA-Z]){2,30}/;

        return validationNameOrSurname.test(name);
    }

    checkEmail (email) {
        let validationEmail = /\S+@\S+\.\S+/;

        return validationEmail.test(email);
    }

    showResultPeople (people) {
        let resultPeopleView = new ResultPeopleView(people); 
    }

    showTestsResult (people) {
        let resultTestsView = new ResultTestsView(people); 
    }
}

module.exports = ResultController;
