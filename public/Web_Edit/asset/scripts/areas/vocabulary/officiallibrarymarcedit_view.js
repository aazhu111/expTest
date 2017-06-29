/**
 * 批量查询
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['jquery', 'common', 'utils/xhr', 'utils/formatter', 'handlebars'], function($, common,  xhr, ClipBoard,  Handlebars ) {

	$(function() {
		var multigroupoajax = {
			url: WebApi_Edit + "/getmarcdata",
			type: "post",
			dataType: "json",
			data: {
				"num": 1,
			},
			success: function(data) {
				var template = Handlebars.compile($("#marcThemeTemplate").html());
				var renderHTML = template(data);
				$("#wrapper").html(renderHTML);
				var width = $(".autoinput").parent().width() - $(".marccontent").width();
				$(".autoinput").css({"width":width});
			}
		}
		xhr.callAjax(multigroupoajax);

	});
});