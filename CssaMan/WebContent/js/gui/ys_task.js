function ys_taskMgtStart(reg){
	
	ys_taskMgtGridStart(reg);
	
	var task_type_sel = reg.byId("mgt_task_taskType_sel");
	
	require(["dojo/request/xhr", "dojo/i18n!js/nls/common.js", "dojo/store/Memory"], function(xhr,common,Memory){
		
		if(YS_TEST){
			taskType_uri = "/" + SYS_PATH +"/test_res/tasktype.json";
		}else{
			taskType_uri = "/" + SYS_PATH +"/api/tasktype/";
		}
		
		
	 
		xhr(taskType_uri,
				{handleAs: "json", 
				 headers: { 
					 		"Content-Type":"application/json",
					 		"X-Requested-With": "" 
				 		   },
				 method:"GET"
				 }).then(function(data){

					 console.log("callback data", data);
					 if(data){
						 task_type_sel.store = new Memory({data:data});
						 task_type_sel.searchAtt = "label";
					 }else{
					 //do nothing
					 }
			 

				 },function(err){
					 alert(common.internal_server_error);
				 });			
		
		
	});
	
	 

}


function ys_taskMgtGridStart(reg){
	var id, layout, uri, colid, descending;
	
	 id = "mgt_taskDlgGrid";
	
	 layout = [ {
		id : 'taskTitle',
		field : 'taskTitle',
		name : '题目',
		width : '15%'
	}, {
		id : 'content',
		field : 'content',
		name : '状态',
		width : '55%',
		decorator : function(cellData) {
			if (cellData && cellData.length() > 0) {
				return cellData.length() > 20 ? cellData.substr(0,20) + "..." : cellData;
			}
			return "";
		}
	},{
		id : 'dueDate',
		field : 'dueDate',
		name : '执行时间',
		width : '15%',
		decorator : function(cellData) {
			if (cellData) {
				return getDateFromUTC(cellData);
			}
			return "";
		}
	},{
		id : 'pubDate',
		field : 'pubDate',
		name : '发布时间',
		width : '15%',
		decorator : function(cellData) {
			if (cellData) {
				return getDateFromUTC(cellData);
			}
			return "";
		}
	},

	];

	
	if (YS_TEST) {
		
		uri = "/" + SYS_PATH + "/test_res/task.json";
		 
	} else {
		
	    uri = "/" + SYS_PATH + "/api/task/"; 
	}
	
	colid = "dueDate";
	
	descending = true;
	
	
	ys_grid_component_with_toolbar_start(id, layout, uri, colid, descending);
	
	ys_start_task_grid_toolbar(id, reg);
}

function ys_start_task_grid_toolbar(id, reg){
	
	cleanArr = ["mgt_task_taskTitle", "mgt_task_content","mgt_task_dueDate","mgt_task_pubDate","mgt_task_taskType_sel"];
	
	requestArr = ["article_mgt_editor_title", "article_mgt_editor","mgt_task_dueDate","mgt_task_pubDate","mgt_task_taskType_sel"];
	
	validateArr = [];
	
	dateArr = ["mgt_task_dueDate","mgt_task_pubDate"];
 
	var interfaceObj = {
		id : "",
		taskTitle : reg.byId("mgt_task_taskTitle").get("value"), 
		content : reg.byId("mgt_task_content").get("value"),	 
		dueDate : "", //  时间戳 unix毫秒	 
		pubDate : "", //  时间戳
		taskTypeId:"",
		creDate:"",
		modDate:"",
		creUser:"",
		modUser:""
	};

	ys_grid_toolbar_init(gridId, interfaceObj, cleanArr, requestArr, validateArr, dateArr);
	
}