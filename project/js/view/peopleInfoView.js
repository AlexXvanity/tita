'use strict';

let mediator = require('../Mediator.js'),
	template = require('./tpl/tplModalUsers.js');

class PeopleInfoView {
	constructor () {
		this.section = document.querySelector('#test-section');
		this.view = '';
	}

	show () {
		this.addLayerGrey();
		this.render();
		this.subscribe();
	}

	addLayerGrey () {
        let layer = '<div class="modal-backdrop fade in"></div>';
        document.body.insertAdjacentHTML('beforeEnd', layer);
	}

	render () {
    	document.body.insertAdjacentHTML('beforeEnd', template);

    	this.getView();
	}

	getView () {
		this.view = document.body.querySelector('.add-people-modal');
	}

	subscribe () {
		this.view.querySelector('.button-save-people').addEventListener('click',
			this.saveData.bind(this));
		this.view.querySelector('.button-close-people').addEventListener('click',
			this.delete.bind(this));
	}

	unsubscribe () {
		this.view.querySelector('.button-save-people').removeEventListener('click',
			this.saveData.bind(this));
		this.view.querySelector('.button-close-people').removeEventListener('click',
			this.delete.bind(this));
	}

	saveData () {
		let listOfPeople = this.view.querySelector('.people-input-area').value;

		mediator.pub('assignPeople:saved', listOfPeople);
		this.activateAddTest();
		this.delete();
	}
 
 	//create buttons into 'Tests' for adding info
	activateAddTest () {
        this.buttonsOpen = this.section.querySelectorAll('.test-item');

        this.buttonsOpen.forEach(function (buttonOpen) {
        	buttonOpen.querySelector('.panel-body').innerHTML = '<a class="btn btn-primary btn-xs add-test-button">Add test</a>';

        	buttonOpen.querySelector('.panel-body').addEventListener('click', () => {
            	mediator.pub('testModal:open');
        	});
        });
    }

	delete () {
		this.view.querySelector('.people-input-area').value = '';

		document.body.querySelector('.modal-backdrop').remove();
		this.clearPeopleModal();
		this.unsubscribe();
	}

	clearPeopleModal () {
		this.view.remove();
	}
}

module.exports = PeopleInfoView;