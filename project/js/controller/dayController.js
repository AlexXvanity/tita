'use strict';

let DayItemView = require('../view/dayItemView.js'),
    PeopleInfoView = require('../view/peopleInfoView.js'),
    AddDayView = require('../view/modal/addDayView.js'),
    AddTimeView = require('../view/modal/addDaySlotView.js'),
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
        mediator.sub('day:selected', this.selectDayHandler.bind(this,));
        mediator.sub('assignPeople:open', this.openPeopleInfo.bind(this));
        mediator.sub('day:add', this.showAddDay.bind(this));
        mediator.sub('day:added', this.addDayHandler.bind(this));
        mediator.sub('timeSlot:add', this.showAddTime.bind(this));
        mediator.sub('timeSlot:added', this.addTimeSlot.bind(this));


    }
    selectDayHandler(day) {
        this.selectDay = day;
    }
    renderDayList(group){
        this.selectGroup = group;

        this.dayListView.clearContainer();

        this.selectGroup.days.forEach((day) => {
            this.selectedDay = day;

            let dayItemView = new DayItemView (day);

            dayItemView.renderDay(day);
        });
    }

    showAddDay (){
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
    addDayHandler(day){
        this.selectDay = day;
        this.selectGroup.days.push(day);
        this.renderDayList(this.selectGroup);

    }

    showAddTime (){
        this.addTimeModal.show();
    }

    selectDayHandler(day) {
        this.selectDay = day;
    }

    openPeopleInfo () {
        let peopleInfoView = new PeopleInfoView();
        
        peopleInfoView.show();
    }

    addTimeSlot(time){
        if ( !this.selectDay.time ){
            this.selectDay.time =[];
        }
        this.selectDay.time.push(time);
        this.renderDayList(this.selectGroup);
    }

}

module.exports = DayController;

