'use strict';

class ResultPeopleView {
    constructor (results) {
        this.section = document.querySelector('#result-section');
        this.results = results;
        this.createTable();
    }

    createTable () {
        let table = '<table><tr><th>Name</th><th>Surname</th><th>Email</th>';

        this.results.forEach(function (person) {
            table += 
                `<tr>
                    <td>${person.name}</td>                                                                          
                    <td>${person.surname}</td>
                    <td>${person.email}</td>
                </tr>`;   
        });

        table += '</table>'

        this.section.innerHTML = 
            `<h4>People</h4>
            <div>${table}</div>`;
    }
}

module.exports = ResultPeopleView;