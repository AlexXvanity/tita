'use strict';
let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js'),
    Day = require('../../model/Day.js'),
    BaseModalView = require('../../view/modal/baseModalView.js');

class AddDayView extends BaseModalView {
    constructor () {
        super( null, tpl.addDay);
    }

    get selectors () {
        return {
            closeButton: '.close-day-btn',
            dayInput: '#day-input',
            save: '.save-day-btn'
        };
    }

    collectSelectors () {
        this.save = this.modalContainer.querySelector(this.selectors.save);
        this.closeButton = this.modalContainer.querySelector(this.selectors.closeButton);
    }


    saveDay () {
        let dateValue = this.modalContainer.querySelector(this.selectors.dayInput).value;

        mediator.pub('day:added', new Day(dateValue));

        this.hide();
    }

    activate () {
        this.save.addEventListener('click', this.saveDay.bind(this));
        this.closeButton.addEventListener('click', this.hide.bind(this));
    }

    diactivate () {
        this.save.removeEventListener('click', this.saveDay.bind(this));
        this.closeButton.removeEventListener('click', this.hide.bind(this));
    }
}

module.exports = AddDayView;