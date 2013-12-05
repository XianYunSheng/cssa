<div data-dojo-type="dijit/Dialog" id="master_task_typeDlg" style="width:700px; height:680px; background: white;">
    <script type="dojo/method" data-dojo-event="_onKey" data-dojo-args="evt">
        var key = evt.keyCode;
        if (key == dojo.keys.ENTER) {
        dojo.stopEvent(evt);
        }
    </script>
    <div>
    	<table  style="font-size: 12px;">
 
	        <tr>
	            <td id="master_task_type_code_lb"></td>
	            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text"  id="master_task_type_code"></td>
	            <td id="master_task_type_label_lb"></td>
	            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text"  id="master_task_type_label"></td>
	        </tr>
 
	         
    	</table>
    	
    </div>
    <div id="master_task_typeDlgGridContainer" style="height:500px; padding-top:10; padding-bottom:10">
    </div>
    <div>
          
          <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="baseClass:'loginButton'" id="master_task_typeDlg_cl"></button>
 
    </div>
</div>