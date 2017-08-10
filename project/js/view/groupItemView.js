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

    activate () {
        let groupItem = this.container.querySelector(this.selectors.groupItem),
            groupEditExams = this.container.querySelector(this.selectors.groupEditExams);

        groupItem.addEventListener('click', this.selectGroupItemHandler.bind(this));
        groupItem.addEventListener('contextmenu', this.editGroupViewHandler.bind(this));
        groupEditExams.addEventListener('click', this.editExamModalHandler.bind(this));
    }

    render () {
        let groupItemTemplate = tpl.groupItem.replace('{groupName}', this.currentGroup.name);

        this.container.insertAdjacentHTML('afterbegin', groupItemTemplate);
        this.activate();
        this.subscribe();
    }

    renderEditGroup (group, clickedGroupName) {
        let groupTitles = this.container.querySelectorAll('.panel-title');

        groupTitles.forEach((title) => {
            if (clickedGroupName === title.innerHTML) {
                title.innerHTML = group.name;
            }
        });
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
    
    subscribe () {
        if (this.currentGroup && !this.currentGroup.editGroup.isAttached(this.renderEditGroup.bind(this))) {
            this.currentGroup.editGroup.attach(this.renderEditGroup.bind(this));
        }
    }
}

module.exports = GroupItemView;
