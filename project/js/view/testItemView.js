'use strict';

let mediator = require('../Mediator.js');

class TestItemView {
    constructor (test) {
        this.container = document.querySelector(this.selectors.testSection);
        this.test = test;
    }

    get selectors () {
        return {
            testSection: '#test-list'
        };
    }

    render () {

        let template = `<div class="test-item col-xs-2 panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">${this.test.name}</h3>
                            </div>
                            <div class="panel-body">
                            </div>
                        </div>`;

        this.container.insertAdjacentHTML('afterBegin', template);
    }
}

module.exports = TestItemView;