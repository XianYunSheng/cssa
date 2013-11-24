<div data-dojo-type="dijit/layout/BorderContainer"
	id="article_mgt_borderContainer" design="sidebar" persist="false"
	gutters="true"
	style="position: absolute; top: 0; left: 0; min-width: 1em; min-height: 1px; max-width: 1200px; width: 100%; height: 100%;">

	<div data-dojo-type="dijit/layout/ContentPane"
		id="article_mgt_left_container" extractContent="false"
		preventCache="false" preload="false" refreshOnShow="false"
		region="top" splitter="true" maxSize="Infinity"
		style="display: none; width: 100%; height: 300px;" doLayout="false">
		<div id="article_mgt_grid_container"></div>
	</div>
	<div data-dojo-type="dijit/layout/ContentPane"
		id="article_mgt_right_container" extractContent="false"
		preventCache="false" preload="false" refreshOnShow="false"
		region="center" splitter="" true"" maxSize="Infinity"
		style="display: none; width: 100%;" doLayout="false">
		<div data-dojo-type="dijit/Toolbar" id="article_mgt_gridToolbar"
			style="display: none; height: 20px; font-size: 12px; padding-bottom: 5px; margin-bottom: 5px;">
			<input type="button" data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_clean_btn" intermediateChanges="false"
				label="清空" iconClass="dijitEditorIcon dijitEditorIconSep"
				tabIndex="-1"> </input> <input type="button"
				data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_insert_btn" tabIndex="-1"
				intermediateChanges="false" label="提交"
				iconClass="dijitEditorIcon dijitEditorIconPaste"> </input> <input
				type="button" data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_change_btn" tabIndex="-1"
				intermediateChanges="false" label="更改"
				iconClass="dijitEditorIcon dijitEditorIconSave"> </input> <input
				type="button" data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_delete_btn" tabIndex="-1"
				intermediateChanges="false" label="删除"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input> <input
				type="button" data-dojo-type="dijit/form/Button"
				id="article_mgt_gridToolbar_refresh_btn" tabIndex="-1"
				intermediateChanges="false" label="刷新"
				iconClass="dijitEditorIcon dijitEditorIconDelete"> </input>
		</div>

		<div>
			<table style="font-size: 12px;">
				<tr>
					<td>标题</td>
					<td colspan="6"><textarea id="article_mgt_editor_title"
							name="article_mgt_editor_title"
							data-dojo-type="dijit/form/SimpleTextarea"
							style="width: 550; height: 22; margin: 5px;">
	   	 			    </textarea></td>
				</tr>
				<tr>
					<td>时间</td>
					<td height="20px"><input style="width: 100px; font-size: 12px;"
						type="text" data-dojo-type="dijit/form/DateTextBox"
						id="article_start_date" intermediateChanges="false"
						trim="false" uppercase="false" lowercase="false"
						propercase="false" invalidMessage="$_unset_$"
						rangeMessage="$_unset_$"></input></td>
					<td>-</td>
					<td height="20px"><input style="width: 100px; font-size: 12px;"
						type="text" data-dojo-type="dijit/form/DateTextBox"
						id="article_end_date" intermediateChanges="false"
						trim="false" uppercase="false" lowercase="false"
						propercase="false" invalidMessage="$_unset_$"
						rangeMessage="$_unset_$"></input>
					</td>
					<td>&nbsp;</td>
					<td>参与者</td>
					<td rowspan="2"><select style="width: 300px;"
						id="article_refers_select" data-dojo-type="dijit/form/MultiSelect">
					</select></td>
				</tr>
			</table>
		</div>


		<div data-dojo-type="dijit/Editor" id="article_mgt_editor"
			style="height: 100%;"
			data-dojo-props="
	 	    height: '92%',
	 	    onChange:function(){console.log('editor1 onChange handler: ' + arguments[0])},
    		plugins:['cut','copy','paste','|',
    				 'bold','italic','underline','strikethrough','subscript','superscript','|',
    				 'indent', 'outdent', 'justifyLeft', 'justifyCenter', 'justifyRight','|'],
    		extraPlugins:['foreColor','hiliteColor',{name:'dijit/_editor/plugins/FontChoice', command:'fontName', generic:true},
						 {name: 'LocalImage', uploadable: true, uploadUrl: '', baseImageUrl: '../../form/tests/', fileMask: '*.jpg;*.jpeg;*.gif;*.png;*.bmp'}]  		
    		"></div>

	</div>
</div>
