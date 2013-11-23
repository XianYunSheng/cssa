<div data-dojo-type="dijit/layout/BorderContainer"  design="sidebar" persist="false" gutters="false" style="min-width: 1em; min-height: 1px; z-index: 0; max-width: 1200px; width: 100%; height: 100%;">
    <div data-dojo-type="dijit/layout/ContentPane" id="page_main_toolbar_container" splitter="false" extractContent="false" preventCache="false" preload="false" refreshOnShow="false" region="top" splitter="true" maxSize="Infinity" style="height: 30px; max-width: 1200px; overflow: hidden;" doLayout="false">
        <span data-dojo-type="dijit/Toolbar" id="page_main_toolbar" style="display: none;">
            <input type="button" data-dojo-type="dijit/form/Button" id="article_mgt_btn" tabIndex="-1" intermediateChanges="false" label="Address Management"  iconClass="dijitNoIcon" onclick="showArtMgt();"></input>
            <input type="button" data-dojo-type="dijit/form/Button" id="calendar_mgt_btn" tabIndex="-1" intermediateChanges="false" label="Calendar Management" iconClass="dijitNoIcon" onclick="showCalMgt();"></input>
            
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
        
        
    </div>
</div>