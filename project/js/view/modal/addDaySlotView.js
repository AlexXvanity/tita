'use strict';
let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js'),
    Day = require('../../model/Day.js'),
    BaseModalView = require('../../view/modal/baseModalView.js');

class AddDaySlotView extends BaseModalView {
    constructor () {
        super( null, tpl.addTimeSlot);
    }

    get selectors () {
        return {
            closeButton: '.close-time-slot-btn',
            timeSlotInput: '#time-slot-input',
            save: '.save-time-slot-btn'
        };
    }

    collectSelectors () {
        this.save = this.modalContainer.querySelector(this.selectors.save);
        this.closeButton = this.modalContainer.querySelector(this.selectors.closeButton);
    }


    saveTimeSlot () {
        let timeValue = this.getDropDownValue(this.selectors.timeSlotInput);
        
        mediator.pub('timeSlot:added', timeValue);

        this.hide();
    }

    activate () {
        this.save.addEventListener('click', this.saveTimeSlot.bind(this));
        this.closeButton.addEventListener('click', this.hide.bind(this));
    }

    diactivate () {
        this.save.removeEventListener('click', this.saveTimeSlot.bind(this));
        this.closeButton.removeEventListener('click', this.hide.bind(this));
    }
}

module.exports = AddDaySlotView;