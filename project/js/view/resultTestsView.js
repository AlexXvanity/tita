// 'use strict';
//
// class ResultTestsView {
//     constructor (results) {
//         this.section = document.querySelector('#result-section');
//         this.results = results;
//         this.createTable();
//     }
//
//     createTable () {
//         let table = `<table><tr><th>First Name</th><th>Surname</th><th>Email</th><th>Grade</th>`;
//
//         this.results.forEach(function (person) {
//             table +=
//                 `<tr>
//                     <td>${person.name}</td>
//                     <td>${person.surname}</td>
//                     <td>${person.email}</td>
//                     <td>${person.grade}</td>
//                 </tr>`;
//         });
//
//         table += '</table>';
//
//         this.section.innerHTML =
//             `<h4>Test results</h4>
//             <div>${table}</div>`;
//     }
// }
//
// module.exports = ResultTestsView;