'use strict';

let FilterItemView = require('../view/filterItemView.js'),
    mediator = require('../Mediator.js'),
    AddFilterView = require('../view/modal/addFilterView.js');

class FilterController {
    constructor() {
        this.selectedGroup = null;
        this.activate();
        this.filteredGroup = {};
        this.isFiltered = false;
    }

    activate() {
        mediator.sub('group:selected', this.groupSelectedHandler.bind(this));
        mediator.sub('addFilterView:render', this.renderAddFilterViewHandler.bind(this));
        mediator.sub('filter:added', this.addFilterHandler.bind(this));
        mediator.sub('filter:selected', this.filterPeople.bind(this));
        mediator.sub('filter:unSelected', this.unFilterPeople.bind(this));
        // mediator.sub('filter:reject', this.reject.bind(this));
        // mediator.sub('filter:unReject', this.unReject.bind(this));
    }

    unFilterPeople(){
        this.isFiltered = false;
        (() => {mediator.pub ('filter:on', this.selectedGroup);})();
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
    filterPeople(filter){

        if(this.isFiltered){
            this.filtering(filter,this.filteredGroup.people);
        }else{
            this.filtering(filter,this.selectedGroup.people);
            this.isFiltered = true;
        }

    }
    filtering(filter, peopleList) {

        let people = JSON.parse(JSON.stringify(peopleList));

        this.addTestResults(filter, people);

        let filteredPerson =[];

        people.map((person) => {
            let actionResult = this.doAction(filter.action, person);
            let result = this.filteredByCondition(filter, filter.condition, actionResult, person);

            if(typeof (result) === 'object'){
                return filteredPerson.push(result);
            }

        });
        this.filteredGroup.people = filteredPerson;

        (() => {mediator.pub ('filter:on', this.filteredGroup);})();

    }

    doAction (act, person) {
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
    addTestResults (filter, people) {
        let resultTest = [];
        people.map((person) => {
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
    }



    filteredByCondition (filter, cond, actRez, person) {
        let condition = {
            '>': ()=> {
                if(actRez > filter.grade) {
                    return person;
                }
            },
            '<': ()=> {
                if(actRez < filter.grade) {
                    return person;
                }
            },
            '=': ()=> {
                if(actRez === filter.grade) {
                    return person;
                }
            }
        };

        return condition[cond]();
    }
}

module.exports = FilterController;