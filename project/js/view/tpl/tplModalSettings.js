'use strict';

let tpl = {};

tpl.modalSettings = `
        <div id="settings">
            <div class="direction-select"></div>
            
           <div class="t-btn"><img src="images/t.png" class="show-test-list"/></div>
            <div class="f-btn"><img src="images/f.png" class="show-filter-list"/></div>
            
            <div id="tests-filters-container" class="direction-list"></div>
            <div class="close-btn"><i class="fa fa-window-close close-button close-btn" aria-hidden="true"></i></div>
        </div>
`;


tpl.editGroupExamModal =
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
                                <select class="form-control" id="direction-dropdown"></select>
                            </div>
                            <button id="save-group" type="submit" class="btn btn-default">Save</button>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="close-button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>

            </div>
        </div>
    `;

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
                                <input type="text" class="form-control" required id="group-name">
                            </div>
                            <div class="dropdown">
                                <select class="form-control direction-dropdown">
                                    <option>Other</option>
                                </select>
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

tpl.groupItem = `<div class="group-item col-xs-2 panel panel-primary">
        <div class="panel-heading">
        <h3 class="panel-title">{groupName}</h3>
        </div>
         <div class="panel-body">
             <a class="btn btn-primary btn-xs group-edit-exams">Edit exams</a>
            </div>
            </div>`;

tpl.editGroupModal =
    `<div class="modal fade display in edit-group-modal">
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
                                <input type="text" class="form-control" required id="group-name">
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

tpl.groupContextMenu = ` <div class="modal fade display in context-menu-group-modal">
            <div class="modal-dialog">

            
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Group managment</h4>
                    </div>
                    <div class="modal-body">
                        <button type="button" class="btn btn-primary btn-lg delete-group-btn">Delete this item</button>
                        <button type="button" class="btn btn-primary btn-lg edit-group-btn">Edit this item</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default close-group-context-menu">Close</button>
                    </div>
                </div>

            </div>
        </div>`;

tpl.addFilterModal =
    ` <div class="modal fade display in add-filter-modal">
            <div class="modal-dialog">

                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Group managment</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div>
                                <div class="form-group">
                                    <label for="usr">Filter name:</label>
                                    <input type="text" class="form-control filter-name-input">
                                </div>
                                <div class="dropdown">
                                    <label for="usr">Select test:</label>
                                    <select multiple class="form-control test-dropdown"></select>
                                </div>

                                <div class="dropdown">
                                    <label for="usr">Select action:</label>
                                    <select class="form-control action-dropdown"></select>
                                </div>

                                <div class="dropdown">
                                    <label for="usr">Select condition:</label>
                                    <select class="form-control condition-dropdown"></select>
                                </div>

                                <div class="form-group">
                                    <label for="usr">Grade:</label>
                                    <input type="text" class="form-control grade-input">
                                </div>
                        </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary save-filter-btn">Save changes</button>
                            <button type="button" class="btn btn-secondary cancel-filter-btn" data-dismiss="modal">Close</button>
                        </div>
                    </div>

                </div>
            </div>
    `;


tpl.modalGroupListViev =
    `
        <div class="titleSection">Group</div>
        <div id="group-container">
          <i id="add-group" class="add-button fa fa-plus-circle" aria-hidden="true"></i>
        </div>
        <div class="config">
          <i id='config' class="config-button fa fa-cog" aria-hidden="true"></i>
        </div>
        `;;


tpl.filterSection = `
                   <h3> Filter </h3>

                            <div class="col-xs-12 filter-list"></div>
                            <div class="filter-controls">
                                
                                <i class="add-button hide fa fa-plus-circle add-custom-filter" aria-hidden="true"></i>

                            </div>
`;

tpl.filterItem = `
                <div class="col-xs-8 panel panel-default filter-item">
                                     <div class="panel-body">
                                        {filterTitle}
                                     </div>
                                      
                                  </div>  
                                  
                                  <div class ="toogle-controls col-xs-4">
                                   
                                      <div class="btn-group btn-toggle active"> 
                                        <div>Active</div>
                                        <button class="btn btn-default">ON</button>
                                        <button class="btn btn-primary">OFF</button>
                                    </div>

                                    
                                      <div class="btn-group btn-toggle rejected"> 
                                      <div>Rejected</div>
                                        <button class="btn btn-default">ON</button>
                                        <button class="btn btn-primary">OFF</button>
                                    </div>
                                    </div>
`;

tpl.editGroupTestModal = `<div class="modal fade display in edit-group-test-modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="test-list">
                        {test-list}
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control add-test-input">
                            <i id="add-group" class="add-button fa fa-plus-circle add-exam-btn" aria-hidden="true"></i>
                            </div>
                        </div> 
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-default save-new-exams-btn">Save</button>
                        <button type="button" class="btn btn-default close-edit-test-btn" >Close</button>
                    </div>
                </div>
  
            </div>
        </div>
        `;
tpl.testListView = `<div class="titleSection">Test list</div>
                    <div id="test-list" class="clearfix"></div>
                    `;
module.exports = tpl;