function ys_start_article_grid() {

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
		var master_store, cacheStore, store, uri;

		// console.log("ys_start_article_grid------------> start ");

		var id = "article_mgt_grid";
		var grid_div = reg.byId(id);

		 

		// store = new Memory({data:demo_data});

		if (YS_TEST) {
			
			uri = "/" + SYS_PATH + "/test_res/article.json";
			 
		} else {
			
		    uri = "/" + SYS_PATH + "/api/article/";
		}
		
		
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

			var structure = [ {
				id : 'title',
				field : 'title',
				name : '题目',
				width : '15%'
			}, {
				id : 'state',
				field : 'state',
				name : '状态',
				width : '5%'
			}, {
				id : 'answer',
				field : 'answer',
				name : '回复数',
				width : '5%',
				formatter : function(rawData) {
					return rawData.answer.length;
				}
			}, {
				id : 'refer',
				field : 'refer',
				name : '参与',
				width : '15%',
				formatter : function(rawData) {
					var erg = "";
					var refers = rawData.refer;
					if (refers && refers.length > 0) {
						for ( var i in refers) {
							var item = refers[i];
							erg += item.dispname + " , ";
						}

						erg = erg.substring(0, erg.length - 2);
					}
					return erg;

				}
			}, {
				id : 'creuser',
				field : 'creuser',
				name : '创建者',
				width : '15%',
				decorator : function(cellData) {
					if (cellData) {

						return cellData;
					}

					return cellData;

				}
			}, {
				id : 'credate',
				field : 'credate',
				name : '创建时间',
				width : '15%',
				decorator : function(cellData) {
					if (cellData) {
						return getDateFromUTC(cellData);
					}
					return "";
				}
			}, {
				id : 'moduser',
				field : 'moduser',
				name : '更改者',
				width : '15%',
				decorator : function(cellData) {
					if (cellData) {

						return cellData;
					}

					return cellData;

				}
			}, {
				id : 'moddate',
				field : 'moddate',
				name : '修改时间',
				width : '15%',
				decorator : function(cellData) {
					if (cellData) {
						return getDateFromUTC(cellData);
					}
					return "";
				}
			},

			];

			// Create grid widget.
			var toolbar_id = id + "Toolbar";
			domStyle.set(toolbar_id, "display", "block");
			// console.log("ys_start_article_grid------------>4");
			var grid = new Grid({
				id : id,
				store : store,
				cacheClass : Cache,
				vScrollerLazy : true,
				selectRowTriggerOnCell : true,
				structure : structure,
				selectRowMultiple : false,
				pageSize : 15,
				paginationBarSizes : [ 10, 20, 50, 100, 0 ],
				// barTop:[
				// { plugin:toolbar_id}
				// ],
				modules : [ CellWidget, ColumnResizer, TouchScroll, {
					moduleClass : SingleSort,
					initialOrder : {
						colId : 'credate',
						descending : true
					}
				}, IndirectSelect, Row, RowHeader, Pagination, PaginationBar,
						VirtualVScroller, Filter, FilterBar, Bar ]
			});

			// Put it into the DOM tree.
			grid.placeAt("article_mgt_grid_container");

			grid.connect(grid, "onCellClick", function(evt) {
				var cell = grid.cell(evt.rowId, evt.columnId, true);
				var rowId = cell.row.id;
				var row = grid.row(rowId);
				var rowData = grid.row(rowId).rawData();
				console.log("row data   ", rowData);
				
				ys_grid_select_update_page(id, reg, rowData, domConstruct, win);

			});

			grid.startup();

			console.log("article grid startup");

		} else {

			grid_div.setStore(store);
		}

		ys_start_article_grid_toolbar(id, reg);

	});

}


function ys_start_article_grid_toolbar(gridId, reg) {

 
				
				cleanArr = ["article_mgt_editor_title", "article_mgt_editor"];
				
				requestArr = ["article_mgt_editor_title", "article_mgt_editor"];
				
				validateArr = [];
				
				dateArr = [];
			 
				var interfaceObj = {
					id : "",
					answer : [],
					title : reg.byId("article_mgt_editor_title").get(value),
					content : reg.byId("article_mgt_editor").get("value"),
					creuser : "", // 创建者username
					credate : "", // 创建时间戳 unix毫秒
					moduser : "",// 修改者 userid
					moddate : "",// 修改时间戳
					refer : [], // 涉及人或者参与者等，json array
					state : ""

				};

				ys_grid_toolbar_init(gridId, interfaceObj, cleanArr, requestArr, validateArr, dateArr);
				
				
				
				
				require(
						[ "dojo/i18n!js/nls/common.js", "dojo/dom-style",
								"dijit/registry", "dojo/request/xhr", "dojo/store/Memory",
								"dojo/on", "dojo/when", "dojo/dom-construct",
								"dojo/_base/window" ],
								
						function(common, domStyle, reg, xhr, Memory, on, when,
								domConstruct, win) {
							ys_set_user_list_in_article_refer(reg, xhr, common, Memory, domConstruct, win);
						});
			
				
			 

}



function ys_set_user_list_in_article_refer(reg, xhr, common, Memory,
		domConstruct, win) {

	var p_list = new Array();
	var uri = "";

	if (YS_TEST) {
		uri = "/" + SYS_PATH + "/test_res/users.json";
	} else {
		uri = "/" + SYS_PATH + "/api/user/";
	}

	xhr(uri, {
		handleAs : "json",
		headers: { 
			"Content-Type":"application/json",
			"X-Requested-With": "" 
 		}
	}).then(function(data) {ys_start_article_grid_toolbar
		if (data) {
			console.log("data from server ", data);
			for ( var p in data) {
				var person = data[p];
				var p_show = person.dispname;
				if (p_show && p_show != "") {
					p_list.push({
						username : person.username,
						dispname : p_show
					});
				}
			}
		}

		console.log("person_list ", p_list);

		var refers_select = reg.byId("article_refers_select");

		domConstruct.empty("article_refers_select");

		for ( var i in p_list) {
			console.log(i);
			var c = win.doc.createElement('option');

			c.innerHTML = p_list[i].dispname;
			c.value = p_list[i].username;
			console.log(c);
			refers_select.domNode.appendChild(c);
		}

	}, function(err) {
		console.log("put data error: users error");
	}, function(evt) {
	});

}



