<div data-dojo-type="dijit/Dialog" id="mgt_userDlg">
    <script type="dojo/method" data-dojo-event="_onKey" data-dojo-args="evt">
        var key = evt.keyCode;
        if (key == dojo.keys.ENTER) {
        dojo.stopEvent(evt);
        }
    </script>
    <div>
    	<table  style="font-size: 12px;">
 
	        <tr>
	            <td id="mgt_user_username_lb"></td>
	            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text"  id="mgt_user_username"></td>
	            <td id="mgt_user_dispname_lb"></td>
	            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text"  id="mgt_user_dispname"></td>
	        </tr>
 
	        <tr>
	         	<td id="mgt_user_email_lb"></td>
	            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text"  id="mgt_user_email"></td>
	            <td colspan="2"></td>
	        </tr>
	        
	        <tr>
	        	<td id="mgt_user_roler_sel_lb"></td>
	        	<td><input data-dojo-type="dijit/form/FilteringSelect" id="mgt_user_roler_sel" required="true" pageSize ="10"/></td>
	        	<td colspan="2"></td>
	        </tr>
	        
    	</table>
    	
    </div>
    <div id="mgt_userDlgGridContainer">
    </div>
    <div>
          
          <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="baseClass:'loginButton'" id="mgt_userDlg_cl"></button>
 
    </div>
</div>