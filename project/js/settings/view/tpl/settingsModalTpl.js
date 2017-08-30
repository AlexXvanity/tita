'use strict';

let settingsModal =  `
        <div class="settings-main">
            <div class="settings-main-item">
                <h4>Directions</h4>
                <div class="direction-select"></div>
                <div class="direction-wrap">
                    <input type="text" class="input-new-direction" placeholder="New direction" size="10">
                    <i class="fa fa-plus-circle add-direction" aria-hidden="true"></i>
                </div>
            </div>
            <div class="settings-main-item button-wrap">
                <div class="btn"><button type="button" class="show-test-list btn btn-primary">Test</button></div>
                <div class="btn"><button type="button" class="show-filter-list btn btn-success">Filter</button></div>
            </div>
            <div class="settings-main-item direction-list">
                <div class="tests-filters-container"></div>
                <div class="close-btn">
                    <i class="fa fa-window-close close-button close-btn" aria-hidden="true"></i>
                </div>
            </div>
        </div>
`;

module.exports = settingsModal;