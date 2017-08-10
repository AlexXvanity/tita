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
            let testItemView = new TestItemView();

            testItemView.render(test);
            testItemView.activate();
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

    addNewExamHandler (group) {
        console.log(group);
        let addedTest = group.testList[group.testList.length - 1],
            testItemView = new TestItemView();

        testItemView.render(addedTest);
        testItemView.activate();
    }

}

module.exports = TestListView;