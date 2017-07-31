'use strict';

let TestItemView = require('../view/testItemView.js'),
    ModalTestView = require('../view/modalTestView.js'), 
    mediator = require('../Mediator.js');

class TestListController {
    constructor (testListView) {
        this.testListView = testListView;
        this.activate();
        this.section = document.querySelector('#test-section');
    }

    activate () {
        mediator.sub('group:selected', this.groupSelectedHandler.bind(this));
        mediator.sub('testModal:open', this.createModalTest.bind(this));
    }

    groupSelectedHandler (group) {
        this.testListView.renderTest(group);
    }


    createModalTest () {
        let modalTestView = new ModalTestView();
        
        modalTestView.show();
    }
}

module.exports = TestListController;