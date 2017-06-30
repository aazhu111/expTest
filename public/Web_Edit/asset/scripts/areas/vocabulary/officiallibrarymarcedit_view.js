/**
 * marc编辑
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['jquery', 'common', 'utils/xhr', 'utils/formatter', 'handlebars'], function($, common, xhr, formatter, Handlebars) {

	$(function() {
		var json = {
			"marcverification": "",
			"fieldnum": "",
			"designator": "",
			"fieldcontent": "",
		}
		var count = 0;

		var editstate = common.url.GetQueryString("editstate")//获取页面状态嘛（编辑/新增）
		var multigroupoajax = {
			url: changeurl(editstate),
			type: "post",
			dataType: "json",
			data: {
				"num": 1,
			},
			success: function(data) {
				var template = Handlebars.compile($("#marcThemeTemplate").html());
				var renderHTML = template(data);
				$("#wrapper").html(renderHTML);
				registerEvent();
				registerwathcer();
			}
		}
		xhr.callAjax(multigroupoajax);
		/*根据页面状态，切换请求参数*/
		function changeurl(editstate){
			return url = editstate==="true" ? WebApi_Edit + "/getmarcdata" : WebApi_Edit + "/addmarcdata"
		}

		function registerwathcer(){
			$("#wrapper").on("blur",".fieldnum",function(){
				var obj = formatter.fmt.marcClassifyFormate($(this).val());
				console.log(obj);
				var $tr = $(this).parents("tr")
				$tr.find(".designator").val(obj.designator);
				$tr.find(".fieldcontent").val(obj.fieldcontent);
			})
		}

		function registerEvent() {
			$("#wrapper").on("click", ".add", function() {
				count++;
				var template = Handlebars.compile($("#marcSingleLineAdd").html());
				var renderHTML = template(json);
				$(this).parent().parent().after('<tr id="addtr'+count+'"></tr>');
				$('#addtr'+count).html(renderHTML);
			})
			$("#wrapper").on("click", ".del", function() {
				$(this).parent().parent().remove();
			})
		}
	});
});