/**
 * 批量查询
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['jquery', 'common', 'utils/xhr', 'utils/copyutil', 'handlebars'], function($, common,  xhr, ClipBoard,  Handlebars ) {

	$(function() {
		var multigroupoajax = {
			url: WebApi_Edit + "/getmarcdata",
			type: "post",
			dataType: "json",
			data: {
				"num": 1,
			},
			success: function(data) {
				/*var thead =
					'<thead>' +
					'<tr>' +
					'<th>校验</th>' +
					'<th>字段号</th>' +
					'<th>指示符</th>' +
					'<th>字段内容</th>' +
					'<th>操作</th>' +
					'</tr>' +
					'</thead>' +
					'<tbody class="result">';
				var tbody = "";
				for (var i = 0; i < data.length; i++) {
					tbody +=
						'<tr>' +
						'<td>' + data[i].marcverification + '</td>' +
						'<td>' + data[i].fieldnum + '</td>' +
						'<td>' + data[i].designator + '</td>' +
						'<td style="text-align:left;">' + data[i].fieldname + '</td>' +
						' <td>' +
						'<a title="编辑" class="iconfont icon-open-plus add"></a>' +
						'<span title="删除" class="iconfont icon-open-delete offset-lg-1 del"></span>' +
						'</td>' +
						'</tr>';
				}

				var tabletmplate =
					'<table class="table-common">' + thead + tbody + '</tbody></table>';
				$("#wrapper").html(tabletmplate);*/
				var template = Handlebars.compile($("#marcClassifyTemplate").html());
				var renderHTML = template(data);
				$("#wrapper").html(renderHTML);
			}
		}
		xhr.callAjax(multigroupoajax);



		Handlebars.registerHelper("debug", function(data) {
			var tbody = "";
			tbody +=
				'<tr>' +
				'<td>' + data.marcverification + '</td>' +
				'<td>' + data.fieldnum + '</td>' +
				'<td>' + data.designator + '</td>' +
				'<td style="text-align:left;">' + data.fieldname + '</td>' +
				' <td>' +
				'<a title="编辑" class="iconfont icon-open-plus add"></a>' +
				'<span title="删除" class="iconfont icon-open-delete offset-lg-1 del"></span>' +
				'</td>' +
				'</tr>';
			return tbody;
		});
	});
});