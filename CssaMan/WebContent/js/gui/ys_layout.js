function showArtMgt(){
	ys_showMainPageForManagementBtnClick("article_mgt_borderContainer");
	
}

function showCalMgt(){
	ys_showMainPageForManagementBtnClick("calendar_mgt_borderContainer");
}

 

function doChgUserPasswd(){
	
}
 

function ys_showMainPageForManagementBtnClick(show_id){
	
	console.log("ys_showMainPageForManagementBtnClick show id = " , show_id);
	
	require(["dojo/dom","dojo/dom-style","dijit/registry"], 
			function(dom,domStyle,reg){

        		var container_show = reg.byId(show_id);
        		if(container_show){
        			container_show.getChildren().forEach(function(node){
        				domStyle.set(node.domNode, "display", "block");
        			});
        			domStyle.set(container_show.domNode, "display", "block");
        			container_show.layout();
        		}else{
        			console.log(container_hide, "not found!");
        		}


            var main_menu_bc = [{"id":"article_mgt_borderContainer"},{"id":"calendar_mgt_borderContainer"}];
         
        	
            for(var idx in main_menu_bc){
                var item = main_menu_bc[idx];
                var id = item.id;
                //console.log(item);
                if(id != show_id){
                    // console.log(id);
                    var container_hide = reg.byId(id);
                    if(container_hide){

                        container_hide.getChildren().forEach(function(node){
                            domStyle.set(node.domNode, "display", "none");
                        });

                        domStyle.set(container_hide.domNode, "display", "none");
                    }

                }
            }
             

            if("article_mgt_borderContainer" == show_id){
            	ys_start_article_grid(reg);
            }
        //var page_content = reg.byId("page_content_container");
        //page_content.resize();
    });
}

function ys_reg_onclick_event_for_sys(){
	
	console.log("ys_reg_onclick_event_for_sys");
	
	require(["dojo/on","dijit/registry"], function(on, reg){
		
		//user mgt
		var userMgt_btn = reg.byId("user_mgt_btn");
		on(userMgt_btn, "click", function(e){
		    var dlg = reg.byId("mgt_userDlg");
		    dlg.show();
		    ys_userDlgStart(reg);
		    
		});
		
		
		var userMgt_cl_btn = reg.byId("mgt_userDlg_cl");
		on(userMgt_cl_btn, "click", function(e){
		    var dlg = reg.byId("mgt_userDlg");
		    dlg.hide();
		    
		});
		
		//master mgt
		
		//article type
		
		var article_type_btn = reg.byId("master_article_type_btn");
		on(article_type_btn, "click", function(e){
		    var dlg = reg.byId("master_article_typeDlg");
		    dlg.show();
		    ys_master_data_simpleDlgStart(reg, "article_type");
		    
		});
		
		
		var userMgt_cl_btn = reg.byId("master_article_typeDlg_cl");
		on(userMgt_cl_btn, "click", function(e){
		    var dlg = reg.byId("master_article_typeDlg");
		    dlg.hide();
		    
		});
		
		
	});
}



function ys_grid_component_with_toolbar_start(id, layout, uri, colid, descending){
	
	require([ "dojo/dom-construct",
				"dojo/_base/window",
				"dojo/i18n!js/nls/common.js", "dojo/dom-style",
			"dijit/registry", "dojo/date/stamp", "dojo/store/JsonRest",
			"dojo/store/Memory", "dojo/store/Observable", "dojo/store/Cache",
			"dojo/when", "gridx/Grid", "gridx/core/model/cache/Async",
			"gridx/modules/VirtualVScroller", "gridx/modules/TouchScroll",
			"gridx/modules/ColumnResizer", "gridx/modules/SingleSort",
			"gridx/support/Summary", "gridx/modules/CellWidget",
			"gridx/modules/Bar", "gridx/modules/IndirectSelect",
			"gridx/modules/select/Row", "gridx/modules/move/Row",
			"gridx/modules/extendedSelect/Row", "gridx/modules/RowHeader",
			"gridx/modules/Pagination",
			"gridx/modules/pagination/PaginationBar", "gridx/modules/Filter",
			"gridx/modules/filter/FilterBar",
			"gridx/modules/filter/QuickFilter"

	], function(domConstruct, win, common, domStyle, reg, stamp, JsonRest, Memory, Observable,
			CacheL, when, Grid, Cache, VirtualVScroller, TouchScroll,
			ColumnResizer, SingleSort, Summary, CellWidget, Bar,
			IndirectSelect, Row, move_Row, Ext_Row, RowHeader, Pagination,
			PaginationBar, Filter, FilterBar, QuickFilter) {
		var master_store, cacheStore, store;
 
 
		var grid_div = reg.byId(id);
 

			master_store = new Observable(JsonRest({
				target : uri,
				headers: { 
					"Content-Type":"application/json",
					"X-Requested-With": "" 
		 		},
				idAttribute : "id"
			}));

			cacheStore = new Memory({
				idProperty : "id",
				data : []
			});
			
			
			store = CacheL(master_store, cacheStore);
		 

		if (!grid_div) {

			var getDateFromUTC = function(date) {
				if (date == "" || date == null) {
					return "";
				}

				return stamp.toISOString(new Date(date));
			};

  
			var toolbar_id = id + "Toolbar";
			domStyle.set(toolbar_id, "display", "block");
			
			var grid;
			
			if(YS_TEST){
				//无分页, 测试静态数据
				grid = new Grid({
					id : id,
					store : store,
					cacheClass : Cache,
					selectRowTriggerOnCell : true,
					structure : layout,
					selectRowMultiple : false,
				    barTop:[
					 { plugin:toolbar_id}
					 ],
					modules : [ CellWidget, ColumnResizer, TouchScroll, {
						moduleClass : SingleSort,
						initialOrder : {
							colId : colid,
							descending : descending
						}
					}, IndirectSelect, Row, RowHeader]
				});
			}else{
				//有分页, 真实数据
				grid = new Grid({
					id : id,
					store : store,
					cacheClass : Cache,
					vScrollerLazy : true,
					selectRowTriggerOnCell : true,
					structure : layout,
					selectRowMultiple : false,
					pageSize : 15,
					paginationBarSizes : [ 15, 30, 50, 100, 0 ],
				    barTop:[
					 { plugin:toolbar_id}
					 ],
					modules : [ CellWidget, ColumnResizer, TouchScroll, {
						moduleClass : SingleSort,
						initialOrder : {
							colId : colid,
							descending : descending
						}
					}, IndirectSelect, Row, RowHeader, Pagination, PaginationBar,
							VirtualVScroller, Filter, FilterBar, Bar ]
				});
				
			}
		 


			// Put it into the DOM tree.
			grid.placeAt(id + "Container");

			grid.connect(grid, "onCellClick", function(evt) {
				var cell = grid.cell(evt.rowId, evt.columnId, true);
				var rowId = cell.row.id;
				var row = grid.row(rowId);
				var rowData = grid.row(rowId).rawData();
				console.log("row data   ", rowData);
				
				ys_grid_select_update_page(id, reg, rowData, domConstruct, win);

			});

			grid.startup();

			

		} else {

			grid_div.setStore(store);
		}
 
	});
}