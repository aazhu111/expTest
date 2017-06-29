/**
 * 批量查询
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['common', 'utils/xhr', 'utils/copyutil', 'jquery'], function(common, xhr, ClipBoard, $) {

	$(function() {
		var cachevariable = {
			highsearchcount:1,
			fieldquerycount:1,
		}
		var count = 1;
		/*高级查询*/
		var highsearchtemplate = 
                '<select class="selectnowidth form-control mr15"> '+
                    '<option value="0">全部途径</option> '+
                    '<option value="1">分类途径</option> '+
                    '<option value="2">主题途径</option> '+
                    '<option value="3">类号</option> '+
                    '<option value="4">类名</option> '+
                    '<option value="5">类目注释</option> '+
                    '<option value="6">所属类目路径</option> '+
                    '<option value="7">所属类目路径</option> '+
                    '<option value="8">主题词</option> '+
                    '<option value="9">主题词英译名</option> '+
                    '<option value="10">主题词拼音</option> '+
                    '<option value="11">主题词注释</option> '+
                    '<option value="12">主题词注释</option> '+
                    '<option value="13">控制号</option> '+
                    '<option value="14">评注文字</option> '+
                '</select> '+
                '<select class="selectnowidth form-control mr15"> '+
                    '<option value="0">任意一致</option> '+
                    '<option value="1">一体化扩检</option> '+
                    '<option value="2">完全一致</option> '+
                    '<option value="3">前方一致</option> '+
                    's<option value="4">完全一致</option> '+
                '</select> '+
                '<input type="" name="" class="form-control mr15"> '+
                '<select class="selectnowidth form-control mr15"> '+
                    '<option value="0">请选择组合条件</option> '+
                    '<option value="1">与</option> '+
                    '<option value="2">或</option> '+
                    '<option value="3">非</option> '+
                '</select> '+
                '<span class="mr15 highsearchadd"></span> '+
                '<span class="multiquery1 mr15 highsearchdel"></span> ';
                /*字段查询*/
            var fieldquerytemplate = 
                '<label class="">字段号</label> '+
                '<input type="text" class="width70 form-control mr15" name="" value="" > '+
                '<label class="">指示符</label> '+
                '<input type="text" class=" width50 form-control mr15" name="" value="" "> '+
                '<label class="">子字段</label> '+
                '<input type="text" class="form-control mr15" name="" value="" > '+
                '<label class="">检索字段内容</label> '+
                '<input type="text" class="form-control mr15" name="" value="" > '+
                '<label class="">起位置</label> '+
                '<input type="text" class="width50 form-control mr15" name="" value="" > '+
                '<label class="">止位置</label> '+
                '<input type="text" class="width50 form-control mr15" name="" value="" > '+
                '<select class="selectnowidth form-control mr15"> '+
                    '<option value="0">请选择组合条件</option> '+
                    '<option value="1">与</option> '+
                    '<option value="2">或</option> '+
                    '<option value="3">非</option> '+
                '</select> '+
                '<span class="mr15 fieldqueryadd"></span> '+
                '<span class="multiquery1 mr15 fieldquerydel"></span> ';

         /*只要页面中存在，就会添加删除*/
        $(".highsearch").on("click",".highsearchadd",function(){
        	/*设置id，填充元素*/
        	cachevariable.highsearchcount++;
        	$(this).parent().after('<div id="multiquery'+cachevariable.highsearchcount+'" class="multigroupquery"></div>')
        	$("#multiquery"+cachevariable.highsearchcount).html(highsearchtemplate);
        });
        $(".highsearch").on("click",".fieldqueryadd",function(){
        	cachevariable.fieldquerycount++;
        	$(this).parent().after('<div id="fieldquery'+cachevariable.fieldquerycount+'" class="multigroupquery"></div>')
        	$("#fieldquery"+cachevariable.fieldquerycount).html(fieldquerytemplate);
        });
         $(".highsearch").on("click",".highsearchdel",function(){
        	$(this).parent().remove();
        })
          $(".highsearch").on("click",".fieldquerydel",function(){
        	$(this).parent().remove();
        })
		var multigroupoajax = {
			url: WebApi_Edit+"/multigroupquery",
			type: "post",
			dataType: "json",
			data: {
				"num": 1,
			},
			success: function(data) {
				var thead =
				'<thead>' +
					'<tr>' +
					'<th>分类类型</th>' +
					'<th>分类号</th>' +
					'<th>类名</th>' +
					'<th>记录控制号</th>' +
					'<th>操作</th>' +
					'</tr>' +
				'</thead>'+
				'<tbody class="result">';
				var tbody = "";
				for(var i =0;i<data.length;i++){
				tbody += 
					'<tr>' +
					'<td>' + data[i].classifytype + '</td>' +
					'<td>' + data[i].classifyid + '</td>' +
					'<td>' + data[i].classifyname + '</td>' +
					'<td>' + data[i].recordcontrolnum + '</td>' +
					' <td>' +
					'<a title="编辑" class="iconfont icon-open-notes  edit"></a>' +
					'<span title="删除" class="iconfont icon-open-delete offset-lg-1 del"></span>' +
					'</td>' +
					'</tr>';
					}

				var tabletmplate = 
				'<table class="table-common">' + thead + tbody + '</tbody></table>';
				$("#wrapper").html(tabletmplate);

			}
		}
		xhr.callAjax(multigroupoajax);
	})
});