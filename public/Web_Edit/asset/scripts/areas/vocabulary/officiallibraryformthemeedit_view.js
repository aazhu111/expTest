/**
 * marc编辑
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['jquery', 'common', 'utils/xhr', 'utils/formatter', 'handlebars'], function($, common, xhr, formatter, Handlebars) {

	$(function() {
		var count = 0;

		registerEvent();
		//registerwathcer();
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
			$(".operate").on("click", ".fieldqueryadd", function() {
				/*新增操作成功，隐藏全局新增按钮*/
				var num = $(this).attr("data-operate");
				count++;
				var template = Handlebars.compile($("#ThemeFormTemplate"+num).html());
				var renderHTML = template();
				if(num !=="0"){
					$(this).parent().after('<div id="addtemplate'+count+'" class="displayib mt15"></div>');
				}else{
					$(this).parent().after('<div id="addtemplate'+count+'" class="note" ></div>');
				}
				
				$('#addtemplate'+count).html(renderHTML);
			})
			$(".operate").on("click", ".fieldquerydel", function() {
				$(this).parent().remove();
				/*判断条件如果杀出后没有，则出现新增按钮*/
			})
		}
	});
});