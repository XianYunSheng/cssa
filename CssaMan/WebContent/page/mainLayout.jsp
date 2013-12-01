<div data-dojo-type="dijit/layout/BorderContainer"  design="sidebar" persist="false" gutters="false" style="min-width: 1em; min-height: 1px; z-index: 0; max-width: 1200px; width: 100%; height: 100%;">
    <div data-dojo-type="dijit/layout/ContentPane" id="page_main_toolbar_container" splitter="false" extractContent="false" preventCache="false" preload="false" refreshOnShow="false" region="top" splitter="true" maxSize="Infinity" style="height: 30px; max-width: 1200px; overflow: hidden;" doLayout="false">
        <span data-dojo-type="dijit/Toolbar" id="page_main_toolbar" style="display: none;">
            <input type="button" data-dojo-type="dijit/form/Button" id="article_mgt_btn" tabIndex="-1" intermediateChanges="false" label="Article Management"  iconClass="dijitNoIcon" onclick="showArtMgt();"></input>
            <input type="button" data-dojo-type="dijit/form/Button" id="calendar_mgt_btn" tabIndex="-1" intermediateChanges="false" label="Calendar Management" iconClass="dijitNoIcon" onclick="showCalMgt();"></input>
            <input type="button" data-dojo-type="dijit/form/Button" id="user_mgt_btn" tabIndex="-1" intermediateChanges="false" label="User Management" iconClass="dijitNoIcon"></input>
 
            <div data-dojo-type="dijit/form/DropDownButton" id="master_mgt_btn" showLabel="true">
                <div data-dojo-type="dijit/Menu">
                    <div data-dojo-type="dijit/PopupMenuItem" id="master_article_btn">
                        <div data-dojo-type="dijit/Menu">

                            <div data-dojo-type="dijit/MenuItem" id="master_article_type_btn"></div>
                            
                        </div>
                    </div>
                </div>
            </div> 
			            
            <span data-dojo-type="dijit/form/DropDownButton" id="welcome_btn" tabIndex="-1" intermediateChanges="false" label="Welcome" disabled="true" iconClass="dijitNoIcon" style="float: right;">
                <span  data-dojo-type="dijit/Menu" contextMenuForWindow="false" leftClickToOpen="false" tabIndex="0">
                    <span id="pw_chg_btn" data-dojo-type="dijit/MenuItem" data-dojo-props="onClick:function(){doChgUserPasswd();}" label="" iconClass="dijitNoIcon"></span>
                    <span id="logout_btn" data-dojo-type="dijit/MenuItem" label="" iconClass="dijitNoIcon"></span>

                </span>
            </span>

        </span>
    </div>
    <div data-dojo-type="dijit/layout/ContentPane" id="page_content_container" style="position: absolute; top:40px!important;" extractContent="false" preventCache="false" preload="false" refreshOnShow="false" region="center" splitter="false" maxSize="Infinity" doLayout="false">
		
		 <jsp:include page="calendarMgt.jsp"></jsp:include> 
		 <jsp:include page="articleMgt.jsp"></jsp:include>
		 <jsp:include page="userMgt.jsp"></jsp:include>
    </div>
    
</div>





<div data-dojo-type="dijit/Toolbar" id="article_mgt_gridToolbar" style="display: none; height: 20px; font-size: 12px; padding-bottom: 5px; margin-bottom: 5px;">
	<input type="button" data-dojo-type="dijit/form/Button" id="article_mgt_gridToolbar_clean_btn" intermediateChanges="false"
				label="清空" iconClass="dijitEditorIcon dijitEditorIconSep"
				tabIndex="-1"> </input> 
	<input type="button"
				data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_insert_btn" tabIndex="-1"
				intermediateChanges="false" label="提交"
				iconClass="dijitEditorIcon dijitEditorIconPaste"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_change_btn" tabIndex="-1"
				intermediateChanges="false" label="更改"
				iconClass="dijitEditorIcon dijitEditorIconSave"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_delete_btn" tabIndex="-1"
				intermediateChanges="false" label="删除"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_refresh_btn" tabIndex="-1"
				intermediateChanges="false" label="刷新"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input>
</div>

<div data-dojo-type="dijit/Toolbar" id="mgt_userDlgGridToolbar" style="display: none; height: 20px; font-size: 12px; padding-bottom: 5px; margin-bottom: 5px;">
	<input type="button" data-dojo-type="dijit/form/Button" id="mgt_userDlgGridToolbar_clean_btn" intermediateChanges="false"
				label="清空" iconClass="dijitEditorIcon dijitEditorIconSep"
				tabIndex="-1"> </input> 
	<input type="button"
				data-dojo-type="dijit/form/Button"
				id="mgt_userDlgGridToolbar_insert_btn" tabIndex="-1"
				intermediateChanges="false" label="提交"
				iconClass="dijitEditorIcon dijitEditorIconPaste"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="mgt_userDlgGridToolbar_change_btn" tabIndex="-1"
				intermediateChanges="false" label="更改"
				iconClass="dijitEditorIcon dijitEditorIconSave"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="mgt_userDlgGridToolbar_delete_btn" tabIndex="-1"
				intermediateChanges="false" label="删除"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="mgt_userDlgGridToolbar_refresh_btn" tabIndex="-1"
				intermediateChanges="false" label="刷新"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input>
</div>
		
<div data-dojo-type="dijit/Toolbar" id="master_article_typeDlgGridToolbar" style="display: none; height: 20px; font-size: 12px; padding-bottom: 5px; margin-bottom: 5px;">
	<input type="button" data-dojo-type="dijit/form/Button" id="master_article_typeDlgGridToolbar_clean_btn" intermediateChanges="false"
				label="清空" iconClass="dijitEditorIcon dijitEditorIconSep"
				tabIndex="-1"> </input> 
	<input type="button"
				data-dojo-type="dijit/form/Button"
				id="master_article_typeDlgGridToolbar_insert_btn" tabIndex="-1"
				intermediateChanges="false" label="提交"
				iconClass="dijitEditorIcon dijitEditorIconPaste"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="master_article_typeDlgGridToolbar_change_btn" tabIndex="-1"
				intermediateChanges="false" label="更改"
				iconClass="dijitEditorIcon dijitEditorIconSave"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="master_article_typeDlgGridToolbar_delete_btn" tabIndex="-1"
				intermediateChanges="false" label="删除"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input> 
	<input
				type="button" data-dojo-type="dijit/form/Button"
				id="master_article_typeDlgGridToolbar_refresh_btn" tabIndex="-1"
				intermediateChanges="false" label="刷新"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input>
</div>
		