<div data-dojo-type="dijit.Dialog" id="mgt_passwd_recallDlg" style="width: 400px;" onCancel="{console.log('passwdDlg cancel');}">
    <script type="dojo/method" data-dojo-event="_onKey" data-dojo-args="evt">
        var key = evt.keyCode;
        if (key == dojo.keys.ENTER) {
        dojo.stopEvent(evt);
        }
    </script>

    <table  style="font-size: 12px;">
        <tr>
            <td colspan="2"  id="mgt_password_forgot_text_lb" style="font-size: 12px;"></td>

        </tr>
        <tr><td colspan="2" height="20px"> </td></tr>
        <tr><td colspan="2" height="20px"> </td></tr>
        <tr>
            <td align="right" width="30%"><label for="mgt_password_usr" id="mgt_password_usr_lb" style="padding-right: 20px; font-size: 12px;"> </label></td>
            <td align="left" width="30%"><input data-dojo-type="dijit/form/TextBox" trim="true" type="text" name="mgt_password_usr" id="mgt_password_usr"></td>
        </tr>
<!--        <tr>
             <td align="right"><label for="mgt_password_email" id="mgt_password_email_lb" style="padding-right: 20px; font-size: 12px;"> </label></td>
            <td align="left"><input data-dojo-type="dijit/form/ValidationTextBox" data-dojo-props="validator:dojox.validate.isEmailAddress" trim="true" type="text" name="mgt_password_email" id="mgt_password_email"></td>

        </tr>
 -->
        <tr><td colspan="2" height="20px"> </td></tr>
        <tr><td colspan="2" height="20px"> </td></tr>

        <tr>
            <td align="center" colspan="2">
                <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="onClick:function(){doPasswdDlg();}, baseClass:'loginButton'" id="mgt_passwd_recallDlg_ok"></button>
                <button data-dojo-type="dijit/form/Button" type="button"
                        data-dojo-props="onClick:function(){dijit.byId('mgt_passwd_recallDlg').hide();}, baseClass:'loginButton'" id="mgt_passwd_recallDlg_cl"></button>
                 
            </td>
        </tr>
    </table>
</div>