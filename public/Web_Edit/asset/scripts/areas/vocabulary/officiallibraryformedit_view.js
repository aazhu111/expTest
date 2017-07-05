/**
 * marc编辑
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['jquery', 'common', 'utils/xhr', 'utils/formatter', 'handlebars'], function($, common, xhr, formatter, Handlebars) {

	$(function() {
		var count=0;
		registerEvent();
		function registerEvent(){
			$(".operate").on("click",".fieldqueryadd",function(){
				var num = $(this).attr("data-operate");
				count++;
				var template = Handlebars.compile($("#ClassifyFormTemplate"+num).html());
				var renderHTML = template();
				if(num !=="0"){
					$(this).parent().after('<div id="addtemplate'+count+'" class="flex mt15"></div>');
				}else{
					$(this).parent().after('<div id="addtemplate'+count+'" class="note" ></div>');
				}
				
				$('#addtemplate'+count).html(renderHTML);
			});
			$(".operate").on("click", ".fieldquerydel", function() {
				$(this).parent().remove();
				/*判断条件如果杀出后没有，则出现新增按钮*/
			})
		}
	});
});