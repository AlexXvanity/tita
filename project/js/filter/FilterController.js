'use strict';

let FilterItemView = require('./view/FilterItemView.js'),
    mediator = require('../Mediator.js'),
    AddFilterView = require('./view/modal/AddFilterView.js');

class FilterController {
    constructor() {
        this.selectedGroup = null;
        this.activate();
        this.filteredGroup = {};
        this.isFiltered = false;
        this.selectedFilter = null;
        this.filters = [];
    }

    activate() {
        mediator.sub('group:selected', this.groupSelectedHandler.bind(this));
        mediator.sub('addFilterView:render', this.renderAddFilterViewHandler.bind(this));
        mediator.sub('filter:added', this.addFilterHandler.bind(this));
        mediator.sub('filter:selected', this.filterPeople.bind(this));
        mediator.sub('filter:unSelected', this.unFilterPeople.bind(this));
        mediator.sub('filter:reject', this.reject.bind(this));
    }

    reject() {
        if (this.selectedFilter.condition === '>') {
            this.selectedFilter.condition = '<';
        } else if (this.selectedFilter.condition === '<') {
            this.selectedFilter.condition = '>';
        } else if (this.selectedFilter.condition === '=') {
            this.selectedFilter.condition = '!=';
        }

        this.filtering(this.selectedFilter, this.selectedGroup.people);
    }

    unFilterPeople() {
        this.isFiltered = false;
        this.filters = [];
        let rejects = document.querySelectorAll('.rejected .reject');
        rejects.forEach((btn) => {
            btn.removeEventListener('click', this.subReject);
        });
        (() => {
            mediator.pub('filter:on', this.selectedGroup);
        })();
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
        this.selectedFilter = filter;
        if (this.isFiltered) {
            this.filtering(filter, this.filteredGroup.people);
        } else {
            this.filtering(filter, this.selectedGroup.people);
            this.isFiltered = true;
        }
        let rejects = document.querySelectorAll('.rejected .reject');
        rejects.forEach((btn) => {
            btn.addEventListener('click', this.subReject);
        });

    }

    subReject() {
        mediator.pub('filter:reject', this.filteredGroup);
    }

    filtering(filter, peopleList) {
        this.filters.push({
            name: filter.name,
            pastedFilter: [],
            rejectedFilter: []
        });
        let people = JSON.parse(JSON.stringify(peopleList)),
            students = peopleList;

        this.addTestResults(filter, people);

        // let filteredPerson = [];

        people.map((person) => {
            let actionResult = this.doAction(filter.action, person);
            let result = this.filteredByCondition(filter, filter.condition, actionResult, person, students);

            // if (typeof (this.filters[this.filters.length-1].pastedFilter) === 'object') {
            //     return filteredPerson.push(result);
            // }
        });


        (() => {
            mediator.pub('filteredPeople:on', this.filters[this.filters.length-1]);
        })();

        console.log(this.filters);

    }

    doAction(act, person) {
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

    addTestResults(filter, people) {
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


    filteredByCondition(filter, cond, actRez, person, students) {
        let condition = {
            '>': () => {
                let rejected;
                let pasted;
                if (actRez > filter.grade) {
                    students.forEach((currentPeople) => {
                        if (currentPeople.email === person.email) {
                            pasted = currentPeople;
                        }
                    });
                    this.filters[this.filters.length-1].pastedFilter.push(pasted);
                } else {
                    students.forEach((currentPeople) => {
                        if (currentPeople.email === person.email) {
                            rejected = currentPeople;
                        }
                        if(typeof rejected !== 'undefined'){
                            this.filters[this.filters.length-1].rejectedFilter.push(rejected);
                        }

                    });
                }
            },
            '<': () => {
                if (actRez < filter.grade) {
                    return person;
                }
            },
            '=': () => {
                if (actRez === filter.grade) {
                    return person;
                }
            },

            '!=': () => {
                if (actRez !== filter.grade) {
                    return person;
                }
            }
        };

        return condition[cond]();
    }
}

module.exports = FilterController;