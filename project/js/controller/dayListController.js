'use strict';

let DayItemView = require('../view/dayItemView.js'),
    PeopleInfoView = require('../view/peopleInfoView.js'), 
    mediator = require('../Mediator.js');

class DayListController {
    constructor () {
        this.activate();
    }

    activate () {
        mediator.sub('group:selected', this.groupSelectedHandler);
        mediator.sub('assignPeople:open', this.openPeopleInfo.bind(this));
    }

    groupSelectedHandler (group) {
        if (group.day && group.day.date) {
            let dayView = new DayItemView (group.day);
            dayView.renderDay();
            dayView.renderTimeSlot();
        }
    }

    openPeopleInfo () {
        let peopleInfoView = new PeopleInfoView();
        
        peopleInfoView.show();
    }

}

module.exports = DayListController;

