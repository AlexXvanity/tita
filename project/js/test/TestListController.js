'use strict';

let ModalTestView = require('./view/modal/ModalTestView.js'),
    UserTest = require('./model/UserTest.js'),
    mediator = require('../Mediator.js');

class TestListController {
    constructor (testListView) {
        this.testListView = testListView;
        this.activate();
        this.section = document.querySelector('#test-section');
    }

    activate () {
        mediator.sub('assignTests:saved', this.generateTestsInfo.bind(this));
        mediator.sub('group:selected', this.groupSelectedHandler.bind(this));
        mediator.sub('testModal:open', this.createModalTest.bind(this));
        mediator.sub('testModal:open', this.setTestName.bind(this));
        mediator.sub('test:added', this.addNewTests.bind(this));
    }

    groupSelectedHandler (group) {
        this.testListView.renderTest(group);
        this.setGroup(group);
    }

    createModalTest () {
        let modalTestView = new ModalTestView();

        modalTestView.show();
    }

    generateTestsInfo (info) {debugger;
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

        let checkResult = this.checkUserExist(this.selectGroup, result);

        if (checkResult.notExistPeople.length) {
            mediator.pub('error:addedPerson', checkResult.notExistPeople);
            if (checkResult.existPeople.length) {
                this.addTestResult(this.selectGroup, checkResult.existPeople, this.testName);
            }
        } else {
            this.addTestResult(this.selectGroup, checkResult.existPeople, this.testName);

            mediator.pub('testResult:added', checkResult.existPeople);
        }

        console.log(this.selectGroup);
    }

    checkUserExist (group, newPeopleList) {debugger;
        let peopleGroupList = group.people,
            peopleList = newPeopleList,
            notExistPersonList = [],
            existPersonList = [],
            result = {};

        if (peopleGroupList.length) {
            peopleList.forEach((addedPerson) => {
                peopleGroupList.forEach((groupPerson) => {
                    if (addedPerson.email === groupPerson.email) {
                        existPersonList.push(addedPerson);
                    }
                });
                // checking if user is not exist in groupList
                if (!existPersonList.length) {
                    notExistPersonList.push(addedPerson);
                }
            });

            result.existPeople = existPersonList;
            result.notExistPeople = notExistPersonList;
        } else {
            peopleList.forEach((person) => {
                notExistPersonList.push(person);
            });

            result.notExistPeople = notExistPersonList;
        }

        return result;
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
                            test.grade = parseInt(personResult.grade);
                        }
                    });
                }
            });
        });
    }

    addNewTests (testList) {debugger;
        console.log(this.selectGroup);
        let people = this.selectGroup.people;

        people.forEach((person) => {
            testList.forEach((test) => {
                person.testList.push(new UserTest(test.name));
            });
        });
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

    setGroup (group) {
        this.selectGroup = group;
    }

    setTestName (testName) {
        this.testName = testName;
    }
}

module.exports = TestListController;