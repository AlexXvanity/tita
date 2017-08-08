'use strict';

let FilterItemView = require('../view/filterItemView.js'),
    mediator = require('../Mediator.js'),
    AddFilterView = require('../view/modal/addFilterView.js');

class FilterController {
    constructor() {
        this.selectedGroup = null;
        this.activate();
    }

    activate() {
        mediator.sub('group:selected', this.groupSelectedHandler.bind(this));
        mediator.sub('addFilterView:render', this.renderAddFilterViewHandler.bind(this));
        mediator.sub('filter:added', this.addFilterHandler.bind(this));
        mediator.sub('filter:selected', this.filterPeople.bind(this));
    }

    groupSelectedHandler(group) {
        this.selectedGroup = group;
        group.filterList.forEach((filter) => {
            let filterItemView = new FilterItemView(filter);
            filterItemView.render();
        });
    }

    renderAddFilterViewHandler() {
        let addFilterView = new AddFilterView(this.selectedGroup);
        addFilterView.show();
    }

    addFilterHandler(filter) {
        this.selectedGroup.filterList.push(filter);
        let filterItemView = new FilterItemView(filter);
        filterItemView.render();
    }

    filterPeople(filter) {

        console.log(this.selectedGroup.people);

        let resultTest = [];
        this.selectedGroup.people.map((person) => {
            filter.tests.forEach((test) => {
                person.testList.forEach((personTest) => {
                    if (test.name === personTest.name) {
                        personTest.percent = personTest.grade / test.maxGrade * 100;

                        resultTest.push({
                            name: personTest.name,
                            grade: personTest.grade,
                            percent: personTest.percent
                        });


                    }

                });

            });
            person.testList = resultTest;
            resultTest = [];
        });
        let filteredPerson =[];
        this.selectedGroup.people.map((person) => {
            let actionResult = doAction(filter.action, person);
            let result = filteredByCondition(filter.condition, actionResult, person);

            function doAction(act) {
                let actions = {
                    'SUM': person.testList.reduce((sum, current) => {
                        return sum + current.percent;


                    }, 0),
                    'AVG': person.testList.reduce((sum, current) => {
                        return (sum + current.percent);
                    }, 0) / person.testList.length

                };

                return actions[act];
            }
            function filteredByCondition(cond, actRez) {
                let condition = {
                    '>': ()=>{
                        if(actRez>filter.grade){
                            return person;
                        }
                    },
                    '<': ()=>{
                        if(actRez<filter.grade){
                            return person;
                        }
                    },
                    '=': ()=>{
                        if(actRez === filter.grade){
                            return person;
                        }
                    }
                };

                return condition[cond]();

            }
            if(typeof (result) === 'object'){
                return filteredPerson.push(result);
            }

        });
        return console.log(filteredPerson);
    }


}

module.exports = FilterController;