'use strict';

let tpl = require('./tplModalSettings.js');



tpl.addGroupModal =
    `<div class="modal fade display in add-group-modal">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Group managment</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="usr">Select group:</label>
                                <input type="text" class="form-control" id="group-name">
                            </div>
                            <div class="dropdown">
                                <select class="form-control direction-dropdown"></select>
                            </div>
                            <button type="submit" class="btn btn-default save-group-btn">Save</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default close-group-btn" >Close</button>
                    </div>
                </div>

            </div>
        </div>
    `;

