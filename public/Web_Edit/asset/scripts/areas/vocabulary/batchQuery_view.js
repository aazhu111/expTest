/**
 * 批量查询
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['common', 'utils/xhr', 'utils/copyutil', 'jquery'], function(common, xhr, ClipBoard, $) {

	$(function() {
		var multigroupoajax = {
			url: "http://192.168.6.79:8080/multigroupquery",
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
					'<td>' + data[i].classifyid + '</td>' +
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