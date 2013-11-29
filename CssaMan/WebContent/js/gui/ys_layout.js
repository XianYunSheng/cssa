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
            	ys_start_article_grid();
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
		
		
	});
}