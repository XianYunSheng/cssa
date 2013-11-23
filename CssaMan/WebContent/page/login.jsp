<div data-dojo-type="dijit/Dialog" id="mgt_loginDlg">
    <script type="dojo/method" data-dojo-event="_onKey" data-dojo-args="evt">
        var key = evt.keyCode;
        if (key == dojo.keys.ENTER) {
        doLogin();
        dojo.stopEvent(evt);
        }
    </script>
    <div id="login_showDataError"></div>
    <table  style="font-size: 12px;">
        <tr>
            <td colspan="2"><label id="mgt_login_error_lb" style="display:none; color: #ff0000;"></label></td>

        </tr>
        <tr>
            <td><label for="mgt_login_username" id="mgt_login_usr_lb"> </label></td>
            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="text" name="username" id="mgt_login_username"></td>
        </tr>
        <tr>
            <td><label for="mgt_login_password" id="mgt_login_pwd_lb"> </label></td>
            <td><input data-dojo-type="dijit/form/TextBox" trim="true" type="password" name="password" id="mgt_login_password"></td>
        </tr>
        <tr><td colspan="2" height="10px"> </td></tr>
        <tr><td colspan="2" height="20px"> </td></tr>
        <tr>
        	<td height="10px" align="center"><a id="mgt_password_forgot_lb" style="font-size: 12px;" href="javascript:;" onclick="doPasswdRecall();" ></a> </td>
        	<td height="10px" align="center"><a id="mgt_registration_lb" style="font-size: 12px;" href="javascript:;" onclick="doRegistration();" ></a> </td>
        </tr>
        <tr><td colspan="2" height="30px"> </td></tr>
        <tr>
            <td align="center" colspan="2">
                <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="onClick:function(){doLogin();},baseClass:'loginButton'" id="mgt_login_ok"></button>
                <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="onClick:function(){doLoginReset();},baseClass:'loginButton'" id="mgt_login_reset"></button>
 
            </td>
        </tr>
    </table>
</div>