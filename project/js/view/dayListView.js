let tpl = require('./tpl/tplModalSettings.js');

class DayListView {
    constructor () {
        this.daySection = document.querySelector(this.selectors.dayListView);
        this.render();
    }

    get selectors () {
        return {
            dayListView: '#day-section',
            dayItem: '.day-item'
        };
    }

    render () {
        let dayListView = tpl.daySection;
        this.daySection.innerHTML = dayListView;
    }

    clearContainer () {
        let dayItems = document.querySelectorAll(this.selectors.dayItem);

        if (dayItems.length > 0) {
            dayItems.forEach((item) => {
                item.remove();
            });
        }
    }
}

module.exports = DayListView;