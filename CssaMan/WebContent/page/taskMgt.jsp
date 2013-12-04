<div data-dojo-type="dijit/Dialog" id="mgt_taskDlg" style="width:700px; height:680px; background: white;">
    <script type="dojo/method" data-dojo-event="_onKey" data-dojo-args="evt">
        var key = evt.keyCode;
        if (key == dojo.keys.ENTER) {
        dojo.stopEvent(evt);
        }
    </script>
    <div>
    	<table  style="font-size: 12px;">
 
	        <tr>
	            <td id="mgt_task_taskTitle_lb"></td>
	            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text"  id="mgt_task_taskTitle"></td>
	            <td id="mgt_task_content_lb"></td>
	            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text"  id="mgt_task_content"></td>
	        </tr>
 
	        <tr>
	         	<td id="mgt_task_dueDate_lb"></td>
	            <td><input data-dojo-type="dijit/form/DateTextBox" trim="true" type="text"  id="mgt_task_dueDate"></td>
	            <td id="mgt_task_pubDate_lb"></td>
	            <td><input data-dojo-type="dijit/form/DateTextBox" trim="true" type="text"  id="mgt_task_pubDate"></td> 
	        </tr>
	        
	        <tr>
	        	<td id="mgt_task_taskType_sel_lb"></td>
	        	<td><input data-dojo-type="dijit/form/FilteringSelect" id="mgt_task_taskType_sel" required="false" pageSize ="10"/></td>
	        	<td colspan="2"></td>
	        </tr>
	        
    	</table>
    	
    </div>
    <div id="mgt_taskDlgGridContainer" style="height:500px; padding-top:10; padding-bottom:10">
    </div>
    <div>
          
          <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="baseClass:'loginButton'" id="mgt_taskDlg_cl"></button>
 
    </div>
</div>