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
            errorNotExitPerson () {
                this.showNotExistPerson(results);
            },
            peopleAdded: () => {
                this.showAddedPerson(results);
            },
            testResults: () => {
                this.showTestResults(results);
            }

        };
        return obj[renderStatus]();
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
             <h5 style="color: red">THIS PERSON NOT EXIST IN TIME SLOT</h5>
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
            `<h4>People</h4>
            <div>${table}</div>`;
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