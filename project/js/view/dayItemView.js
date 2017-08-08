'use strict';

let mediator = require('../Mediator.js'),
    tpl = require('./tpl/tplModalSettings.js');

class DayItemView {
    constructor (day) {
        this.container = document.querySelector(this.selectors.testDay);
        this.template = tpl.dayListView;
        this.selectDay = day;
    }

    get selectors () {
        return {
            testDay: '.test-days',
            addDayBtn: '#add-day',
            dayItem: '.day-item',
            timeSlot: '.add-time-slot',
            addPeople: '.add-people'
        };
    }

    renderDay (day) {
        this.container.insertAdjacentHTML('afterbegin',this.template);

        let dayItemTemplate = this.container.querySelector(this.selectors.dayItem),
            year = day.date.slice(2,4),
            month = day.date.slice(5,7),
            dayT = day.date.slice(8),

            date = `${month}/${dayT}/${year}`;

        dayItemTemplate.innerHTML = tpl.dayItem.replace ('{date}', date);

        if (day.time) {
            day.time.forEach((time) => {
                dayItemTemplate.insertAdjacentHTML ('beforeend', tpl.timeSlotItem.replace ('{timeSlot}', time));
            });
        }

        dayItemTemplate.insertAdjacentHTML ('beforeend', tpl.btnAddTimeSlot);

        if ( !document.querySelector (this.selectors.addDayBtn) ){
            this.container.insertAdjacentHTML ('beforeend', tpl.addBtn);
            let addDayBtn = document.querySelector (this.selectors.addDayBtn);
            addDayBtn.addEventListener ('click', () => {mediator.pub('day:add');});
        }

        this.activate (dayItemTemplate);
    }

    activate (tpl) {
        let addTimeSlotBtn = tpl.querySelector(this.selectors.timeSlot),
            dayItem = document.querySelector (this.selectors.dayItem),
            addPeople = tpl.querySelectorAll(this.selectors.addPeople),
            timeSlotBtn = dayItem.querySelectorAll('.time-slot');

        addTimeSlotBtn.addEventListener('click', () => {mediator.pub('timeSlot:add', this.selectDay);});

        if (addPeople) {
            addPeople.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    debugger;
                    let time = e.target.parentElement.querySelector('.time-slot').innerHTML;

                    mediator.pub ('assignPeople:open', time);
                });
            });
        }

        dayItem.addEventListener('click', this.selectDayItemHandler.bind(this));

        timeSlotBtn.forEach((btn) => {
            btn.addEventListener('click', (e)=> {
                let data = {},
                    time = e.target.innerHTML;

                data.date = this.selectDay.date;
                data.time = time;

                mediator.pub('timeSlot:clicked', data);
            });
        });
    }
    selectDayItemHandler () {
        mediator.pub('day:selected', this.selectDay);
    }
}

module.exports = DayItemView;


