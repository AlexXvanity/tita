'use strict';

class ResultPeopleView {
    constructor () {
        this.section = document.querySelector('#result-section');
    }

    showResult (results, renderStatus) {
        let obj = {
            errorExistPerson: () => {
                this.showExistPerson(results);
            },
            errorNotExistPerson: () =>  {
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
            }

        };
        return obj[renderStatus]();
    }

    renderPeopleWithMarks (results) {
        let table = `<table><tr><th>First Name</th><th>Surname</th><th>Email</th>`,
            testListNameTpl = ``;

        let testList = results[0].testList;

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

    showExistPerson (results) {
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

    showNotExistPerson (results) {
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
             <h5 style="color: red">THIS PERSON NOT EXIST IN THE TIME SLOT</h5>
            <div>${table}</div>`;
    }

    showAddedPerson (results) {
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
    
    showTestResults (results) {
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