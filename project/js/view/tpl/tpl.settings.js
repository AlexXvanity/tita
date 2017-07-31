'use strict';

let settingsModal = require('./settingsModal.tpl.js'),
    settingsDropDown = require('./settingsDropDown.tpl.js'),
    settingsTests = require('./settingsTests.tpl.js'),
    settingsFilters = require('./settingsFilters.tpl.js'),
    settingsAddTest = require('./settingsAddTest.tpl.js'),
    settingsAddFilter = require('./settingsAddFilter.tpl.js');

let tplSettings = {};

tplSettings.Modal = settingsModal;
tplSettings.DropDown = settingsDropDown;
tplSettings.Tests = settingsTests;
tplSettings.AddTest = settingsAddTest;
tplSettings.Filters = settingsFilters;
tplSettings.addFilter = settingsAddFilter;

module.exports = tplSettings;
