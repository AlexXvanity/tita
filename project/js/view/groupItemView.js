'use strict';

let mediator = require('../Mediator.js'),
    tpl = require('./tpl/tplModalSettings.js');


class GroupItemView {
    constructor (group) {
        this.container = document.querySelector(this.selectors.groupContainer);
        this.currentGroup = group;
    }

    get selectors () {
        return {
            groupContainer: '#group-container',
            groupItem: '.group-item',
            testListContainer: '#test-list',
            filterList: '.filter-list',
            groupEditExams: '.group-edit-exams',
            modalBody: '.modal-body',
            daySection: '.test-days'
        };
    }

    activate (template) {
        let groupItem = template.querySelector(this.selectors.groupItem),
            groupEditExams = template.querySelector(this.selectors.groupEditExams);

        groupItem.addEventListener('click', this.selectGroupItemHandler.bind(this));
        groupItem.addEventListener('contextmenu', this.editGroupViewHandler.bind(this));
        groupEditExams.addEventListener('click', this.editExamModalHandler.bind(this));
    }

    render () {
        let groupItemTemplate = document.createElement('div');
        groupItemTemplate.innerHTML = tpl.groupItem.replace('{groupName}', this.currentGroup.name);

        this.container.insertBefore(groupItemTemplate, this.container.firstChild);
        this.activate(groupItemTemplate);
    }

    selectGroupItemHandler (event) {
        document.querySelector(this.selectors.testListContainer).innerHTML = '';
        document.querySelector(this.selectors.filterList).innerHTML = '';
        document.querySelector(this.selectors.daySection).innerHTML = '';
        mediator.pub('group:selected', this.currentGroup);
    }

    editExamModalHandler () {
        mediator.pub('examModel:open', this.currentGroup);
    }

    editGroupViewHandler (event) {
        event.preventDefault();
        mediator.pub('groupContextMenu:show', this.currentGroup);
    }
    	    selectGroupForDay (event) {
        document.querySelector(this.selectors.daySection).innerHTML = '';
        mediator.pub('group:selected', this.currentGroup);
    }
}

module.exports = GroupItemView;
