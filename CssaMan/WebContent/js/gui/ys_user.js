function ys_userDlgStart(reg){
	
	
	var user_type_sel = reg.byId("mgt_user_roler_sel");
	
	require(["dojo/request/xhr", "dojo/i18n!js/nls/common.js", "dojo/store/Memory"], function(xhr,common,Memory){
		
		 
			userType_uri = "/" + SYS_PATH +"/api/usertype/";
		 
		
	 
		xhr(userType_uri,
				{handleAs: "json", 
				 headers: { 
					 		"Content-Type":"application/json",
					 		"X-Requested-With": "" 
				 		   },
				 method:"GET"
				 }).then(function(data){

					 console.log("callback data", data);
					 if(data){
						 user_type_sel.store = new Memory({data:data});
						 user_type_sel.searchAtt = "label";
					 }else{
					 //do nothing
					 }
			 

				 },function(err){
					 alert(common.internal_server_error);
				 });			
		
		
	});
	
	
	var id, layout, uri, colid, descending;
	
	id = "mgt_userDlgGrid";
	
	layout = [
					{
						id : 'username',
						field : 'username',
						name : '用户名',
						width : '25%'
					},
					
					{
						id : 'email',
						field : 'email',
						name : '电子邮件',
						width : '30%'
					} 
					// 这里需要扩充属性. 但因为后台没有实现接口. 暂时只有这两个
	          ];
	
 
		
	    uri = "/" + SYS_PATH + "/api/user/";
	 
	
	colid = "username";
	
	descending = true;
	
	ys_grid_component_with_toolbar_start(id, layout, uri, colid, descending);
	
	ys_start_user_grid_toolbar(id, reg);
	
}

function ys_start_user_grid_toolbar(id, reg){
	
	//需要之后根据user的属性扩充
	cleanArr = ["mgt_user_username", "mgt_user_dispname", "mgt_user_email", "mgt_user_roler_sel"];
	
	requestArr = ["mgt_user_username", "mgt_user_dispname", "mgt_user_email"];
	
	validateArr = [];
	
	dateArr = [];
 
	//这里name属性需要更改. 应该有first name, last name, dispname， 其中dispname是指显示名.
	//roler等其他属性需要扩充
	var interfaceObj = {
		id : "",
		name : "",
		email : "",
		username : ""

	};

	ys_grid_toolbar_init(gridId, interfaceObj, cleanArr, requestArr, validateArr, dateArr);
	
}