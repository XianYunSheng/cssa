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
		var master_store, cacheStore, store;

		// console.log("ys_start_article_grid------------> start ");

		var id = "article_mgt_grid";
		var grid_div = reg.byId(id);

		var demo_data = [ {
			articleId : 1, // article的id
			answer : [ {
				id : 3,
				title : "回复第一篇",
				creuser : 2
			} ],
			title : "第一篇",
			content : "This is the first aticle",
			creuser : "dashen", // 创建者username
			credate : 123123123, // 创建时间戳 unix毫秒
			moduser : "",// 修改者 userid
			moddate : "",// 修改时间戳
			refer : [ {
				userid : 2,
				dispname : "晓友",
				username : "dashen"
			}, {
				userid : 3,
				dispname : "吉晨",
				username : "jack"
			} ], // 涉及人或者参与者等，json array
			state : "A", // 状态，例如审核状态等
		}, {
			articleId : 2, // article的id
			answer : [],
			title : "第二篇",
			content : "This is the answer of the first aticle",
			creuser : "dashen", // 创建者username
			credate : 123223123, // 创建时间戳 unix毫秒
			moduser : "",// 修改者 userid
			moddate : "",// 修改时间戳
			refer : [ {
				userid : 2,
				dispname : "晓友",
				username : "shaun"
			}, {
				userid : 3,
				dispname : "吉晨",
				username : "jack"
			} ], // 涉及人或者参与者等，json array
			state : "A", // 状态，例如审核状态等
		}, {
			articleId : 3, // article的id
			answer : [],
			title : "回复第一篇",
			content : "This is the answer of the first aticle",
			creuser : "xiaoyou", // 创建者userid
			credate : 123123123, // 创建时间戳 unix毫秒
			moduser : "",// 修改者 userid
			moddate : "",// 修改时间戳
			refer : [ {
				userid : 2,
				dispname : "晓友",
				username : "shaun"
			}, {
				userid : 3,
				dispname : "吉晨",
				username : "jack"
			} ], // 涉及人或者参与者等，json array
			state : "A", // 状态，例如审核状态等
		} ];

		// store = new Memory({data:demo_data});

		if (YS_TEST) {
			store = new Memory({
				idProperty : "articleId",
				data : demo_data
			});
		} else {
			
			var uri = "/" + SYS_PATH + "/api/article/";
			
			master_store = new Observable(JsonRest({
				target : uri,
				headers: {                     // This is required to stop the
		 			"X-Requested-With": "" // server from rejecting the 
		 		},
				idAttribute : "articleId"
			}));

			cacheStore = new Memory({
				idProperty : "articleId",
				data : []
			});
			store = CacheL(master_store, cacheStore);
		}

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
				
				ys_article_select_update_page(reg, rowData, domConstruct, win);

			});

			grid.startup();

			console.log("article grid startup");

		} else {

			grid_div.setStore(store);
		}

		ys_start_article_grid_toolbar();

	});

}
function ys_start_article_grid_toolbar() {

	require(
			[ "dojo/i18n!js/nls/common.js", "dojo/dom-style",
					"dijit/registry", "dojo/request/xhr", "dojo/store/Memory",
					"dojo/on", "dojo/when", "dojo/dom-construct",
					"dojo/_base/window" ],
			function(common, domStyle, reg, xhr, Memory, on, when,
					domConstruct, win) {
				var grid_id = "article_mgt_grid";
				var article_toolbar = reg.byId(grid_id + "Toolbar");
				var article_grid = reg.byId(grid_id);
				var article_editor = reg.byId("article_mgt_editor");
				var article_editor_title = reg.byId("article_mgt_editor_title");

				var clean_btn = reg.byId(grid_id + "Toolbar_create_btn");
				var insert_btn = reg.byId(grid_id + "Toolbar_insert_btn");
				var change_btn = reg.byId(grid_id + "Toolbar_change_btn");
				var delete_btn = reg.byId(grid_id + "Toolbar_delete_btn");
				var refresh_btn = reg.byId(grid_id + "Toolbar_refresh_btn");

				var article_title = article_editor_title.get("value");
				var article_content = article_editor.get("value");

				var article_obj = {
					articleId : "",
					answer : [],
					title : article_title,
					content : article_content,
					creuser : "", // 创建者username
					credate : "", // 创建时间戳 unix毫秒
					moduser : "",// 修改者 userid
					moddate : "",// 修改时间戳
					refer : [], // 涉及人或者参与者等，json array
					state : ""

				};

				// clean
				if (clean_btn) {
					on(clean_btn, "click", function(e) {
						article_grid.select.row.clear();
						ys_article_page_clean(article_editor,
								article_editor_title);

					});
				}

				if (insert_btn) {
					on(
							insert_btn,
							"click",
							function(e) {

								console.log("article_editor = ", article_editor
										.get("value"),
										"  article_editor_title = ",
										article_editor_title.get("value"));

								if (ys_article_pre_check(article_content,
										article_title)) {
									when(
											article_grid.store
													.add(ys_article_grid_insert(
															article_obj, reg)),
											function(value) {
												// do something when resolved
												console.log("after add");
												console.log("value ", value);
												if (!value.success) {
													alert(common.operation_error);
												} else {
													var new_id = value.articleId;

													article_grid.model
															.clearCache();
													article_grid.model.query({
														articleId : new_id
													}, {
														start : 0,
														count : 1
													});
													article_grid.body.refresh();
													article_grid.select.row
															.clear();

													ys_article_page_clean(
															article_editor,
															article_editor_title);

												}
											}, function(err) {
												console.log("err ", err);
												alert(common.operation_error);
											}, function(update) {
											});
								}

							});
				} else {

					console.log("insert btn could not be found, ", insert_btn);
				}// end insert

				if (change_btn) {
					on(change_btn, "click", function(e) {
						console.log("update op");
						var selected = article_grid.select.row.getSelected();
						if (selected.length != 1) {
							alert("请您选择一个条目进行编辑");
							return false;
						} else {
							if (ys_article_pre_check(article_content,
									article_title)) {

								var row = article_grid.row(selected[0]);
								when(article_grid.store.put(
										ys_article_grid_update(row, obj, reg),
										{
											articleId : selected[0]
										}), function(value) {

									console.log("value ", value);
									if (!value.success) {
										alert(common.operation_error);
									}

									article_grid.model.clearCache();
									article_grid.body.refresh();
								}, function(err) {
									// do something when rejected
									console.log("err ", err);
									alert(common.operation_error);
									article_grid.model.clearCache();
									article_grid.body.refresh();
									article_grid.select.row.clear();
								}, function(update) {
								});

							}

						}

					});
				}// end update

				if (delete_btn) {
					on(
							delete_btn,
							"click",
							function(e) {
								// handle the event
								console.log("delete_btn click");

								var selected = article_grid.select.row
										.getSelected();

								if (selected.length != 1) {
									alert("请您选择一个条目进行编辑");
									return false;
								} else {
									when(
											article_grid.store
													.remove(selected[0]),
											function(value) {

												console.log(
														"delete_btn click ",
														value);

												if (!value) {
													alert(common.operation_error);
												} else {

													ys_article_page_clean(
															article_editor,
															article_editor_title);

												}

												article_grid.model.clearCache();
												article_grid.body.refresh();

												article_grid.select.row.clear();
											},
											function(err) {
												// do something when rejected
												console.log("err ", err);
												alert(common.operation_error);
												article_grid.model.clearCache();
												article_grid.body.refresh();
											}, function(update) {
											});
								}

							});
				}// end delete

				// refresh
				if (refresh_btn) {
					on(refresh_btn, "click", function(e) {

						console.log("refresh_btn click");
						article_grid.model.clearCache();

						article_grid.body.refresh();
						article_grid.select.row.clear();
						console.log("refresh finish");
					});
				}

				ys_set_user_list_in_article_refer(reg, xhr, common, Memory,
						domConstruct, win);
			});

}

