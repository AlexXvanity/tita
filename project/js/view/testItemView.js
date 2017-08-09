'use strict';

let mediator = require('../Mediator.js');

class TestItemView {
    constructor (test) {
        this.container = document.querySelector(this.selectors.testSection);
        this.test = test;
    }

    get selectors () {
        return {
            testSection: '#test-list',
            addTestBtn: '.add-test-button'
        };
    }

    render () {

        let template = `<div class="test-item col-xs-2 panel panel-primary">
                            <div class="panel-heading">
                                <h3 class="panel-title">${this.test.name}</h3>
                            </div>
                            <div class="panel-body">
                                <a class="btn btn-primary btn-xs add-test-button">Add test</a>
                            </div>
                        </div>`;

        this.container.insertAdjacentHTML('afterBegin', template);
    }
    
    activate () {
        let addTestBtn = this.container.querySelector(this.selectors.addTestBtn);

        addTestBtn.addEventListener('click', () => {
            let testTitle = '';

            testTitle = this.container.querySelector('.panel-title').innerHTML;

            mediator.pub('testModal:open', testTitle);
        });
    }
}

module.exports = TestItemView;