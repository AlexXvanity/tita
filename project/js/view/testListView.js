'use strict';

let tpl = require('./tpl/tplModalSettings.js'),
    mediator = require('../Mediator.js'),
    TestItemView = require('../view/testItemView.js');

class TestListView {
    constructor () {
        this.selectedGroup = null;
        this.container = document.querySelector(this.selectors.container);
        this.template = tpl.testListView;
        this.itemContainer = document.querySelector(this.selectors.testSection);

        this.render();
    }

    get selectors () {
        return {
            container: '#test-section',
            testSection: '#test-list'
        };
    }

    renderTest (group) {
        this.selectedGroup = group;

        let tests = this.selectedGroup.testList;

        tests.forEach((test) => {
            let view = new TestItemView(test);

            view.render();
            view.activate();
        });

        this.activate();
    }

    activate () {
        if (this.selectedGroup && !this.selectedGroup.testAdded.isAttached(this.addNewExamHandler.bind(this))) {
            this.selectedGroup.testAdded.attach(this.addNewExamHandler.bind(this));
        }
    }

    render () {
        this.container.innerHTML = this.template;
    }

    addNewExamHandler (tests) {
        tests.forEach((test) => {
            let view = new TestItemView(test);

            view.render();
            view.activate();
        });
    }

}

module.exports = TestListView;