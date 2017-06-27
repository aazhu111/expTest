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
			url: "http://localhost:8080/getmarcdata",
			type: "post",
			dataType: "json",
			data: {
				"num": 1,
			},
			success: function(data) {
				var thead =
				'<thead>' +
					'<tr>' +
					'<th>校验</th>' +
					'<th>字段号</th>' +
					'<th>指示符</th>' +
					'<th>字段内容</th>' +
					'<th>操作</th>' +
					'</tr>' +
				'</thead>'+
				'<tbody class="result">';
				var tbody = "";
				for(var i =0;i<data.length;i++){
				tbody += 
					'<tr>' +
					'<td>' + data[i].marcverification + '</td>' +
					'<td>' + data[i].fieldnum + '</td>' +
					'<td>' + data[i].designator + '</td>' +
					'<td style="text-align:left;">' + data[i].fieldname + '</td>' +
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