function ys_article_grid_insert(obj, reg) {

	obj.articleId = "";
	obj.answer = "";
	creuser = YS_MGT_CURRENT_USER.username; // 创建者username
	credate = new Date().getTime(); // 创建时间戳 unix毫秒
	moduser = ""; // 修改者 userid
	moddate = "";// 修改时间戳
	
	
	
	var refers = reg.byId("article_refers_select").get("value");
	var refers_disp = reg.byId("article_refers_select").get("displayedValue");
	var ref = new Array();
	for(var i in refers){
		ref.push({"username":refers[i],"dispname":refers_disp[i]});
	}
	
	refer = ref; // 涉及人或者参与者等，json
															// array
	state = "";

	return obj;

}

function ys_article_grid_update(row, obj, reg) {

	obj.articleId = row.articleId;
	obj.answer = "";

	moduser = YS_MGT_CURRENT_USER.username; // 修改者 userid
	moddate = new Date().getTime();// 修改时间戳
	
	var refers = reg.byId("article_refers_select").get("value");
	var refers_disp = reg.byId("article_refers_select").get("displayedValue");
	var ref = new Array();
	for(var i in refers){
		ref.push({"username":refers[i],"dispname":refers_disp[i]});
	}
	
	refer = ref; // 涉及人或者参与者等，json
															// array
	state = "";

	return obj;

}

function ys_article_page_clean(content, title) {

	content.set("value", "");
	title.set("value", "");

}

function ys_article_pre_check(article_content, article_title) {

	if (article_content == "") {
		alert("内容不能为空");
		return false;
	}

	if (article_title == "") {
		alert("标题不能为空");
		return false;
	}

	return true;

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
		handleAs : "json"
	}).then(function(data) {
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


function ys_article_select_update_page(reg, row, domConstruct, win){
	//todo:
	var article_editor = reg.byId("article_mgt_editor");
	var article_editor_title = reg.byId("article_mgt_editor_title");
	var refers_select = reg.byId("article_refers_select");
	
	
	article_editor.set("value", row.content);
	article_editor_title.set("value",row.title);
	
	//domConstruct.empty("article_refers_select");

	var p_list = row.refer;
	var refer_arr = new Array();
	for ( var i in p_list) {
		console.log(p_list[i]);
		refer_arr.push(p_list[i].username);
	}
	
	console.log("refer array = ", refer_arr);
	
	refers_select.set("value",refer_arr);
	
}
