'use strict';

let mediator = require('../Mediator.js');

class DayItemView {
    constructor(day) {
        this.day = day;
        this.container = document.querySelector(this.selectors.daySection);
        this.tplConteiner = '<div class="group-item col-xs-2 panel panel-primary">';
    }

    get selectors () {
        return {
            daySection: '.test-days'
        };
    }

    renderDay () {
        let template = this.tplConteiner + `<div class="panel-heading"><h3 class="panel-title">${this.day.date}</h3></div>`;

        this.container.insertAdjacentHTML('afterBegin', template);
    }

    renderTimeSlot () {
        let btn = '<i id="add-day" class="add-button fa fa-plus-circle" aria-hidden="true"></i>',
            slotContainer = this.container.querySelector('.group-item');

        if(this.day.time){
            this.day.time.forEach ((timeSlot)=>{
                let template = `<div class="panel-body"><div class="time-slot">${timeSlot}</div></div>`;

                slotContainer.insertAdjacentHTML ('beforeend', template);
            });
        }

        slotContainer.insertAdjacentHTML ('afterend', btn);

        this.activate();
    }

    activate () {
        let buttonOpen = this.container.querySelector('.time-slot');
        buttonOpen.addEventListener('click', () => {
            mediator.pub('assignPeople:open');
        });
    }

    selectGroupForDay () {
        mediator.pub ('group:selected', this.currentGroup);
    }
}

module.exports = DayItemView;


