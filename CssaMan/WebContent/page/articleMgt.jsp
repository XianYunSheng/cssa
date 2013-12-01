<div data-dojo-type="dijit/layout/BorderContainer"
	id="article_mgt_borderContainer" design="sidebar" persist="false"
	gutters="true"
	style="position: absolute; top: 0; left: 0; min-width: 1em; min-height: 1px; max-width: 1200px; width: 100%; height: 100%;">

	<div data-dojo-type="dijit/layout/ContentPane"
		id="article_mgt_left_container" extractContent="false"
		preventCache="false" preload="false" refreshOnShow="false"
		region="top" splitter="true" maxSize="Infinity"
		style="display: none; width: 100%; height: 300px;" doLayout="false">
		<div id="article_mgt_gridContainer"></div>
	</div>
	<div data-dojo-type="dijit/layout/ContentPane"
		id="article_mgt_right_container" extractContent="false"
		preventCache="false" preload="false" refreshOnShow="false"
		region="center" splitter="" true"" maxSize="Infinity"
		style="display: none; width: 100%;" doLayout="false">
		

		<div>
			<table style="font-size: 12px;">
				<tr>
					<td id="article_title_lb"></td>
					<td colspan="6"><textarea id="article_mgt_editor_title"
							name="article_mgt_editor_title"
							data-dojo-type="dijit/form/SimpleTextarea"
							style="width: 550; height: 22; margin: 5px;">
	   	 			    </textarea></td>
				</tr>
				<tr>
					<td id="article_time_lb"></td>
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
					<td id="article_refers_select_lb"></td>
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
