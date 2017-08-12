'use strict';

let settingsModal = require('./settingsModalTpl.js'),
    settingsDropDown = require('./settingsDropDownTpl.js'),
    settingsTests = require('./settingsTestsTpl.js'),
    settingsFilters = require('./settingsFiltersTpl.js'),
    settingsAddTest = require('./settingsAddTestTpl.js'),
    settingsAddFilter = require('./settingsAddFilterTpl.js');

let tplSettings = {};

tplSettings.Modal = settingsModal;
tplSettings.DropDown = settingsDropDown;
tplSettings.Tests = settingsTests;
tplSettings.AddTest = settingsAddTest;
tplSettings.Filters = settingsFilters;
tplSettings.addFilter = settingsAddFilter;

module.exports = tplSettings;
