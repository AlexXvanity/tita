'use strict';

let Person = require('../model/Person.js'),
    ResultPeopleView = require('../view/resultPeopleView.js'),
    ResultTestsView = require('../view/resultTestsView.js'),
    mediator = require('../Mediator.js'),
    Test = require('../model/Test.js');

class ResultController {
	constructor () {
        this.activate();
        this.resultPeopleView = new ResultPeopleView();
	}

	activate () {
        mediator.sub('group:selected', this.setGroup.bind(this));
        mediator.sub('assignPeople:saved', this.generatePeopleInfo.bind(this));
        mediator.sub('testModal:open', this.setTestName.bind(this));
        mediator.sub('assignTests:saved', this.generateTestsInfo.bind(this));
	}

    setTestName (testName) {
        this.testName = testName;
    }
    
    setGroup (group) {
        this.group = group;
        this.group.people = [];
        console.log(group);
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

            this.createPersonTestList(this.group, person);

            result.push(person);
        });

        if (!this.isUserExist(this.group, result)) {
            this.addPersonToGroup(result);
            this.resultPeopleView.showResult(result, 'showAddedPeople');
        } else {
            this.resultPeopleView.showResult(result, 'errorExistPeople');
        }
        console.log(this.group);
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
        if (this.isUserExist(this.group, result)) {
            this.addTestResult(this.group, result, this.testName);
        } else {
            // иначе мы формируем массив людей которые не вошли в список и  выдаем ошибку
            // эти люди не заносятся в объект группы
        }
        this.showTestsResult(result);
    }

    addTestResult (group, result, testTitle) {
        let peopleGroupList = group.people,
            peopleResultList = result,
            testName = testTitle;

        peopleGroupList.forEach((person) => {
            peopleResultList.forEach((personResult) => {
                if (person.email === personResult.email) {
                    person.testList.forEach((test) => {
                        if (test.name === testName) {
                            test.maxGrade = parseInt(personResult.grade);
                        }
                    });
                }
            });
        });
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
    
    createPerson (personInfo) {
        let person = new Person(personInfo.name, personInfo.surname, personInfo.email);

        return person;
    }

    createPersonTestList (group, person) {
        let groupTestList = group.testList,
            personTestList = [];

        groupTestList.forEach((groupTest) => {
            let test = new Test(groupTest.name);

            personTestList.push(test);
        });

        person.testList = personTestList;
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
