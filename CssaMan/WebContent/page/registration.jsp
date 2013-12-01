<div data-dojo-type="dijit/Dialog" id="mgt_regDlg" style="width: 500px;" onCancel="{console.log('regDlg cancel');}" title="注册窗口">
    <script type="dojo/method" data-dojo-event="_onKey" data-dojo-args="evt">
        var key = evt.keyCode;
        if (key == dojo.keys.ENTER) {
        dojo.stopEvent(evt);
        }
    </script>
	
	 
    <table  style="font-size: 12px;">
        <tr>
            <td align="right" width="30%"><label for="mgt_reg_username" id="mgt_reg_username_lb" style="padding-right: 20px; font-size: 12px;"></label></td>
            <td align="left" width="30%"><input data-dojo-type="dijit/form/ValidationTextBox" trim="true" type="text" name="mgt_reg_username" id="mgt_reg_username"></td>
       		<td id="mgt_reg_username_format"></td>
        </tr>
        <tr>
            <td align="right"><label for="mgt_reg_email" id="mgt_reg_email_lb" style="padding-right: 20px; font-size: 12px;"> </label></td>
            <td align="left"><input data-dojo-type="dijit/form/ValidationTextBox"  data-dojo-props='validator:dojox.validate.isEmailAddress' required="true"
            					    trim="true" type="text" name="mgt_reg_email" id="mgt_reg_email"></td> 
        </tr>
        
    
        <tr>
            <td align="right" width="30%" id="mgt_reg_passwd_lb" ></td>
            <td align="left" width="30%">
            	<input type="password"
    				   name="mgt_reg_passwd"
    				   id="mgt_reg_passwd"
    				   dojoType="dijit/form/ValidationTextBox"
    				   required="true"
    			       intermediateChanges=false
    				   invalidMessage="请输入一个密码"></input>
            </td>
            <td id="mgt_reg_pwd_format"></td>
        </tr>
        <tr>
            <td align="right" width="30%" id="mgt_reg_varpw_lb"></td>
            <td align="left" width="30%">
            	<input type="password"
    				   name="mgt_reg_passwd2"
    				   id="mgt_reg_passwd2"
    				   dojoType="dijit/form/ValidationTextBox"
    				   required="true"
    				   constraints="{'other': 'mgt_reg_passwd'}"
    				   validator=ys_reg_confirmPassword
    			       intermediateChanges=false
    				   invalidMessage="你输入的密码与您第一次输入的密码不匹配" /></p>
            </td>
        </tr>
 
        
    
        <tr><td colspan="2" height="20px"> </td></tr>
        <tr><td colspan="2" height="20px"> </td></tr>

        <tr>
            <td align="center" colspan="2">
                <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="onClick:function(){doRegDlg();}, baseClass:'loginButton'" id="mgt_regDlg_ok">提交</button>
                <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="onClick:function(){hideRegDlg();}, baseClass:'loginButton'" id="mgt_regDlg_cl" >取消</button>
                 
            </td>
        </tr>
    </table>
    
</div>