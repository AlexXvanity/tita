'use strict';

let App = require('../project/js/model/App.js'),
    Direction = require('../project/js/model/Direction.js');

describe('direction', function () {
    let app = new App();

    app.settings.directionList = [new Direction('php'), new Direction('go'), new Direction('js')];

    it('should have a name GO ', function () {
        expect(app.settings.directionList[0].name).toBe('php');
    });

    it('should have length of 3', function () {
        expect(app.settings.directionList.length).toBe(3);
    });
});

