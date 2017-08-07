'use strict';

let mediator = require('../Mediator.js'),
	template = require('./tpl/tplModalTests.js');

class ModalTestView {
	constructor () {
		this.view;
	}

	show () {
		this.addGreyLayer();
		this.render();
		this.subscribe();
	}

	addGreyLayer () {
        let layer = '<div id="layer" class="modal-backdrop fade in"></div>';
        document.body.insertAdjacentHTML('beforeEnd', layer);
	}

	render () {
    	document.body.insertAdjacentHTML('beforeEnd', template);
    	this.getView();
	}

	getView () {
		this.view = document.body.querySelector('.add-test-modal');
	}

	subscribe () {
		this.view.querySelector('.button-save-test').addEventListener('click',
			this.saveTests.bind(this));
		this.view.querySelector('.button-close-test').addEventListener('click',
			this.delete.bind(this));
	}

	unsubscribe () {
		this.view.querySelector('.button-save-test').removeEventListener('click',
			this.saveTests.bind(this));
		this.view.querySelector('.button-close-test').removeEventListener('click',
			this.delete.bind(this));
	}

	saveTests () {
		let listOfPeople = this.view.querySelector('.test-input-area').value;
		
		mediator.pub('assignTests:saved', listOfPeople);

		this.delete();
	}

	delete () {
		this.unsubscribe();
		this.view.querySelector('.test-input-area').value = '';
		this.clearPeopleModal();
		
		document.body.querySelector('.modal-backdrop').remove();
	}

	clearPeopleModal () {
		this.view.remove();
	}
}

module.exports = ModalTestView;