'use strict';

class ResultPeopleView {
    constructor() {
        this.section = document.querySelector('#result-section');
    }

    showResult(results, renderStatus) {
        let obj = {
            errorExistPerson: () => {
                this.showExistPerson(results);
            },
            errorNotExistPerson: () => {
                this.showNotExistPerson(results);
            },
            peopleAdded: () => {
                this.showAddedPerson(results);
            },
            testResultsAdded: () => {
                this.showTestResults(results);
            },
            peopleWithMarks: () => {
                this.renderPeopleWithMarks(results);
            },
            filteredPeople: () => {
                this.showFilteredPeople(results);
            }

        };
        return obj[renderStatus]();
    }

    showFilteredPeople(results) {
        let filterName = results.name,
            pastedPeople = results.pastedFilter,
            rejectedPeople = results.rejectedFilter;

        if (!pastedPeople.length && !rejectedPeople.length) {
            this.showNoPerson();
        } else if (pastedPeople && rejectedPeople) {
            this.showAllPeople(pastedPeople, rejectedPeople);
        } else if (rejectedPeople.length && !pastedPeople.length) {
            this.showPeopleResult(rejectedPeople, filterName);
        } else if (pastedPeople.length && !rejectedPeople.length) {
            this.showPeopleResult(pastedPeople, filterName);
        }
    }

    showAllPeople (pastedPeople, rejectedPeople) {
        let pastedPeopleRes = this.generatePeopleTable(pastedPeople),
            rejectedPeopleRes = this.generatePeopleTable(rejectedPeople),
            generalTpl = ``;

        generalTpl = `<div class="result-wrap">
                        <h3>Pasted People</h3>
                          ${pastedPeopleRes}
                        <h3>Rejected People</h3>
                          ${rejectedPeopleRes}
                      </div>`;

        this.section.innerHTML = generalTpl;
    }

    generatePeopleTable (people) {
        let table = `<table><tr><th>First Name</th><th>Surname</th><th>Email</th>`,
            testListNameTpl = ``;

        let testList = people[people.length - 1].testList;

        testList.forEach((test) => {
            testListNameTpl += `<th>${test.name}</th>`;
        });

        table += testListNameTpl;

        people.forEach((person) => {
            let testListGradeTpl = ``;

            person.testList.forEach((test) => {
                testListGradeTpl += `<td>${test.grade}</td>`;
            });

            table +=
                `<tr>
                       <td>${person.name}</td>
                       <td>${person.surname}</td>
                       <td>${person.email}</td>
                            ${testListGradeTpl}
                   </tr>`;
        });

        table += '</table>';

        return table;
    }

    showPeopleResult (people, filterName) {
        if (!people.length) {
            this.showNoPerson();
        } else {
            let table = `<table><tr><th>First Name</th><th>Surname</th><th>Email</th>`,
                testListNameTpl = ``;

            let testList = people[people.length - 1].testList;

            testList.forEach((test) => {
                testListNameTpl += `<th>${test.name}</th>`;
            });

            table += testListNameTpl;

            people.forEach((person) => {
                let testListGradeTpl = ``;

                person.testList.forEach((test) => {
                    testListGradeTpl += `<td>${test.grade}</td>`;
                });

                table +=
                    `<tr>
                       <td>${person.name}</td>
                       <td>${person.surname}</td>
                       <td>${person.email}</td>
                            ${testListGradeTpl}
                   </tr>`;
            });

            table += '</table>';

            this.section.innerHTML =
                `<h3>Test results</h3>
             <h4>${filterName}</h4>
             
             <div class="result-wrap">${table}</div>`;
        }

    }

    renderPeopleWithMarks(results) {
        if (!results.length) {
            this.showNoPerson();
        } else {
            let table = `<table><tr><th>First Name</th><th>Surname</th><th>Email</th>`,
                testListNameTpl = ``;

            let testList = results[results.length - 1].testList;

            testList.forEach((test) => {
                testListNameTpl += `<th>${test.name}</th>`;
            });

            table += testListNameTpl;

            results.forEach((person) => {
                let testListGradeTpl = ``;

                person.testList.forEach((test) => {
                    testListGradeTpl += `<td>${test.grade}</td>`;
                });

                table +=
                    `<tr>
                        <td>${person.name}</td>
                        <td>${person.surname}</td>
                        <td>${person.email}</td>
                            ${testListGradeTpl}
                    </tr>`;
            });

            table += '</table>';

            this.section.innerHTML =
                `<h4>Test results</h4>
            <div class="result-wrap">${table}</div>`;
        }
    }

    showNoPerson() {
        this.section.innerHTML = `<h5 class="error-message">Empty Student List</h5>`;
    }

    showExistPerson(results) {
        let table = '<table style="background-color: #ff8282"><tr><th>Name</th><th>Surname</th><th>Email</th>';

        results.forEach(function (person) {
            table +=
                `<tr>
                    <td>${person.name}</td>                                                                          
                    <td>${person.surname}</td>
                    <td>${person.email}</td>
                </tr>`;
        });

        table += '</table>';

        this.section.innerHTML =
            `<h4 style="color: red">ERROR!!!</h4>
             <h5 style="color: red">THIS PERSON ALREADY EXIST</h5>
            <div>${table}</div>`;
    }

    showNotExistPerson(results) {
        let table = '<table style="background-color: #ff8282"><tr><th>Name</th><th>Surname</th><th>Email</th>';

        results.forEach(function (person) {
            table +=
                `<tr>
                    <td>${person.name}</td>                                                                          
                    <td>${person.surname}</td>
                    <td>${person.email}</td>
                </tr>`;
        });

        table += '</table>';

        this.section.innerHTML =
            `<h4 style="color: red">ERROR!!!</h4>
             <h5 style="color: red">THIS PERSON IS NOT EXIST IN THE TIME SLOT</h5>
            <div>${table}</div>`;
    }

    showAddedPerson(results) {
        let table = '<table><tr><th>Name</th><th>Surname</th><th>Email</th>';

        results.forEach(function (person) {
            table +=
                `<tr>
                    <td>${person.name}</td>                                                                          
                    <td>${person.surname}</td>
                    <td>${person.email}</td>
                </tr>`;
        });

        table += '</table>';

        this.section.innerHTML =
            `<div>${table}</div>`;
    }

    showTestResults(results) {
        let table = `<table><tr><th>First Name</th><th>Surname</th><th>Email</th><th>Grade</th>`;

        results.forEach(function (person) {
            table +=
                `<tr>
                    <td>${person.name}</td>                                                                          
                    <td>${person.surname}</td>
                    <td>${person.email}</td>                                                                          
                    <td>${person.grade}</td> 
                </tr>`;
        });

        table += '</table>';

        this.section.innerHTML =
            `<h4>Test results</h4>
            <div>${table}</div>`;
    }


}

module.exports = ResultPeopleView;