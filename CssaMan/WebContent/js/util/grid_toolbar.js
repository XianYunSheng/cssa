function ys_grid_toolbar_init(gridId, interfaceObj, cleanArr, requestArr, validateArr, dateArr){
	
	require(
			[ "dojo/i18n!js/nls/common.js", "dojo/dom-style",
					"dijit/registry", "dojo/request/xhr", "dojo/store/Memory",
					"dojo/on", "dojo/when", "dojo/dom-construct",
					"dojo/_base/window" ],
					
			function(common, domStyle, reg, xhr, Memory, on, when,
					domConstruct, win) {
				 
				var toolbar = reg.byId(gridId + "Toolbar");
				var grid = reg.byId(gridId);
				var clean_btn = reg.byId(gridId + "Toolbar_create_btn");
				var insert_btn = reg.byId(gridId + "Toolbar_insert_btn");
				var change_btn = reg.byId(gridId + "Toolbar_change_btn");
				var delete_btn = reg.byId(gridId + "Toolbar_delete_btn");
				var refresh_btn = reg.byId(gridId + "Toolbar_refresh_btn");
				
				

				// clean
				if (clean_btn) {
					on(clean_btn, "click", function(e) {
						grid.select.row.clear();
						ys_page_clean(cleanArr, reg);

					});
				}

				if (insert_btn) {
					on(insert_btn,"click",function(e) {
						if (ys_pre_check(requestArr, reg)) {
							when( grid.store.add(ys_grid_insert(gridId, interfaceObj, reg)),function(value) {
												// do something when resolved
												console.log("after add");
												console.log("value ", value);
												if (!value.success) {
													alert(common.operation_error);
												} else {
													var new_id = value.id;
													grid.model.clearCache();
													grid.model.query({id : new_id}, 
													{
														start : 0,
														count : 1
													});
													grid.body.refresh();
													grid.select.row.clear();

													ys_page_clean(cleanArr, reg);

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
						var selected = grid.select.row.getSelected();
						if (selected.length != 1) {
							alert("请您在表中选择一行进行编辑");
							return false;
						} else {
							if (ys_pre_check(requestArr,reg)) {

								var row =  grid.row(selected[0]);
								when( grid.store.put(
										ys_grid_update(gridId, row, interfaceObj, reg),
										{
											id : selected[0]
										}), function(value) {

									console.log("value ", value);
									
									if (!value.success) {
										alert(common.operation_error);
									}

									grid.model.clearCache();
									grid.body.refresh();
								}, function(err) {
									// do something when rejected
									console.log("err ", err);
									alert(common.operation_error);
									grid.model.clearCache();
									grid.body.refresh();
									grid.select.row.clear();
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

								var selected = grid.select.row.getSelected();

								if (selected.length != 1) {
									alert("请您在表中选择一行进行编辑");
									return false;
								} else {
									when(
											grid.store.remove(selected[0]),
											function(value) {

												console.log(
														"delete_btn click ",
														value);

												if (!value) {
													alert(common.operation_error);
												} else {

													ys_page_clean(cleanArr, reg);

												}

												 grid.model.clearCache();
												 grid.body.refresh();

												 grid.select.row.clear();
											},
											function(err) {
												// do something when rejected
												console.log("err ", err);
												alert(common.operation_error);
												grid.model.clearCache();
												grid.body.refresh();
											}, function(update) {
											});
								}

							});
				}// end delete

				// refresh
				if (refresh_btn) {
					on(refresh_btn, "click", function(e) {

						console.log("refresh_btn click");
						grid.model.clearCache();

						grid.body.refresh();
						grid.select.row.clear();
						console.log("refresh finish");
					});
				}

				
			});
	
}





function ys_grid_insert(gridId, obj, reg) {
	
	obj.id = "";
	
	if("article_mgt_grid" == gridId){
		obj.answer = "";
		obj.creuser = YS_MGT_CURRENT_USER.username; // 创建者username
		obj.credate = new Date().getTime(); // 创建时间戳 unix毫秒
		obj.moduser = ""; // 修改者 userid
		obj.moddate = "";// 修改时间戳
		
		var refers = reg.byId("article_refers_select").get("value");
		var refers_disp = reg.byId("article_refers_select").get("displayedValue");
		var ref = new Array();
		for(var i in refers){
			ref.push({"username":refers[i],"dispname":refers_disp[i]});
		}
		
		obj.refer = ref; // 涉及人或者参与者等，json array
		obj.state = "";
		
	}else if("mgt_userDlgGrid" == gridId){
		
		obj.username = reg.byId("mgt_user_username");
		obj.name = reg.byId("mgt_user_dispname");
		obj.email = reg.byId("mgt_user_email");
		obj.userTypeId = reg.byId("mgt_user_roler_sel");
		//todo: 适配器他扩充属性
		
	}else if("master_article_typeDlgGrid" == gridId){
	
		obj.code = reg.byId("master_article_type_code");
		obj.label = reg.byId("master_article_type_label");
	 
	 
	}else if("master_task_typeDlgGrid" == gridId){
		
		obj.code = reg.byId("master_task_type_code");
		obj.label = reg.byId("master_task_type_label");
		
		
	}else if("master_user_typeDlgGrid" == gridId){
		
		obj.code = reg.byId("master_user_type_code");
		obj.label = reg.byId("master_user_type_label");
		
		
	}else if("mgt_taskDlgGrid" == gridId){
	
		obj.dueDate = reg.byId("mgt_task_dueDate");
		obj.pubDate = reg.byId("mgt_task_pubDate");
		obj.taskTypeId = reg.byId("mgt_task_taskType_sel");
		obj.creDate = new Date().getTime();
		obj.creUser = YS_MGT_CURRENT_USER.id;

	} 
 

	return obj;

}

function ys_grid_update(gridId, row, obj, reg) {
	
	obj.id = row.id;
	
	if("article_mgt_grid" == gridId){
		
		obj.answer = "";

		obj.moduser = YS_MGT_CURRENT_USER.username; // 修改者 userid
		obj.moddate = new Date().getTime();// 修改时间戳
		
		var refers = reg.byId("article_refers_select").get("value");
		var refers_disp = reg.byId("article_refers_select").get("displayedValue");
		var ref = new Array();
		for(var i in refers){
			ref.push({"username":refers[i],"dispname":refers_disp[i]});
		}
		
		obj.refer = ref; // 涉及人或者参与者等，json
																// array
		obj.state = "";

		
	}else if("mgt_userDlgGrid" == gridId){
		
		obj.username = reg.byId("mgt_user_username");
		obj.name = reg.byId("mgt_user_dispname");
		obj.email = reg.byId("mgt_user_email");
		obj.userTypeId = reg.byId("mgt_user_roler_sel");
		//todo: 适配器他扩充属性
		
	}else if("master_article_typeDlgGrid" == gridId){
	
		obj.code = reg.byId("master_article_type_code");
		obj.label = reg.byId("master_article_type_label");
	 
	 
	}else if("master_user_typeDlgGrid" == gridId){
		
		obj.code = reg.byId("master_user_type_code");
		obj.label = reg.byId("master_user_type_label");
		
		
	
	}else if("master_task_typeDlgGrid" == gridId){
		
		obj.code = reg.byId("master_task_type_code");
		obj.label = reg.byId("master_task_type_label");
		
		
	}else if("mgt_taskDlgGrid" == gridId){
	
		obj.dueDate = reg.byId("mgt_task_dueDate");
		obj.pubDate = reg.byId("mgt_task_pubDate");
		obj.taskTypeId = reg.byId("mgt_task_taskType_sel");
		obj.creDate = new Date().getTime();
		obj.creUser = YS_MGT_CURRENT_USER.id;

	}   

 
	
	return obj;

}

function ys_page_clean(cleanArr, reg) {
	
	for(var i in cleanArr){
		var widgetId = cleanArr[i];
		var widget = reg.byId(widgetId);
		if(widget){
			widget.reset();
		}
	}
 
}

function ys_pre_check(requestArr, reg) {
	
	
	for(var i in requestArr){
		var widgetId = cleanArr[i];
		var widget = reg.byId(widgetId);
		if(widget){
			var value = widget.get("value");
			if("" == value ||  value == null){
				alert("必填项不能为空");
				return false;
			}
		}
	}
 
}


function ys_grid_select_update_page(gridId, reg, row, domConstruct, win){
	
	
	
	if("article_mgt_grid" == gridId){
	
		var article_editor = reg.byId("article_mgt_editor");
		var article_editor_title = reg.byId("article_mgt_editor_title");
		var refers_select = reg.byId("article_refers_select");
	
	
		article_editor.set("value", row.content);
		article_editor_title.set("value",row.title);
	
	//domConstruct.empty("article_refers_select");

		var p_list = row.refer;
		var refer_arr = new Array();
		for ( var i in p_list) {
			//console.log(p_list[i]);
			refer_arr.push(p_list[i].username);
		}
	
		//console.log("refer array = ", refer_arr);
	
		refers_select.set("value",refer_arr);
		
	 
	}else if("mgt_userDlgGrid" == gridId){
		
		username = reg.byId("mgt_user_username").set("value", row.username);
		name = reg.byId("mgt_user_dispname").set("value", row.name);
		email = reg.byId("mgt_user_email").set("value", row.email);
		userTypeId = reg.byId("mgt_user_roler_sel").set("value", row.userTypeId);
		
		//todo: 适配器他扩充属性
		
	}else if("master_article_typeDlgGrid" == gridId){
	
		 reg.byId("master_article_type_code").set("value", row.code);
		 reg.byId("master_article_type_label").set("value", row.label);
	 
	
	}else if("master_user_typeDlgGrid" == gridId){
		
		reg.byId("master_user_type_code").set("value", row.code);
		reg.byId("master_user_type_label").set("value", row.label);
		
		
	}else if("master_task_typeDlgGrid" == gridId){
		
		reg.byId("master_task_type_code").set("value", row.code);
		reg.byId("master_task_type_label").set("value", row.label);
		
		
	}else if("mgt_taskDlgGrid" == gridId){
		
		reg.byId("mgt_task_taskTitle").set("value", row.taskTitle);
		reg.byId("mgt_task_content").set("value", row.content);
		reg.byId("mgt_task_dueDate").set("value", row.dueDate);
		reg.byId("mgt_task_pubDate").set("value", row.pubDate);
		reg.byId("mgt_task_taskType_sel").set("value", row.taskTypeId);
  

	}     
	 
	
	
	
	
}

/**
 * 
 * function ys_article_select_update_page(reg, row, domConstruct, win){
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
 */ 