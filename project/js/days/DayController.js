'use strict';

let DayItemView = require('./view/DayItemView.js'),
    PeopleInfoView = require('./view/PeopleInfoView.js'),
    ContextMenuView = require('.././general/ContextMenuView.js'),
    AddDayView = require('./view/modal/AddDayView.js'),
    AddTimeView = require('./view/modal/AddDaySlotView.js'),
    Person = require('../app/Person.js'),
    UserTest = require('../test/model/UserTest.js'),
    mediator = require('../Mediator.js');

class DayController {
    constructor (dayView) {
        this.dayListView = dayView;
        this.selectGroup = null ;
        this.selectDay = null;
        this.activate();
        this.addDayModal = new AddDayView;
        this.addTimeModal = new AddTimeView;

    }

    activate () {
        mediator.sub('group:selected', this.renderDayList.bind(this));
        mediator.sub('day:selected', this.selectDayHandler.bind(this));
        mediator.sub('assignPeople:open', this.openPeopleInfo.bind(this));
        mediator.sub('assignPeople:saved', this.generatePeopleInfo.bind(this));
        mediator.sub('day:add', this.showAddDay.bind(this));
        mediator.sub('day:added', this.addDayHandler.bind(this));
        mediator.sub('timeSlot:add', this.showAddTime.bind(this));
        mediator.sub('timeSlot:added', this.addTimeSlot.bind(this));
        mediator.sub('timeSlot:clicked', this.getTimeSlotPeople.bind(this));
        mediator.sub('dayContextMenu:show', this.contextMenuHandler.bind(this));
        mediator.sub('timeSlotContextMenu:show', this.timeSlotDelete.bind(this));
        mediator.sub('day:deleted', this.deleteDayHandler.bind(this));
        mediator.sub('time:deleted', this.deleteTimeHandler.bind(this));
    }

    selectDayHandler (day) {
        this.selectDay = day;
    }

    renderDayList (group) {
        this.selectGroup = group;

        this.dayListView.clearContainer();
        if (this.selectGroup.days.length) {
            this.selectGroup.days.forEach((day) => {
                this.selectedDay = day;

                let dayItemView = new DayItemView(day, this.selectGroup);

                dayItemView.renderDay(day);
            });
        } else {
            let dayItemView = new DayItemView();

            dayItemView.renderDay();
        }
    }

    showAddDay () {
        this.addDayModal.show();

        let date = new Date(),
            day = date.getDate(),
            month = date.getMonth() + 1,
            year = date.getFullYear();

        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;

        let today = `${year}-${month}-${day}`;
        document.querySelector('#day-input').value = today;
    }

    addDayHandler (day) {
        if (!this.checkDaysExist(day)) {
            this.selectDay = day;
            this.selectGroup.days.push(day);
            this.renderDayList(this.selectGroup);
        }
    }

    checkDaysExist (day) {
        let result = '';

        this.selectGroup.days.forEach((groupDay) => {
            if (groupDay.date === day.date) {
                result = true;
            }
        });

        return result;
    }

    showAddTime () {
        this.addTimeModal.show();
    }

    selectDayHandler (day) {
        this.selectDay = day;
    }

    openPeopleInfo (time) {
        let peopleInfoView = new PeopleInfoView(time);

        peopleInfoView.show();
    }

    addTimeSlot(time) {
        if (!this.selectDay.time) {
            this.selectDay.time =[];
        }
        this.selectDay.time.push(time);
        this.renderDayList(this.selectGroup);
    }

    generatePeopleInfo (peopleInfo) {
        let peopleList = Papa.parse(peopleInfo.listOfPeople),
            result = [];

        peopleList.data.forEach((user) => {
            let personList = user,
                personInfo = {},
                person = {};

            personInfo.name = (this.checkNameOrSurname(personList[0])) ? personList[0] : 'no valid';
            personInfo.surname = (this.checkNameOrSurname(personList[1])) ? personList[1] : 'no valid';
            personInfo.email = (this.checkEmail(personList[2])) ? personList[2] : 'no valid';
            personInfo.selectDay = {};
            personInfo.selectDay.date = this.selectDay.date;
            personInfo.selectDay.time = peopleInfo.time;

            person = this.createPerson(personInfo);

            this.createPersonTestList(this.selectGroup, person);

            result.push(person);
        });

        let checkResult = this.checkUserExist(this.selectGroup, result);

        if (checkResult.notExistPeople.length) {
            this.addPersonToGroup(checkResult.notExistPeople);
            mediator.pub('peopleInTimeSlot:added', checkResult.notExistPeople);
        } else {
            mediator.pub('peopleInTimeSlotWere:added', checkResult.existPeople);
        }
    }

    checkUserExist (group, newPeopleList) {
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

    getTimeSlotPeople (day) {
        let people = this.selectGroup.people,
            timeSlotPeople = [],
            dayDate = day.date,
            dayTime = day.time;

        people.forEach((person) => {
            let personDate = person.testDay.date,
                personTime = person.testDay.time;

            if (personDate === dayDate && personTime === dayTime) {
                timeSlotPeople.push(person);
            }
        });

        mediator.pub('timeSlotPeople:formed', timeSlotPeople);
    }

    addPersonToGroup (personList) {
        personList.forEach((person) => this.selectGroup.people.push(person));
    }

    checkNameOrSurname (name) {
        let validationNameOrSurname = /([a-zA-Z]){2,30}/;

        return validationNameOrSurname.test(name);
    }

    checkEmail (email) {
        let validationEmail = /\S+@\S+\.\S+/;

        return validationEmail.test(email);
    }

    createPerson (personInfo) {
        let person = new Person(personInfo.name, personInfo.surname, personInfo.email, personInfo.selectDay);

        return person;
    }

    createPersonTestList (group, person) {
        let groupTestList = group.testList,
            personTestList = [];

        groupTestList.forEach((groupTest) => {
            let test = new UserTest(groupTest.name);

            personTestList.push(test);
        });

        person.testList = personTestList;
    }

    contextMenuHandler (day) {
        let contextMenuView = new ContextMenuView(day);
        contextMenuView.show();
    }

    timeSlotDelete (date) {
        let contextMenuView = new ContextMenuView(date);
        contextMenuView.show();
    }

    deleteDayHandler(day) {
        let index = this.selectGroup.days.indexOf(day);

        if (index !== -1) {
            this.selectGroup.days.splice(index, 1);
        }

        this.renderDayList(this.selectGroup);
    }

    deleteTimeHandler(data) {
        let index = data.day.time.indexOf(data.time);

        if (index !== -1) {
            data.day.time.splice(index, 1);
        }

        this.renderDayList(this.selectGroup);
    }

}

module.exports = DayController;

