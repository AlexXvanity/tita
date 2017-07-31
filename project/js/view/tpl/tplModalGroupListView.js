'use strict';

let tpl = require('./tplModalSettings.js');

tpl.modalGroupListViev = () => {
    return `
    <div class="titleSection">Group</div>
    <div id="group-container">
      <i id="add-group" class="add-button fa fa-plus-circle" aria-hidden="true"></i>
    </div>
    <div class="config">
      <i id='config' class="config-button fa fa-cog" aria-hidden="true"></i>
    </div>
    `;
};

