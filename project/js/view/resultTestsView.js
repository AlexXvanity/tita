'use strict';

class ResultTestsView {
    constructor (results) {
        this.section = document.querySelector('#result-section');
        this.results = results;
        this.createTable();
    }

    createTable () {
        let table = `<table><tr><th>Surname</th><th>Name</th><th>Institution</th><th>Department</th>
            <th>Email</th><th>State</th><th>Started on</th><th>Completed</th>`;

        this.results.forEach(function (person) {
            table += 
                `<tr>
                    <td>${person.surname}</td>                                                                          
                    <td>${person.name}</td>
                    <td>${person.institution}</td>
                    <td>${person.department}</td>
                    <td>${person.email}</td>                                                                          
                    <td>${person.state}</td>
                    <td>${person.startedOn}</td>
                    <td>${person.completed}</td>                                                                          
                </tr>`;   
        });

        table += '</table>';

        this.section.innerHTML = 
            `<h4>Test results</h4>
            <div>${table}</div>`;
    }
}

module.exports = ResultTestsView;