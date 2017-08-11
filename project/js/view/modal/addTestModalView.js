'use strict';

let mediator = require('../../Mediator.js'),
    tpl = require('../../view/tpl/tplModalSettings.js'),
    BaseModalView = require('../../view/modal/baseModalView.js'),
    Test = require('../../model/Test.js');

class AddExamModalView extends BaseModalView {
    constructor(group) {
        super(group, tpl.editGroupTestModal);
        this.body = document.body;
        this.addedExams = [];
    }

    get selectors() {
        return {
            examsContainer: '.test-list .list-group',
            saveExamsBtn: '.save-new-exams-btn',
            modalBackdrop: '.modal-backdrop',
            closeBtn: '.close-edit-test-btn',
            examInput: '.add-test-input',
            examInputGrade: '.add-test-input-grade',
            addBtn: '.add-exam-btn'
        };
    }

    activate() {
        this.addBtn.addEventListener('click', this.addNewExamHandler.bind(this));
        this.closeBtn.addEventListener('click', this.hide.bind(this));
        this.saveExamsBtn.addEventListener('click', this.saveNewExamHandler.bind(this));
    }

    diactivate() {
        this.addBtn.removeEventListener('click', this.addNewExamHandler);
        this.closeBtn.removeEventListener('click', this.hide);
        this.saveExamsBtn.removeEventListener('click', this.saveNewExamHandler);
    }

    mapTemplate(template) {
        let testList = this.getTestList();
        return template.replace('{test-list}', testList);
    }

    collectSelectors() {
        this.container = this.modalContainer.querySelector(this.selectors.container);
        this.addBtn = this.modalContainer.querySelector(this.selectors.addBtn);
        this.closeBtn = this.modalContainer.querySelector(this.selectors.closeBtn);
        this.examsContainer = this.modalContainer.querySelector(this.selectors.examsContainer);
        this.saveExamsBtn = this.modalContainer.querySelector(this.selectors.saveExamsBtn);
    }

    getTestList() {
        let testListOption = '<ul class="list-group">';

        this.model.testList.forEach((test) => {
            testListOption += `<li class ="list-group-item">${test.name} ( ${test.maxGrade} )</li>`;
        });

        testListOption += '</ul>';

        return testListOption;
    }

<<<<<<< HEAD
    addNewExamHandler () {
        let testInputValue = document.querySelector(this.selectors.examInput).value,
            testInput = document.querySelector(this.selectors.examInput);

            if (testInputValue === '') {
                this.renderError();
            } else {
                let testInputArea = `<li class ="list-group-item">${testInputValue}</li>`,
                    newTest = new Test(testInputValue);

                testInput.value = '';

                this.addedExams.push(newTest);
                this.examsContainer.insertAdjacentHTML('beforeEnd', testInputArea);

                mediator.pub('test:added', newTest);
            }
=======
    addNewExamHandler() {
        debugger;
        let testInputValue = document.querySelector(this.selectors.examInput).value,
            testInput = document.querySelector(this.selectors.examInput),
            testInputGrade = document.querySelector(this.selectors.examInputGrade),
            testInputGradeValue = document.querySelector(this.selectors.examInputGrade).value;

        if (testInputValue === '') {
            this.renderError();
        } else {
            let testInputArea = `<li class ="list-group-item">${testInputValue} ( ${testInputGradeValue} )</li>`,
                newTest = new Test(testInputValue, testInputGradeValue);

            testInput.value = '';
            testInputGrade.value = '';
            this.addedExams.push(newTest);
            this.examsContainer.insertAdjacentHTML('beforeEnd', testInputArea);
        }
>>>>>>> f610182f027abf74be623cd952d727713b306976
    }

    renderError() {
        let input = this.body.querySelector('.add-test-input');

        input.placeholder = 'Enter TestName';
    }

    saveNewExamHandler() {
        mediator.pub('testModal:added', {group: this.model, addedTests: this.addedExams});
        this.addedExams = [];
        this.hide();
    }
}

module.exports = AddExamModalView;