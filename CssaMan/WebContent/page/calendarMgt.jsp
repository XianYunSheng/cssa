<div data-dojo-type="dijit/layout/BorderContainer" id="calendar_mgt_borderContainer" design="sidebar"
     persist="false" gutters="true"
     style="position:absolute; top:0; left:0; min-width: 1em; min-height: 1px;  width: 100%; height: 100%;">
    
    <div data-dojo-type="dijit/layout/ContentPane" id="calendar_mgt_left_container"
         extractContent="false" preventCache="false" preload="false" refreshOnShow="false" region="left" splitter="true"
         maxSize="Infinity" style=" display:none;  width: 240px;" doLayout="false">

        <input id="calendar_mgt_calendar_picker" data-dojo-type="dijit/Calendar" style="width: 100%; height: 195px; font-size: 12px;"></input>
        <span id="calendar_mgt_calendar_tp" data-dojo-type="dijit/TitlePane" title="Calendar" extractContent="false" preventCache="false" preload="false"
                refreshOnShow="false" duration="200" open="true" style="min-width: 1em; width: 100%; height: auto;">
            <table style="border-collapse: collapse; table-layout: fixed; width: 100%; height: auto;">
            <colgroup>
                <col></col>
                <col></col>
            </colgroup>
            <tbody style="font-size: 13px;">
                <tr>
                    <td width="100%"><input id="calendar_mgt_calendar_team_checkbox" type="checkbox"  checked="true" data-dojo-type="dijit/form/CheckBox"><label id="calendar_mgt_calendar_team_checkbox_lb" for="calendar_mgt_calendar_team_checkbox">Team Calendar</label></input>
                    </td>

                </tr>
                <tr>
                    <td width="100%"><input id="calendar_mgt_calendar_public_checkbox" type="checkbox" checked="true" data-dojo-type="dijit/form/CheckBox"><label id="calendar_mgt_calendar_public_checkbox_lb" for="calendar_mgt_calendar_public_checkbox">Public Calendar</label></input>
                    </td>

                </tr>
            </tbody>
            </table>
        </span>
        <span id="calendar_mgt_event_properties_tp" data-dojo-type="dijit/TitlePane" title="Event properties" extractContent="false" preventCache="false"
              preload="false" refreshOnShow="false" duration="200" open="true"
              style="min-width: 1em; width: 100%; height: auto;">
            <table style="border-collapse:collapse;table-layout:fixed;width:100%;height:auto; font-size: 12px;" border="0">
                <colgroup>
                    <col></col>
                    <col></col>
                </colgroup>
            <tbody>
                <tr>
                    <td id="calendar_mgt_summery_lb" colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input id="calendar_mgt_summery_text"  type="text" data-dojo-type="dijit/form/TextBox" style="width:  98%;"></input>
                    </td>
                </tr>
                <tr>
                    <td id="calendar_mgt_time_start_lb" colspan="2"></td>
                </tr>
                <tr>
                    <td>
                        <input type="text" id="calendar_mgt_time_start_date" data-dojo-type="dijit/form/DateTextBox"
                               intermediateChanges="false" trim="false" uppercase="false"
                               lowercase="false" propercase="false" invalidMessage="$_unset_$"
                               rangeMessage="$_unset_$"
                               style="width:  95%; font-size: 11px;"></input>
                    </td>
                    <td>
                        <input type="text" id="calendar_mgt_time_start_time" data-dojo-type="dijit/form/TimeTextBox" style="width:  95%;"></input>
                    </td>
                </tr>
                <tr>
                    <td id="calendar_mgt_time_end_lb" colspan="2"></td>
                </tr>
                <tr>
                    <td>
                        <input type="text" id="calendar_mgt_time_end_date" data-dojo-type="dijit/form/DateTextBox"
                               intermediateChanges="false" trim="false" uppercase="false"
                               lowercase="false" propercase="false" invalidMessage="$_unset_$"
                               rangeMessage="$_unset_$"
                               style="width: 95%;"></input>
                    </td>
                    <td>
                        <input type="text" id="calendar_mgt_time_end_time" data-dojo-type="dijit/form/TimeTextBox" style="width: 95%;"></input>
                    </td>
                </tr>
                <tr>
                    <td id="calendar_mgt_calendar_select_lb" colspan="2"></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <select id="calendar_mgt_calendar_select" style="width: 98%" data-dojo-type="dijit/form/FilteringSelect" intermediateChanges="false" trim="false" uppercase="false" lowercase="false" propercase="false" required="true" invalidMessage="$_unset_$" pageSize="Infinity" searchDelay="200">

                        </select>
                    </td>
                </tr>
                <tr>
                    <td><input id="calendar_mgt_all_day_checkbox" type="checkbox" data-dojo-type="dijit/form/CheckBox"><label id="calendar_mgt_all_day_checkbox_lb" for="calendar_mgt_all_day_checkbox"></label></td>
                </tr>

                <tr>
                    <td><input id="calendar_mgt_event_update_btn" type="button" data-dojo-type="dijit/form/Button" intermediateChanges="false" label="update" iconClass="dijitNoIcon"></input> </td>
                    <td><input id="calendar_mgt_event_delete_btn" type="button" data-dojo-type="dijit/form/Button" intermediateChanges="false" label="delete" iconClass="dijitNoIcon"></input> </td>
                </tr>
            </tbody>
            </table>
        </span>
    </div>
    <div data-dojo-type="dijit/layout/ContentPane" id="calendar_mgt_middle_container"
         extractContent="false" preventCache="false" preload="false" refreshOnShow="false" region="center"
         splitter="false" maxSize="Infinity" style="display:none;max-width: 1200px; overflow: auto; " doLayout="false">
        <div id="calendar_mgt_calendar_holder">
        </div>
    </div>
</div>