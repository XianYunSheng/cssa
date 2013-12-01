function ys_master_data_simpleDlgStart(reg, type){
	
	var id, layout, uri, colid, descending;
	
	if("article_type" == type){
		id = "master_article_typeDlgGrid";
		if (YS_TEST) {
					
					uri = "/" + SYS_PATH + "/test_res/user.json";
					 
				} else {
					
				    uri = "/" + SYS_PATH + "/api/user/";
				}		
	}
		
		
		
		layout = [
					{
						id : 'code',
						field : 'code',
						name : '编号',
						width : '30%'
					},
					
					{
						id : 'label',
						field : 'label',
						name : '名称',
						width : '70%'
					} 						 
	          ];
		
		
		
		colid = "code";
		
		descending = true;
		
		ys_grid_component_with_toolbar_start(id, layout, uri, colid, descending);
		
		ys_start_mater_data_simple_grid_toolbar(id, reg, type);
	
}

function ys_start_mater_data_simple_grid_toolbar(id, reg, type){
	
	cleanArr = ["master_" + type + "_code", "master_" + type + "_label"];
	
	requestArr = ["master_" + type + "_code", "master_" + type + "_label"];
	
	//根据code的种类, 进行validate
	validateArr = [];
	
	dateArr = [];
 
	var interfaceObj = {
		id : "",
		code : "",
		label : "" 
	};

	ys_grid_toolbar_init(gridId, interfaceObj, cleanArr, requestArr, validateArr, dateArr);
}