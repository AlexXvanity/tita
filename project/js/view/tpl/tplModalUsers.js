'use strict';

let tplUsers =  
    `<div class="modal fade display in add-people-modal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">People</h4>
                </div>
                <div class="modal-body">
            
                    <textarea class="people-input-area"></textarea>  
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn button-save-people">Save</button>
                    <button type="button" class="btn button-close-people" >Close</button>
                </div>
            </div>
        </div>
    </div>`;

module.exports = tplUsers;

