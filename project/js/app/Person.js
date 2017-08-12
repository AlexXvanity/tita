'use strict';

class Person {
    constructor (name, surname, email, testDay) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.testDay = testDay;
        this.testList = [];
    }
}

module.exports = Person;