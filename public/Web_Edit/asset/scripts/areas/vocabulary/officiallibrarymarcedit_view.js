/**
 * marc编辑
 * @param  {[type]} $           [description]
 * @param  {[type]} common      [description]
 * @param  {Object} xhr)        {               var ajax [description]
 * @return {[type]}             [description]
 */
define(['jquery', 'common', 'utils/xhr', 'utils/formatter', 'handlebars'], function($, common, xhr, formatter, Handlebars) {

	$(function() {
		/*变量命名空间*/
		var varnamespace = {
			count: 0,
			/*全局新增操作计数器*/
			type: common.url.GetQueryString("type"),
			editstate: common.url.GetQueryString("editstate"), //获取页面状态嘛（编辑/新增）
			addtr: { /*新增行数据*/
				"marcverification": "",
				"fieldnum": "",
				"designator": "",
				"fieldcontent": ""
			},

		};
		var cachefiedlnum = { /*缓存字段号数目*/

		}
		var multigroupoajax = {
			url: changeurl(varnamespace.editstate),
			type: "post",
			dataType: "json",
			data: {
				"type": varnamespace.type,
			},
			success: function(data) {
				var template = Handlebars.compile($("#marcThemeTemplate").html());
				var renderHTML = template(data);
				$("#wrapper").html(renderHTML);
				if (varnamespace.type === "theme") {
					gatherFieldNumContent()
				}
				registerEvent();
				registerwathcer();
			}
		}
		xhr.callAjax(multigroupoajax);
		/*根据页面状态，切换请求参数*/
		function changeurl(editstate) {
			return url = editstate === "true" ? WebApi_Edit + "/getmarcdata" : WebApi_Edit + "/addmarcdata"
		}
		
		/*
		* 绑定模板数据,并做首屏渲染
		* @param  {Object} data   主要用于表格增加行和数据填充
		*/
		function bindDataToTemplate(data) {
			varnamespace.count++;
			var template = Handlebars.compile($("#marcSingleLineAdd").html());
			var renderHTML = template(data);
			$(this).parent().parent().after('<tr id="addtr' + varnamespace.count + '"></tr>');
			$('#addtr' + varnamespace.count).html(renderHTML);
		}
		/*增加行*/
		function addTr($this) {
			var obj = formatter.fmt.marcClassifyFormate(varnamespace.type, $this.val());
			var $tr = $this.parents("tr")
			$tr.find(".designator").val(obj.designator);
			$tr.find(".fieldcontent").val(obj.fieldcontent);
		}
		/*获取前缀字符串*/
		function getheaderstring(string) {
			return "^6a" + string.substring(0, 1) + (parseInt(string.substring(1, 2)) + 1);
		}
		/*收集2xx字段号和4xx字段最大序列号*/
		function gatherFieldNumContent() {
			var maxval;
			$("tr").each(function(index, element) {
				var $this1 = $(this).children().eq(1).children();
				var $this1val = getspaninputval($this1);
				/*只有在marc是主题的时候才执行*/
				if (varnamespace.type === "theme") {
					if ($this1val === "200" || $this1val === "210" || $this1val === "215" || $this1val === "220" || $this1val === "230" || $this1val === "250") {
						cachefiedlnum["fieldnum"] = $this1val.substring(1, 3);
						console.log(cachefiedlnum.fieldnum);
					}
					if ($this1val === "400" || $this1val === "410" || $this1val === "415" || $this1val === "420" || $this1val === "430" || $this1val === "450") {
						var $this3 = $(this).children().eq(3).children();
						var $this3val = getspaninputval($this3);
						if (!$this3val) { /*如果$this3是空串*/
							return;
						}
						var t = $this3val.substring(3, 5)
						if (!parseFloat(t)) {
							return;
						}
						if (maxval) {
							if (maxval < t) {
								maxval = t;
							}
						} else {
							maxval = t;
						}
					}
				}
			});
			/*全局存储最大值4xx字段序号*/
			cachefiedlnum["maxval"] = maxval;

		}
		/*获取span标签或input标签值*/
		function getspaninputval(ele) {
			if (ele.html()) {
				return ele.html();
			}
			if (ele.val()) {
				return ele.val();
			}
		}
		//注册点击事件
		function registerEvent() {
			$("#wrapper").on("click", ".add", function() {
				bindDataToTemplate(varnamespace.addtr);
			})
			$("#wrapper").on("click", ".del", function() {
				$(this).parent().parent().remove();
				gatherFieldNumContent(); /*遍历一遍，获取最大值*/
			})

		}
		/*事件观察者*/
		function registerwathcer() {
			$("#wrapper").on("blur", ".fieldnum", function() {
				if (varnamespace.type === "theme") {
					if (cachefiedlnum.cache === "400" || cachefiedlnum.cache === "410" || cachefiedlnum.cache === "415" || cachefiedlnum.cache === "420" || cachefiedlnum.cache === "430" || cachefiedlnum.cache === "450") {
						cachefiedlnum.cache = "";
						gatherFieldNumContent(); /*遍历一遍，获取最大值*/
						return;
					}
					var $this = $(this);
					addTr($this);
				}
			});
			/*如果是主题marc编辑，注册相应事件*/
			if (varnamespace.type === "theme") {
				/*检测按下4，4是首字母，并且是主题marc编辑时 自动填充字段号字段内容*/
				$("#wrapper").on("keyup", ".fieldnum", function(ev) {
					if (ev.key === "4" && !($(this).html().length > 1 || $(this).val().length > 1)) {

						$(this).html(ev.key + cachefiedlnum.fieldnum);
						$(this).val(ev.key + cachefiedlnum.fieldnum);
						cachefiedlnum["cache"] = ev.key + cachefiedlnum.fieldnum; /*键入后，保存键入的值4xx字段*/
						if ($(this).parents("tr").children().eq(3).children().val()) {
							return;
						}
						$(this).parents("tr").children().eq(3).children().html(getheaderstring(cachefiedlnum.maxval) + "^a");
						$(this).parents("tr").children().eq(3).children().val(getheaderstring(cachefiedlnum.maxval) + "^a");
						var data = { /*建立新增数据*/

						}
						data = $.extend(data, varnamespace.addtr);
						data.fieldnum = cachefiedlnum.cache;
						data.fieldcontent = getheaderstring(cachefiedlnum.maxval) + "^7ba^a";
						bindDataToTemplate(data);

					}
				});
				$("#wrapper").on("blur", ".fieldcontent", function() {
					gatherFieldNumContent();
				})
			}
		}
	});
});