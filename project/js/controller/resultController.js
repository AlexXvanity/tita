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
        let arrayOfPeople = listOfPeople.match(/[^\n]+/g),
            people = [];
            
        arrayOfPeople.forEach((user) => {
            let arrayOfPerson = user.split(' '),
                personOfObj = {};

            //check validation using reg exp
            personOfObj.name = (this.checkNameOrSurname(arrayOfPerson[0]))? arrayOfPerson[0] : 'no valid';
            personOfObj.surname = (this.checkNameOrSurname(arrayOfPerson[1]))? arrayOfPerson[1] : 'no valid';
            personOfObj.email = (this.checkEmail(arrayOfPerson[2]))? arrayOfPerson[2] : 'no valid';
       
            let person = new Person(personOfObj.name, personOfObj.surname, personOfObj.email);

            people.push(person);
        });

        this.showResultPeople(people);
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

    generateTestsInfo (info) {
        let arrayOfPeople = info.match(/[^\n]+/g),
            people = [];

            
        arrayOfPeople.forEach((user) => {
            let arrayOfPerson = user.split(' '),
                personOfObj = {};

            personOfObj.surname = arrayOfPerson[0];
            personOfObj.name = arrayOfPerson[1];
            personOfObj.institution = arrayOfPerson[2];
            personOfObj.department = arrayOfPerson[3];
            personOfObj.email = arrayOfPerson[4];
            personOfObj.state = arrayOfPerson[5];
            personOfObj.startedOn = arrayOfPerson[6];
            personOfObj.completed = arrayOfPerson[7];
       
            people.push(personOfObj);
        });

        this.showTestsResult(people);
    }

    showTestsResult (people) {
        let resultTestsView = new ResultTestsView(people); 
    }
}

module.exports = ResultController;
